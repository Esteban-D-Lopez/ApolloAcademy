"""FastAPI server for the Apollo Academy RAG backend."""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))

from typing import Literal

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from langchain_core.messages import HumanMessage, AIMessage

from agent import create_graph
from config import GOOGLE_API_KEY

# --- Pydantic Models ---

class ChatMessage(BaseModel):
    role: Literal["user", "assistant"]
    content: str = Field(..., min_length=1, max_length=4000)


class ChatRequest(BaseModel):
    messages: list[ChatMessage] = Field(..., min_length=1, max_length=50)
    # Provider and key are optional — fall back to .env values when absent
    provider: Literal["gemini", "openai", "anthropic"] = "gemini"
    api_key: str | None = Field(default=None, max_length=200)


class Citation(BaseModel):
    document: str
    page: str
    excerpt: str


class ChatResponse(BaseModel):
    response: str
    citations: list[Citation]


# --- App ---

app = FastAPI(
    title="Apollo Academy RAG API",
    description="Agentic RAG backend for Apollo Academy using LangGraph + Gemini/OpenAI/Anthropic + ChromaDB",
    version="2.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:5174", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def extract_citations(text: str) -> list[Citation]:
    """Extract [Source: doc.pdf, p. N] markers from response text."""
    import re
    citations = []
    pattern = r"\[Source:\s*([^,\]]+),\s*p\.\s*(\d+)\]"
    for match in re.finditer(pattern, text):
        doc_name = match.group(1).strip()
        page = match.group(2).strip()
        citations.append(Citation(
            document=doc_name,
            page=page,
            excerpt=f"Referenced from {doc_name}, page {page}",
        ))
    return citations


@app.get("/api/health")
async def health():
    return {"status": "ok", "service": "Apollo Academy RAG"}


@app.post("/api/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """Send a message to the RAG agent and get a cited response.

    Key resolution order:
      1. api_key from request body  (user-provided via the Chat UI)
      2. GOOGLE_API_KEY from backend/.env  (owner's fallback)

    For non-Gemini providers the chat LLM uses the user's key while
    document search embeddings always use the Gemini key from .env
    (because the ChromaDB index was built with Gemini vectors).
    """
    try:
        lc_messages = []
        for msg in request.messages:
            if msg.role == "user":
                lc_messages.append(HumanMessage(content=msg.content))
            elif msg.role == "assistant":
                lc_messages.append(AIMessage(content=msg.content))

        if not lc_messages:
            raise HTTPException(status_code=400, detail="No messages provided")

        # Determine which keys to use
        chat_key = request.api_key or GOOGLE_API_KEY
        # Embeddings always use Gemini; for OpenAI/Anthropic chat, fall back to .env key
        google_key = (request.api_key or GOOGLE_API_KEY) if request.provider == "gemini" else GOOGLE_API_KEY

        _placeholder = "your-gemini-api-key-here"
        if not chat_key or chat_key == _placeholder:
            raise HTTPException(
                status_code=400,
                detail="No API key configured. Add your key in the Chat settings or set GOOGLE_API_KEY in backend/.env.",
            )
        if not google_key or google_key == _placeholder:
            raise HTTPException(
                status_code=400,
                detail="Document search requires a Gemini API key. Set GOOGLE_API_KEY in backend/.env.",
            )

        graph = create_graph(request.provider, chat_key, google_key)
        result = graph.invoke({"messages": lc_messages})
        ai_response = result["messages"][-1].content
        citations = extract_citations(ai_response)

        return ChatResponse(response=ai_response, citations=citations)

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
