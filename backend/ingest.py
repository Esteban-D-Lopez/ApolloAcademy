"""PDF ingestion pipeline for Apollo Academy RAG.

Reads all PDFs from Sources/, chunks them, embeds with Gemini,
and stores in a persistent ChromaDB collection.
"""

import sys
from pathlib import Path

# Allow running as `python backend/ingest.py` from project root
sys.path.insert(0, str(Path(__file__).parent))

import fitz  # PyMuPDF
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain_chroma import Chroma

from config import (
    GOOGLE_API_KEY,
    SOURCES_DIR,
    CHROMA_DB_DIR,
    COLLECTION_NAME,
    CHUNK_SIZE,
    CHUNK_OVERLAP,
    EMBEDDING_MODEL,
)

# Source document metadata
SOURCE_TYPES = {
    "2026 10-K_Extracted.pdf": "SEC Filing",
    "AGM Earnings Release 4Q'2025.pdf": "Earnings Release",
    "Apollo 2024 Investor Day Presentation .pdf": "Investor Day Presentation",
    "Apollo Global Management, Inc.(APO-US), Q4 2025 Earnings Call, 9-February-2026 8_30 AM ET.pdf": "Earnings Call Transcript",
    "Apollo Investor Presentation – February 2026.pdf": "Investor Presentation",
    "Apollo Retirement Services Business Update 2025.pdf": "Business Update",
    "Private Credit - Fact vs. Fiction.pdf": "Research / White Paper",
    "Transcript of Apollo Investor Day 2024.pdf": "Investor Day Transcript",
}


def extract_text_from_pdf(pdf_path: Path) -> list[dict]:
    """Extract text from each page of a PDF, returning a list of page dicts."""
    doc = fitz.open(str(pdf_path))
    pages = []
    for page_num in range(len(doc)):
        page = doc[page_num]
        text = page.get_text("text")
        if text.strip():
            pages.append({
                "text": text,
                "page": page_num + 1,
                "document": pdf_path.name,
                "source_type": SOURCE_TYPES.get(pdf_path.name, "Unknown"),
            })
    doc.close()
    return pages


def ingest(force: bool = False):
    """Main ingestion pipeline.

    Args:
        force: If True, wipe and re-index even if ChromaDB already exists.
               If False (default), skip ingestion when the DB is already present.
    """
    print("=" * 60)
    print("Apollo Academy — PDF Ingestion Pipeline")
    print("=" * 60)

    # Skip if already indexed (unless --force)
    if CHROMA_DB_DIR.exists():
        if not force:
            print(f"\nChromaDB already exists at {CHROMA_DB_DIR}.")
            print("Skipping ingestion. Run with --force to wipe and re-index.")
            print("=" * 60)
            return
        import shutil
        shutil.rmtree(CHROMA_DB_DIR)
        print("  Cleared existing ChromaDB (--force)")

    # Collect all page texts with metadata
    all_texts = []
    all_metadatas = []

    pdf_files = sorted(SOURCES_DIR.glob("*.pdf"))
    if not pdf_files:
        print(f"No PDFs found in {SOURCES_DIR}")
        return

    print(f"\nFound {len(pdf_files)} PDFs in {SOURCES_DIR}\n")

    for pdf_path in pdf_files:
        print(f"  Processing: {pdf_path.name}")
        pages = extract_text_from_pdf(pdf_path)
        print(f"    → {len(pages)} pages extracted")
        for page in pages:
            all_texts.append(page["text"])
            all_metadatas.append({
                "document": page["document"],
                "page": page["page"],
                "source_type": page["source_type"],
            })

    print(f"\nTotal pages extracted: {len(all_texts)}")

    # Chunk the texts
    splitter = RecursiveCharacterTextSplitter(
        chunk_size=CHUNK_SIZE,
        chunk_overlap=CHUNK_OVERLAP,
        separators=["\n\n", "\n", ". ", " ", ""],
    )

    chunks = []
    chunk_metadatas = []
    for text, meta in zip(all_texts, all_metadatas):
        splits = splitter.split_text(text)
        for split in splits:
            chunks.append(split)
            chunk_metadatas.append(meta.copy())

    print(f"Total chunks after splitting: {len(chunks)}")

    # Embed and store in ChromaDB
    print(f"\nEmbedding with {EMBEDDING_MODEL}...")
    embeddings = GoogleGenerativeAIEmbeddings(
        model=EMBEDDING_MODEL,
        google_api_key=GOOGLE_API_KEY,
    )

    # Create and persist
    print("  Storing in ChromaDB...")
    db = Chroma.from_texts(
        texts=chunks,
        metadatas=chunk_metadatas,
        embedding=embeddings,
        collection_name=COLLECTION_NAME,
        persist_directory=str(CHROMA_DB_DIR),
    )

    print(f"\n✓ Successfully indexed {len(chunks)} chunks into ChromaDB")
    print(f"  Collection: {COLLECTION_NAME}")
    print(f"  Location: {CHROMA_DB_DIR}")
    print("=" * 60)


if __name__ == "__main__":
    import argparse
    parser = argparse.ArgumentParser(description="Ingest Apollo source PDFs into ChromaDB.")
    parser.add_argument("--force", action="store_true", help="Wipe existing ChromaDB and re-index all documents")
    args = parser.parse_args()
    ingest(force=args.force)
