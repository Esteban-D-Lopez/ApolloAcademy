"""Configuration for the Apollo Academy RAG backend."""

import os
from pathlib import Path
from dotenv import load_dotenv

# Load environment variables
load_dotenv(Path(__file__).parent / ".env")

# API keys — loaded from backend/.env
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY", "")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "")
ANTHROPIC_API_KEY = os.getenv("ANTHROPIC_API_KEY", "")

# Convenience map: provider → its env key
PROVIDER_KEYS = {
    "gemini": GOOGLE_API_KEY,
    "openai": OPENAI_API_KEY,
    "anthropic": ANTHROPIC_API_KEY,
}

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

# All supported models per provider (used for validation)
PROVIDER_AVAILABLE_MODELS = {
    "gemini": ["gemini-2.0-flash", "gemini-2.0-flash-thinking-exp", "gemini-1.5-pro"],
    "openai": ["gpt-4o", "gpt-4o-mini", "gpt-4-turbo"],
    "anthropic": ["claude-sonnet-4-6", "claude-opus-4-6", "claude-haiku-4-5-20251001"],
}

# Retrieval
DEFAULT_K = 6
