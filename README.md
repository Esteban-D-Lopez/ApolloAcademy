# 🏛️ Apollo Academy

> An interactive, citation-backed learning platform for Apollo Global Management's business model, financial metrics, competitive positioning, and strategic narratives — with an AI-powered chat interface grounded in Apollo's official source documents.

---

## What Is This?

Apollo Academy is a full-stack learning application combining a structured curriculum, a searchable knowledge base, a source document library, and an agentic RAG chat interface. Every fact, metric, and definition is sourced from Apollo's official filings and presentations. The AI never makes things up — it always cites the document and page number.

**Built for:** analysts, sales teams, investors, or anyone who wants to deeply understand how Apollo works.

---

## Features

| Area | What's Included |
|---|---|
| **Curriculum** | 7 modules · 40+ lessons · ~330 minutes of structured content |
| **Lessons** | Text, key concept boxes, financial formulas, checkpoint quizzes |
| **Knowledge Base** | 27 financial terms with definitions, formulas, and cross-references |
| **Source Library** | 8 official Apollo documents with section navigation |
| **AI Chat** | Agentic RAG — searches ChromaDB, cites sources, answers in context |
| **Progress Tracking** | localStorage-persisted lesson completions, quiz scores, badges |
| **Global Search** | Debounced search across lessons, terms, and source documents |

---

## System Architecture

```
┌─────────────────────┐        HTTP/JSON         ┌──────────────────────────┐        Embeddings + LLM        ┌────────────────────────┐
│   Browser / Client  │  ◄──── POST /api/chat ──► │   Backend / API          │  ◄──────────────────────────► │   AI + Storage         │
│                     │                           │                          │                                │                        │
│  React 19 SPA       │                           │  FastAPI + LangGraph     │                                │  Gemini / GPT-4o /     │
│  React Router 7     │                           │  ReAct Agent             │                                │  Claude Sonnet         │
│  Vite 6             │                           │  Gemini Embeddings       │                                │                        │
│  localhost:5173     │                           │  localhost:8000          │                                │  ChromaDB (local)      │
└─────────────────────┘                           └──────────────────────────┘                                └────────────────────────┘
```

**Key architectural decision:** The frontend is almost entirely self-contained. All curriculum, terms, citations, and sources are static JS data files — no API call needed to browse lessons, search, or take quizzes. **Only the Chat page hits the backend.** The app works offline for 12 of 13 pages; the backend is only needed for AI-powered Q&A.

---

## Tech Stack

### Frontend
| Package | Role |
|---|---|
| React 19 | UI framework |
| React Router 7 | Client-side routing (13 routes) |
| Vite 6 | Build tool + dev server |
| Lucide React | Icons |
| Vitest | Unit testing (30 tests) |
| CSS Variables | Custom design system (1,163 lines) |

### Backend
| Package | Role |
|---|---|
| FastAPI + Uvicorn | HTTP API server |
| LangGraph | ReAct agent state machine |
| LangChain | LLM + tool abstractions |
| `langchain-google-genai` | Gemini chat + embeddings |
| `langchain-openai` | OpenAI chat (GPT-4o) |
| `langchain-anthropic` | Anthropic chat (Claude Sonnet) |
| ChromaDB | Local vector store |
| PyMuPDF | PDF text extraction |
| Pydantic v2 | Request validation |

---

## Source Documents (8 PDFs · ~28MB)

| Document | Type |
|---|---|
| 2026 10-K Annual Report | SEC Filing |
| Q4 2025 Earnings Release | Earnings |
| Q4 2025 Earnings Call Transcript | Earnings |
| 2024 Investor Day Presentation | Investor Day |
| 2024 Investor Day Transcript | Investor Day |
| Apollo Investor Presentation — February 2026 | Presentation |
| Retirement Services Business Update 2025 | Business Update |
| Private Credit: Fact vs. Fiction | Research / White Paper |

---

## Getting Started

