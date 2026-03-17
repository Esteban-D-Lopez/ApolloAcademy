"""Configuration for the Apollo Academy RAG backend."""

import os
from pathlib import Path
from dotenv import load_dotenv

# Load environment variables
load_dotenv(Path(__file__).parent / ".env")

# Google Gemini
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY", "your-gemini-api-key-here")

# Paths
PROJECT_ROOT = Path(__file__).parent.parent
SOURCES_DIR = PROJECT_ROOT / "Sources"
CHROMA_DB_DIR = Path(__file__).parent / "chroma_db"

# ChromaDB
COLLECTION_NAME = "apollo_sources"

# Chunking
CHUNK_SIZE = 1000
CHUNK_OVERLAP = 200

# Embedding model — always Gemini (ChromaDB was indexed with these vectors)
EMBEDDING_MODEL = "models/embedding-001"

# Default chat model per provider
PROVIDER_MODELS = {
    "gemini": "gemini-2.0-flash",
    "openai": "gpt-4o",
    "anthropic": "claude-sonnet-4-6",
}

# Retrieval
DEFAULT_K = 6
