"""Tests for FastAPI server validation and citation extraction.

These tests cover Pydantic validation and the extract_citations helper
without requiring a running LangGraph agent or ChromaDB.
"""

import pytest
from pydantic import ValidationError
from unittest.mock import patch, MagicMock

import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).parent.parent))

from server import ChatMessage, ChatRequest, Citation, extract_citations


# --- ChatMessage validation ---

class TestChatMessage:
    def test_valid_user_message(self):
        msg = ChatMessage(role="user", content="Hello")
        assert msg.role == "user"
        assert msg.content == "Hello"

    def test_valid_assistant_message(self):
        msg = ChatMessage(role="assistant", content="Hi there")
        assert msg.role == "assistant"

    def test_rejects_invalid_role(self):
        with pytest.raises(ValidationError):
            ChatMessage(role="system", content="Hello")

    def test_rejects_empty_content(self):
        with pytest.raises(ValidationError):
            ChatMessage(role="user", content="")

    def test_rejects_content_over_max_length(self):
        with pytest.raises(ValidationError):
            ChatMessage(role="user", content="x" * 4001)

    def test_accepts_content_at_max_length(self):
        msg = ChatMessage(role="user", content="x" * 4000)
        assert len(msg.content) == 4000


# --- ChatRequest validation ---

class TestChatRequest:
    def test_valid_request(self):
        req = ChatRequest(messages=[{"role": "user", "content": "Hello"}])
        assert len(req.messages) == 1

    def test_rejects_empty_messages_list(self):
        with pytest.raises(ValidationError):
            ChatRequest(messages=[])

    def test_rejects_too_many_messages(self):
        messages = [{"role": "user", "content": f"msg {i}"} for i in range(51)]
        with pytest.raises(ValidationError):
            ChatRequest(messages=messages)

    def test_accepts_exactly_50_messages(self):
        messages = [{"role": "user" if i % 2 == 0 else "assistant", "content": f"msg {i}"} for i in range(50)]
        req = ChatRequest(messages=messages)
        assert len(req.messages) == 50


# --- extract_citations ---

class TestExtractCitations:
    def test_extracts_single_citation(self):
        text = "Apollo had strong results. [Source: 2026 10-K_Extracted.pdf, p. 42]"
        citations = extract_citations(text)
        assert len(citations) == 1
        assert citations[0].document == "2026 10-K_Extracted.pdf"
        assert citations[0].page == "42"

    def test_extracts_multiple_citations(self):
        text = (
            "Segment income grew. [Source: AGM Earnings Release.pdf, p. 5] "
            "FRE increased. [Source: 2026 10-K_Extracted.pdf, p. 12]"
        )
        citations = extract_citations(text)
        assert len(citations) == 2

    def test_returns_empty_list_when_no_citations(self):
        text = "Apollo is a global alternative asset manager."
        assert extract_citations(text) == []

    def test_handles_whitespace_in_source(self):
        text = "[Source:  Apollo Investor Presentation.pdf , p. 7]"
        citations = extract_citations(text)
        assert len(citations) == 1
        assert citations[0].document == "Apollo Investor Presentation.pdf"
