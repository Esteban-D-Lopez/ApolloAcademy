"""LangChain tools for the Apollo Academy RAG agent.

Tools are created via make_tools(google_api_key) so that each request
can supply its own key without shared mutable state.
"""

from langchain_core.tools import tool
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain_chroma import Chroma

from config import (
    CHROMA_DB_DIR,
    COLLECTION_NAME,
    EMBEDDING_MODEL,
    DEFAULT_K,
)


def make_tools(google_api_key: str) -> list:
    """Return search_documents and get_document_list tools bound to the given Google API key.

    Embeddings always use Gemini (the ChromaDB index was built with Gemini vectors).
    The google_api_key may come from the user's UI input or the .env fallback.
    """

    def _get_vectorstore() -> Chroma:
        embeddings = GoogleGenerativeAIEmbeddings(
            model=EMBEDDING_MODEL,
            google_api_key=google_api_key,
        )
        return Chroma(
            collection_name=COLLECTION_NAME,
            persist_directory=str(CHROMA_DB_DIR),
            embedding_function=embeddings,
        )

    @tool
    def search_documents(query: str, k: int = DEFAULT_K) -> str:
        """Search the Apollo source documents for information relevant to the query.

        Use this tool to find specific facts, metrics, definitions, quotes,
        or strategic narratives from Apollo's official filings, presentations,
        and transcripts.

        Args:
            query: The search query describing what information you need.
            k: Number of results to return (default 6).

        Returns:
            A formatted string of relevant document chunks with source citations.
        """
        db = _get_vectorstore()
        results = db.similarity_search_with_score(query, k=k)

        if not results:
            return "No relevant documents found for this query."

        formatted = []
        for i, (doc, score) in enumerate(results, 1):
            source = doc.metadata.get("document", "Unknown")
            page = doc.metadata.get("page", "?")
            source_type = doc.metadata.get("source_type", "")
            formatted.append(
                f"[Result {i}] (Relevance: {1 - score:.2f})\n"
                f"Source: {source} (p. {page}) [{source_type}]\n"
                f"Content: {doc.page_content}\n"
            )

        return "\n\n".join(formatted)

    @tool
    def get_document_list() -> str:
        """Get a list of all Apollo source documents that have been indexed.

        Use this tool when you need to know what documents are available
        or to provide context about the source material.

        Returns:
            A formatted list of all indexed documents with their types.
        """
        db = _get_vectorstore()
        collection = db._collection
        all_meta = collection.get(include=["metadatas"])["metadatas"]

        docs = {}
        for meta in all_meta:
            doc_name = meta.get("document", "Unknown")
            if doc_name not in docs:
                docs[doc_name] = {
                    "source_type": meta.get("source_type", "Unknown"),
                    "chunk_count": 0,
                }
            docs[doc_name]["chunk_count"] += 1

        formatted = ["Available Apollo source documents:\n"]
        for name, info in sorted(docs.items()):
            formatted.append(
                f"• {name}\n"
                f"  Type: {info['source_type']}\n"
                f"  Indexed chunks: {info['chunk_count']}"
            )

        return "\n".join(formatted)

    return [search_documents, get_document_list]