### Prerequisites
- Python 3.10+
- Node.js 18+
- A Gemini API key — [get one free at aistudio.google.com](https://aistudio.google.com/app/apikey)

### 1 — Clone the repo

```bash
git clone https://github.com/Esteban-D-Lopez/ApolloAcademy.git
cd ApolloAcademy
```

### 2 — Backend setup

```bash
cd backend

# Create your .env from the template
cp .env.example .env
# Open .env and add your GOOGLE_API_KEY

# Install Python dependencies
pip install -r requirements.txt

# Ingest the PDFs into ChromaDB (first time only)
python ingest.py

# Start the API server
python server.py
# → running at http://localhost:8000
```

Verify the backend is healthy:
```bash
curl http://localhost:8000/api/health
# {"status":"ok","service":"Apollo Academy RAG"}
```

### 3 — Frontend setup

```bash
# From the project root
npm install
npm run dev
# → running at http://localhost:5173
```

Open **http://localhost:5173** in your browser.

### Re-indexing PDFs

If you add or replace documents in `Sources/`:
```bash
python backend/ingest.py --force
```

---

## Multi-Provider LLM Support

The Chat page lets you choose your preferred LLM provider. The graph structure is identical for all three — only the LLM node swaps out.

| Provider | Chat Model | Notes |
|---|---|---|
| **Google Gemini** | `gemini-2.0-flash` | Also used for embeddings — one key covers everything |
| **OpenAI** | `gpt-4o` | Requires a Gemini key in `backend/.env` for document search |
| **Anthropic** | `claude-sonnet-4-6` | Same — Gemini key still needed for embeddings |

**To use your own key:** open the Chat page, expand the **API Settings** panel, select your provider, enter your key, and click Save. The key is stored in your browser's `localStorage` only.

> ⚠️ **Local use only.** Your key is stored in localStorage and sent only to `localhost:8000`. Never enter your key if running this app on a shared or public server. Never commit your key to git.

---

## RAG Chat — Full Request Flow

```
1. User submits question (last 20 messages capped in payload)
        ↓
2. FastAPI validates request
   └── role: "user" | "assistant"
   └── content: max 4,000 chars
   └── messages: 1–50 items
        ↓
3. LangGraph agent invoked
   └── System prompt prepended
   └── graph.invoke({ messages })
        ↓
4. LLM emits tool call → search_documents(query, k=6)
   └── Embeddings always use Gemini (index compatibility)
        ↓
5. ChromaDB cosine similarity search
   └── Returns top-6 chunks with document, page, relevance score
        ↓
6. LLM synthesizes cited answer
   └── Format: [Source: doc.pdf, p. N]
        ↓
7. FastAPI extracts citations via regex → returns { response, citations[] }
        ↓
8. React renders safely (no dangerouslySetInnerHTML)
```

### LangGraph State Machine

```
START → agent_node ──has tool_calls?──► tools_node ─┐
              ▲                                       │
              └───────────────────────────────────────┘
              │
              └── no tool_calls → END
```

---

## PDF Ingestion Pipeline

```
8 PDFs  →  PyMuPDF page extract  →  RecursiveCharacterTextSplitter  →  Gemini Embeddings  →  ChromaDB
Sources/                              (1,000 chars / 200 overlap)        (float vectors)      backend/chroma_db/
```

Metadata preserved per chunk: `{ document, page, source_type }` — surfaced in every search result for citations.

---

## Frontend Component Tree

```
main.jsx
└── App.jsx                    ← ProgressContext provider + 13 Routes
    └── Layout.jsx             ← Fixed 260px sidebar + Outlet
        ├── SearchOverlay.jsx  ← Debounced global search (250ms)
        ├── StartHere.jsx      ← Landing: progress ring, module cards
        ├── Curriculum.jsx     ← 7 modules × lesson browser
        ├── LessonView.jsx     ← Content + quiz + citations + next nav
        │   ├── QuizQuestion.jsx
        │   └── Citations.jsx  ← CitationChip + ExcerptViewer (ARIA)
        ├── Chat.jsx           ← RAG UI + multi-provider API settings
        ├── KnowledgeBase.jsx  ← 27 terms, category tabs, detail panel
        ├── Library.jsx        ← 8 source docs with section navigation
        ├── Segments.jsx / SegmentDetail.jsx
        ├── FinancialPerformance.jsx
        ├── StrategyNarratives.jsx
        ├── Competition.jsx
        ├── Assessments.jsx
        └── Profile.jsx        ← Progress dashboard + badges
```

### State Management

- **ProgressContext** (React Context API) — `completedLessons[]`, `quizScores{}`, `badges[]`
- **localStorage** — serialized JSON under `apollo-academy-progress`; read with error-safe fallback, writes wrapped in try/catch for quota protection
- **Local component state** — each page manages its own UI state via `useState`

---

## Static Data Layer (`src/data/`)

All content is plain JavaScript — no database, no API calls for non-chat pages.

| File | Contents | Key exports |
|---|---|---|
| `curriculum.js` | 7 modules, 40+ lessons | `getAllLessons()` · `getLessonById()` · `getNextLesson()` |
| `terms.js` | 27 financial terms | `searchTerms()` · `getTermsByCategory()` · `categories` |
| `citations.js` | 100+ citation anchors | `getCitation()` · `getCitationsBySource()` |
| `sources.js` | 8 source document metadata | `getSourceById()` |

`getAllLessons()` is pre-computed once at module load — no repeated `.flatMap` on every render.

---

## Storage Overview

| Store | What's In It | Where |
|---|---|---|
| **ChromaDB** | All embedded PDF chunks + metadata | `backend/chroma_db/` (gitignored) |
| **localStorage** | User progress (lessons, scores, badges) | Browser |
| **JS module cache** | Static curriculum, terms, citations, sources | `src/data/` (loaded once at import) |

---

## Security

| Concern | How It's Handled |
|---|---|
| **XSS** | Chat renderer uses React elements (`parseInline` + `renderContent`) — no `dangerouslySetInnerHTML` |
| **API key (backend)** | `GOOGLE_API_KEY` in `backend/.env`, gitignored, never bundled into frontend |
| **API key (user-provided)** | Stored in `localStorage` only, sent in HTTPS body to `localhost:8000`, never persisted server-side |
| **Input validation** | Pydantic enforces `role: Literal["user","assistant"]`, `content ≤ 4,000 chars`, `messages 1–50` |
| **CORS** | Restricted to `localhost:5173`, `5174`, `3000` — update to your domain before any public deployment |
| **Bounded history** | Only the last 20 messages are sent per request — prevents unbounded token cost and oversized payloads |

---

## Testing

### Frontend (Vitest · 30 tests)

```bash
npm test           # run once
npm run test:watch # watch mode
```

| File | Tests |
|---|---|
| `src/__tests__/curriculum.test.js` | 13 — modules, lessons, navigation |
| `src/__tests__/terms.test.js` | 10 — search, categories, structure |
| `src/__tests__/citations.test.js` | 7 — lookup, source filtering |

### Backend (Pytest)

```bash
pytest backend/tests/
```

Covers Pydantic validation (role, length, bounds) and citation regex extraction — no ChromaDB or LLM calls required.

---

## Project Structure

```
ApolloAcademy/
├── src/
│   ├── App.jsx                 # Root component, routing, ProgressContext
│   ├── index.css               # Design system (1,163 lines, CSS variables)
│   ├── components/             # Layout, SearchOverlay, QuizQuestion, Citations
│   ├── pages/                  # 13 page components
│   └── data/                   # curriculum.js, terms.js, citations.js, sources.js
├── backend/
│   ├── server.py               # FastAPI app, /api/chat endpoint
│   ├── agent.py                # LangGraph ReAct agent (create_graph factory)
│   ├── tools.py                # RAG tools (make_tools factory)
│   ├── ingest.py               # PDF → ChromaDB pipeline (--force flag)
│   ├── config.py               # Env vars, paths, provider model names
│   ├── prompts/
│   │   └── system_prompt.txt   # Agent system prompt (edit without touching Python)
│   ├── tests/
│   │   └── test_server.py      # Pytest validation tests
│   ├── requirements.txt
│   └── .env.example            # Copy to .env and add your GOOGLE_API_KEY
├── Sources/                    # 8 source PDFs (~28MB)
├── public/                     # Static assets + extracted graphics
├── architecture.html           # Interactive architecture deep-dive (open in browser)
├── .env.example                # Frontend env template (VITE_API_URL)
├── package.json
└── vite.config.js
```

---

## Architecture Deep-Dive

For a visual, interactive breakdown of every layer — open **`architecture.html`** directly in your browser (no server needed). It covers the system overview, component tree, data flow, LangGraph state machine, ingestion pipeline, storage, security, and test coverage.

---

## Environment Variables

### `backend/.env`
```env
GOOGLE_API_KEY=your_gemini_key_here
```

### `.env.local` (frontend, for local dev)
```env
VITE_API_URL=http://localhost:8000
```

On hosted platforms (Vercel, Railway, Render, Fly.io) set these in the project's environment variables UI — never commit them.

---

## License

MIT
