"""LangGraph Agentic RAG agent for Apollo Academy.

The graph structure (ReAct loop) is identical for all providers.
Only the LLM node changes depending on which provider the user selected.
"""

from pathlib import Path
from typing import Annotated, Sequence
from typing_extensions import TypedDict

from langchain_core.messages import BaseMessage, SystemMessage
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_openai import ChatOpenAI
from langchain_anthropic import ChatAnthropic
from langgraph.graph import StateGraph, END
from langgraph.graph.message import add_messages
from langgraph.prebuilt import ToolNode


from tools import make_tools


# --- State ---

class AgentState(TypedDict):
    """The state passed between nodes in the graph."""
    messages: Annotated[Sequence[BaseMessage], add_messages]


# --- System Prompt ---

SYSTEM_PROMPT = (Path(__file__).parent / "prompts" / "system_prompt.txt").read_text()


# Models that do not accept a temperature parameter (reasoning/RL-trained models)
_NO_TEMPERATURE_MODELS = {"gpt-5", "o1", "o1-mini", "o3", "o3-mini", "o4-mini"}


# --- LLM factory ---

def _get_llm(provider: str, api_key: str, model: str):
    """Instantiate the appropriate LangChain chat model for the given provider."""
    use_temp = model not in _NO_TEMPERATURE_MODELS
    if provider == "gemini":
        kwargs = dict(model=model, google_api_key=api_key)
        if use_temp:
            kwargs["temperature"] = 0.1
        return ChatGoogleGenerativeAI(**kwargs)
    if provider == "openai":
        kwargs = dict(model=model, api_key=api_key)
        if use_temp:
            kwargs["temperature"] = 0.1
        return ChatOpenAI(**kwargs)
    if provider == "anthropic":
        kwargs = dict(model=model, api_key=api_key)
        if use_temp:
            kwargs["temperature"] = 0.1
        return ChatAnthropic(**kwargs)
    raise ValueError(f"Unknown provider: {provider!r}")


# --- Graph factory ---

def create_graph(provider: str, chat_api_key: str, google_api_key: str, model: str):
    """Compile a LangGraph ReAct agent for the given provider, keys, and model.

    Args:
        provider:       "gemini" | "openai" | "anthropic"
        chat_api_key:   Key used for the chat/generation LLM.
        google_api_key: Key used for Gemini embeddings (ChromaDB search).
                        Always required because the index was built with Gemini vectors.
        model:          The specific model ID to use for this provider.
    """
    llm = _get_llm(provider, chat_api_key, model)
    tools = make_tools(google_api_key)
    llm_with_tools = llm.bind_tools(tools)
    tool_node = ToolNode(tools)

    def agent_node(state: AgentState):
        messages = state["messages"]
        if not messages or not isinstance(messages[0], SystemMessage):
            messages = [SystemMessage(content=SYSTEM_PROMPT)] + list(messages)
        return {"messages": [llm_with_tools.invoke(messages)]}

    def should_continue(state: AgentState):
        last = state["messages"][-1]
        return "tools" if (hasattr(last, "tool_calls") and last.tool_calls) else END

    graph_builder = StateGraph(AgentState)
    graph_builder.add_node("agent", agent_node)
    graph_builder.add_node("tools", tool_node)
    graph_builder.set_entry_point("agent")
    graph_builder.add_conditional_edges("agent", should_continue, {"tools": "tools", END: END})
    graph_builder.add_edge("tools", "agent")
    return graph_builder.compile()
