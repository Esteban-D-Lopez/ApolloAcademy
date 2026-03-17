import { useState, useRef, useEffect } from 'react'
import {
    MessageCircle, Send, Loader2, FileText, AlertCircle,
    Key, ChevronDown, ChevronUp, Eye, EyeOff, Shield, AlertTriangle, CheckCircle,
} from 'lucide-react'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

// Max messages sent to the API per request (keeps payload bounded)
const MAX_API_HISTORY = 20

const PROVIDERS = {
    gemini: {
        name: 'Google Gemini',
        defaultModel: 'gemini-2.5-pro',
        models: [
            { value: 'gemini-3.1-pro-preview', label: 'Gemini 3.1 Pro', description: 'Preview · Most capable' },
            { value: 'gemini-2.5-pro', label: 'Gemini 2.5 Pro', description: 'GA · Recommended' },
            { value: 'gemini-2.5-flash', label: 'Gemini 2.5 Flash', description: 'GA · Fast · Cheaper' },
        ],
        placeholder: 'AIza...',
        hint: 'aistudio.google.com/app/apikey',
        color: '#fbbf24',
    },
    openai: {
        name: 'OpenAI',
        defaultModel: 'gpt-5',
        models: [
            { value: 'gpt-5', label: 'GPT-5', description: 'Recommended' },
            { value: 'gpt-5-mini', label: 'GPT-5 Mini', description: 'Fast · Cheaper' },
        ],
        placeholder: 'sk-...',
        hint: 'platform.openai.com/api-keys',
        color: '#4ade80',
    },
    anthropic: {
        name: 'Anthropic',
        defaultModel: 'claude-sonnet-4-6',
        models: [
            { value: 'claude-sonnet-4-6', label: 'Claude Sonnet 4.6', description: 'GA · Recommended' },
            { value: 'claude-opus-4-6', label: 'Claude Opus 4.6', description: 'GA · Most capable' },
        ],
        placeholder: 'sk-ant-...',
        hint: 'console.anthropic.com/settings/keys',
        color: '#fb923c',
    },
}

function loadSetting(key, fallback) {
    try { return localStorage.getItem(key) || fallback } catch { return fallback }
}
function saveSetting(key, value) {
    try {
        if (value) localStorage.setItem(key, value)
        else localStorage.removeItem(key)
    } catch { /* quota */ }
}

export default function Chat() {
    const [messages, setMessages] = useState([])
    const [input, setInput] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const messagesEndRef = useRef(null)
    const inputRef = useRef(null)

    // Settings state
    const [provider, setProvider] = useState(() => loadSetting('apollo-llm-provider', 'gemini'))
    const [model, setModel] = useState(() => loadSetting('apollo-llm-model', ''))
    const [apiKey, setApiKey] = useState(() => loadSetting('apollo-llm-key', ''))
    const [draftProvider, setDraftProvider] = useState(() => loadSetting('apollo-llm-provider', 'gemini'))
    const [draftModel, setDraftModel] = useState(() => loadSetting('apollo-llm-model', ''))
    const [draftKey, setDraftKey] = useState(() => loadSetting('apollo-llm-key', ''))
    const [showKey, setShowKey] = useState(false)
    const [settingsOpen, setSettingsOpen] = useState(() => !loadSetting('apollo-llm-key', ''))
    const [savedFlash, setSavedFlash] = useState(false)

    // Which providers have a key configured server-side in backend/.env
    const [serverProviders, setServerProviders] = useState({})

    useEffect(() => {
        fetch(`${API_URL}/api/providers`)
            .then(r => r.json())
            .then(setServerProviders)
            .catch(() => {}) // backend not running — silently ignore
    }, [])

    useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages])
    useEffect(() => { inputRef.current?.focus() }, [])

    function saveSettings() {
        setProvider(draftProvider)
        setModel(draftModel)
        setApiKey(draftKey)
        saveSetting('apollo-llm-provider', draftProvider)
        saveSetting('apollo-llm-model', draftModel)
        saveSetting('apollo-llm-key', draftKey)
        setSettingsOpen(false)
        setSavedFlash(true)
        setTimeout(() => setSavedFlash(false), 2000)
    }

    function clearSettings() {
        setDraftKey('')
        setDraftModel('')
        setDraftProvider('gemini')
        setProvider('gemini')
        setModel('')
        setApiKey('')
        saveSetting('apollo-llm-provider', null)
        saveSetting('apollo-llm-model', null)
        saveSetting('apollo-llm-key', null)
    }

    async function sendMessage(e) {
        e.preventDefault()
        if (!input.trim() || loading) return

        const userMessage = { role: 'user', content: input.trim() }
        const newMessages = [...messages, userMessage]
        setMessages(newMessages)
        setInput('')
        setLoading(true)
        setError(null)

        try {
            const apiMessages = newMessages.slice(-MAX_API_HISTORY)
            const body = { messages: apiMessages, provider }
            if (model) body.model = model
            if (apiKey) body.api_key = apiKey

            const res = await fetch(`${API_URL}/api/chat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            })

            if (!res.ok) {
                const errData = await res.json().catch(() => ({}))
                throw new Error(errData.detail || `Server error: ${res.status}`)
            }

            const data = await res.json()
            setMessages([...newMessages, {
                role: 'assistant',
                content: data.response,
                citations: data.citations || [],
            }])
        } catch (err) {
            setError(err.message || 'Failed to connect to the RAG backend. Make sure the server is running.')
        } finally {
            setLoading(false)
        }
    }

    function parseInline(text) {
        const segments = text.split(/(\[Source:[^\]]+\]|\*\*[^*]+\*\*)/g)
        return segments.map((seg, i) => {
            if (seg.startsWith('[Source:')) {
                return <span key={i} className="chat-citation-chip">{seg.replace(/^\[Source:\s*/, '').replace(/\]$/, '')}</span>
            }
            if (seg.startsWith('**')) {
                return <strong key={i}>{seg.slice(2, -2)}</strong>
            }
            return seg
        })
    }

    function renderContent(text) {
        if (!text) return null
        const elements = []
        let listBuffer = []

        function flushList() {
            if (listBuffer.length === 0) return
            elements.push(
                <ul key={`list-${elements.length}`} style={{ margin: '0.4em 0', paddingLeft: '1.4em' }}>
                    {listBuffer}
                </ul>
            )
            listBuffer = []
        }

        text.split('\n').forEach((line, i) => {
            if (line.startsWith('### ')) {
                flushList()
                elements.push(<h4 key={i} style={{ margin: '0.8em 0 0.3em', fontSize: 'var(--font-size-md)', fontWeight: 700, color: 'var(--color-text-primary)' }}>{parseInline(line.slice(4))}</h4>)
            } else if (line.startsWith('## ')) {
                flushList()
                elements.push(<h3 key={i} style={{ margin: '1em 0 0.4em', fontSize: 'var(--font-size-lg)', fontWeight: 700, color: 'var(--color-text-primary)' }}>{parseInline(line.slice(3))}</h3>)
            } else if (/^[•\-] /.test(line)) {
                listBuffer.push(<li key={i} style={{ marginBottom: '0.3em' }}>{parseInline(line.slice(2))}</li>)
            } else if (line.trim() === '') {
                flushList()
            } else {
                flushList()
                elements.push(<p key={i} style={{ margin: '0.3em 0' }}>{parseInline(line)}</p>)
            }
        })

        flushList()
        return <>{elements}</>
    }

    const suggestedQuestions = [
        "What is Apollo's Segment Income framework?",
        "How does Athene generate Spread Related Earnings?",
        "What are Apollo's five-year growth targets from the 2024 Investor Day?",
        "Explain the origination machine and why Jim Zelter calls it 'our Mona Lisa'",
    ]

    const activeProvider = PROVIDERS[provider]
    const hasKey = !!apiKey
    const hasServerKey = !!(serverProviders[provider]?.configured)
    const isReady = hasKey || hasServerKey
    const activeModel = model || activeProvider.defaultModel

    return (
        <div className="page-container" style={{ maxWidth: 900, display: 'flex', flexDirection: 'column', height: 'calc(100vh - 40px)' }}>

            {/* Header */}
            <div className="animate-in" style={{ flexShrink: 0, marginBottom: 'var(--space-3)' }}>
                <div className="page-eyebrow">Agentic RAG</div>
                <h1 className="page-title" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                    <MessageCircle size={28} style={{ color: 'var(--color-primary)' }} />
                    Ask Apollo AI
                </h1>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)', marginTop: 'var(--space-1)' }}>
                    Powered by LangGraph + ChromaDB — answers grounded in Apollo's official source documents.
                </p>
            </div>

            {/* ── API Settings Panel ── */}
            <div style={{
                flexShrink: 0,
                marginBottom: 'var(--space-3)',
                background: 'var(--color-bg-card)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
            }}>
                {/* Panel header / toggle */}
                <button
                    onClick={() => setSettingsOpen(o => !o)}
                    style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: 'var(--space-3) var(--space-4)',
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        color: 'var(--color-text-primary)',
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', fontSize: 'var(--font-size-sm)', fontWeight: 600 }}>
                        <Key size={15} style={{ color: 'var(--color-primary)' }} />
                        API Settings
                        {isReady ? (
                            <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 'var(--font-size-xs)', color: '#4ade80', fontWeight: 500 }}>
                                <CheckCircle size={12} />
                                {activeProvider.name} · {activeModel}
                                {hasKey ? ' · Browser key' : ' · Server key'}
                                {savedFlash && ' · Saved'}
                            </span>
                        ) : (
                            <span style={{ fontSize: 'var(--font-size-xs)', color: '#fbbf24', fontWeight: 400 }}>
                                No key configured — expand to add one
                            </span>
                        )}
                    </div>
                    {settingsOpen ? <ChevronUp size={16} style={{ color: 'var(--color-text-muted)' }} /> : <ChevronDown size={16} style={{ color: 'var(--color-text-muted)' }} />}
                </button>

                {/* Expanded panel */}
                {settingsOpen && (
                    <div style={{ padding: '0 var(--space-4) var(--space-4)', borderTop: '1px solid var(--color-border)' }}>

                        {/* ⚠️ Local-only warning */}
                        <div style={{
                            display: 'flex',
                            gap: 'var(--space-2)',
                            alignItems: 'flex-start',
                            marginTop: 'var(--space-3)',
                            padding: 'var(--space-3)',
                            background: 'rgba(251,191,36,0.08)',
                            border: '1px solid rgba(251,191,36,0.3)',
                            borderRadius: 'var(--radius-md)',
                            fontSize: 'var(--font-size-xs)',
                            color: '#fbbf24',
                        }}>
                            <AlertTriangle size={14} style={{ flexShrink: 0, marginTop: 2 }} />
                            <div>
                                <strong>Local use only.</strong> Your key is stored in your browser's localStorage and sent only to <code style={{ background: 'rgba(0,0,0,0.2)', padding: '1px 4px', borderRadius: 3 }}>localhost:8000</code>.
                                {' '}Never enter your key if you are running this app on a shared or public server.
                                {' '}<strong>Never commit your key to git.</strong>
                            </div>
                        </div>

                        {/* Provider selector */}
                        <div style={{ marginTop: 'var(--space-3)' }}>
                            <label style={{ fontSize: 'var(--font-size-xs)', fontWeight: 600, color: 'var(--color-text-secondary)', display: 'block', marginBottom: 'var(--space-2)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                                Chat Model Provider
                            </label>
                            <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                                {Object.entries(PROVIDERS).map(([key, p]) => (
                                    <button
                                        key={key}
                                        onClick={() => setDraftProvider(key)}
                                        style={{
                                            flex: 1,
                                            padding: 'var(--space-2) var(--space-3)',
                                            borderRadius: 'var(--radius-md)',
                                            border: `1px solid ${draftProvider === key ? p.color : 'var(--color-border)'}`,
                                            background: draftProvider === key ? `${p.color}15` : 'transparent',
                                            color: draftProvider === key ? p.color : 'var(--color-text-secondary)',
                                            cursor: 'pointer',
                                            fontSize: 'var(--font-size-xs)',
                                            fontWeight: draftProvider === key ? 700 : 500,
                                            transition: 'all 0.15s',
                                            textAlign: 'center',
                                        }}
                                    >
                                        <div>{p.name}</div>
                                        <div style={{ opacity: 0.7, fontSize: '0.65rem', marginTop: 2 }}>{p.model}</div>
                                        {serverProviders[key]?.configured && (
                                            <div style={{ fontSize: '0.6rem', marginTop: 3, color: '#4ade80', opacity: 0.9 }}>
                                                ✓ server key
                                            </div>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Model picker */}
                        <div style={{ marginTop: 'var(--space-3)' }}>
                            <label style={{ fontSize: 'var(--font-size-xs)', fontWeight: 600, color: 'var(--color-text-secondary)', display: 'block', marginBottom: 'var(--space-2)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                                Model
                            </label>
                            <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
                                {PROVIDERS[draftProvider].models.map(m => {
                                    const isSelected = (draftModel || PROVIDERS[draftProvider].defaultModel) === m.value
                                    return (
                                        <button
                                            key={m.value}
                                            onClick={() => setDraftModel(m.value)}
                                            style={{
                                                padding: 'var(--space-2) var(--space-3)',
                                                borderRadius: 'var(--radius-md)',
                                                border: `1px solid ${isSelected ? PROVIDERS[draftProvider].color : 'var(--color-border)'}`,
                                                background: isSelected ? `${PROVIDERS[draftProvider].color}12` : 'transparent',
                                                color: isSelected ? PROVIDERS[draftProvider].color : 'var(--color-text-secondary)',
                                                cursor: 'pointer',
                                                fontSize: 'var(--font-size-xs)',
                                                fontWeight: isSelected ? 700 : 400,
                                                textAlign: 'left',
                                                transition: 'all 0.15s',
                                            }}
                                        >
                                            <div>{m.label}</div>
                                            <div style={{ opacity: 0.6, fontSize: '0.65rem', marginTop: 1 }}>{m.description}</div>
                                        </button>
                                    )
                                })}
                            </div>
                        </div>

                        {/* Key input */}
                        <div style={{ marginTop: 'var(--space-3)' }}>
                            <label style={{ fontSize: 'var(--font-size-xs)', fontWeight: 600, color: 'var(--color-text-secondary)', display: 'block', marginBottom: 'var(--space-2)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                                {PROVIDERS[draftProvider].name} API Key
                                {serverProviders[draftProvider]?.configured && (
                                    <span style={{ marginLeft: 8, color: '#4ade80', fontWeight: 400, textTransform: 'none', letterSpacing: 'normal' }}>
                                        — server key active (browser key optional)
                                    </span>
                                )}
                            </label>
                            <div style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'center' }}>
                                <div style={{ flex: 1, display: 'flex', alignItems: 'center', background: 'var(--color-bg-elevated, #0d1117)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '0 var(--space-3)' }}>
                                    <input
                                        type={showKey ? 'text' : 'password'}
                                        value={draftKey}
                                        onChange={e => setDraftKey(e.target.value)}
                                        placeholder={serverProviders[draftProvider]?.configured ? 'Leave blank to use server key' : PROVIDERS[draftProvider].placeholder}
                                        autoComplete="off"
                                        spellCheck={false}
                                        style={{
                                            flex: 1,
                                            background: 'transparent',
                                            border: 'none',
                                            outline: 'none',
                                            color: 'var(--color-text-primary)',
                                            fontSize: 'var(--font-size-sm)',
                                            padding: 'var(--space-2) 0',
                                            fontFamily: draftKey && !showKey ? 'monospace' : 'inherit',
                                        }}
                                    />
                                    <button
                                        onClick={() => setShowKey(s => !s)}
                                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)', padding: 'var(--space-1)', display: 'flex' }}
                                        aria-label={showKey ? 'Hide API key' : 'Show API key'}
                                    >
                                        {showKey ? <EyeOff size={14} /> : <Eye size={14} />}
                                    </button>
                                </div>
                                <button onClick={saveSettings} className="btn btn-primary" style={{ fontSize: 'var(--font-size-xs)', padding: 'var(--space-2) var(--space-4)', flexShrink: 0 }}>
                                    Save
                                </button>
                                {hasKey && (
                                    <button onClick={clearSettings} className="btn btn-ghost" style={{ fontSize: 'var(--font-size-xs)', padding: 'var(--space-2) var(--space-3)', flexShrink: 0 }}>
                                        Clear
                                    </button>
                                )}
                            </div>
                            {!serverProviders[draftProvider]?.configured && (
                                <div style={{ marginTop: 'var(--space-1)', fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
                                    Get your key at{' '}
                                    <span style={{ color: 'var(--color-primary)' }}>{PROVIDERS[draftProvider].hint}</span>
                                </div>
                            )}
                        </div>

                        {/* Non-Gemini embedding note */}
                        {draftProvider !== 'gemini' && (
                            <div style={{
                                display: 'flex',
                                gap: 'var(--space-2)',
                                alignItems: 'flex-start',
                                marginTop: 'var(--space-3)',
                                padding: 'var(--space-2) var(--space-3)',
                                background: 'rgba(96,165,250,0.07)',
                                border: '1px solid rgba(96,165,250,0.2)',
                                borderRadius: 'var(--radius-md)',
                                fontSize: 'var(--font-size-xs)',
                                color: '#60a5fa',
                            }}>
                                <Shield size={13} style={{ flexShrink: 0, marginTop: 2 }} />
                                <span>
                                    <strong>Note:</strong> The ChromaDB index was built with Gemini embeddings, so document search always uses the Gemini key set in <code style={{ background: 'rgba(0,0,0,0.2)', padding: '1px 4px', borderRadius: 3 }}>backend/.env</code>.
                                    {' '}Your {PROVIDERS[draftProvider].name} key is used only for the chat responses.
                                </span>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Messages Area */}
            <div style={{ flex: 1, overflowY: 'auto', paddingRight: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
                {messages.length === 0 && !loading && (
                    <div className="animate-in animate-in-delay-1" style={{ textAlign: 'center', padding: 'var(--space-10) 0' }}>
                        <MessageCircle size={48} style={{ color: 'var(--color-text-muted)', marginBottom: 'var(--space-4)' }} />
                        <h3 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 700, marginBottom: 'var(--space-2)' }}>
                            What would you like to know about Apollo?
                        </h3>
                        <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)', marginBottom: 'var(--space-6)' }}>
                            Ask anything about Apollo's business, financials, strategy, or source documents.
                        </p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)', justifyContent: 'center' }}>
                            {suggestedQuestions.map((q, i) => (
                                <button
                                    key={i}
                                    className="btn btn-ghost"
                                    style={{
                                        fontSize: 'var(--font-size-xs)',
                                        padding: 'var(--space-2) var(--space-4)',
                                        borderRadius: 'var(--radius-full)',
                                        border: '1px solid var(--color-border)',
                                        maxWidth: 380,
                                        textAlign: 'left',
                                    }}
                                    onClick={() => { setInput(q); inputRef.current?.focus() }}
                                >
                                    {q}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {messages.map((msg, i) => (
                    <div key={i} style={{
                        display: 'flex',
                        justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                        marginBottom: 'var(--space-4)',
                    }}>
                        <div style={{
                            maxWidth: '85%',
                            padding: 'var(--space-4) var(--space-5)',
                            borderRadius: msg.role === 'user'
                                ? 'var(--radius-lg) var(--radius-lg) var(--radius-sm) var(--radius-lg)'
                                : 'var(--radius-lg) var(--radius-lg) var(--radius-lg) var(--radius-sm)',
                            background: msg.role === 'user' ? 'var(--color-primary)' : 'var(--color-bg-card)',
                            color: msg.role === 'user' ? '#fff' : 'var(--color-text-primary)',
                            border: msg.role === 'user' ? 'none' : '1px solid var(--color-border)',
                            fontSize: 'var(--font-size-sm)',
                            lineHeight: 1.7,
                        }}>
                            {msg.role === 'user' ? msg.content : renderContent(msg.content)}

                            {msg.citations && msg.citations.length > 0 && (
                                <div style={{
                                    marginTop: 'var(--space-3)',
                                    paddingTop: 'var(--space-3)',
                                    borderTop: '1px solid var(--color-border)',
                                    fontSize: 'var(--font-size-xs)',
                                    color: 'var(--color-text-muted)',
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-1)', marginBottom: 'var(--space-1)', fontWeight: 600 }}>
                                        <FileText size={12} /> Sources Referenced
                                    </div>
                                    {msg.citations.map((c, ci) => (
                                        <div key={ci} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-1)', marginTop: 2 }}>
                                            <span style={{ color: 'var(--color-gold)' }}>•</span>
                                            {c.document} (p. {c.page})
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                ))}

                {loading && (
                    <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: 'var(--space-4)' }}>
                        <div style={{
                            padding: 'var(--space-4) var(--space-5)',
                            borderRadius: 'var(--radius-lg) var(--radius-lg) var(--radius-lg) var(--radius-sm)',
                            background: 'var(--color-bg-card)',
                            border: '1px solid var(--color-border)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 'var(--space-2)',
                            fontSize: 'var(--font-size-sm)',
                            color: 'var(--color-text-muted)',
                        }}>
                            <Loader2 size={16} className="spin" />
                            Searching Apollo documents and generating response...
                        </div>
                    </div>
                )}

                {error && (
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 'var(--space-4)' }}>
                        <div style={{
                            padding: 'var(--space-3) var(--space-5)',
                            borderRadius: 'var(--radius-md)',
                            background: 'rgba(239,68,68,0.1)',
                            border: '1px solid rgba(239,68,68,0.3)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 'var(--space-2)',
                            fontSize: 'var(--font-size-sm)',
                            color: '#ef4444',
                        }}>
                            <AlertCircle size={16} />
                            {error}
                        </div>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form
                onSubmit={sendMessage}
                style={{
                    flexShrink: 0,
                    display: 'flex',
                    gap: 'var(--space-2)',
                    padding: 'var(--space-3)',
                    background: 'var(--color-bg-card)',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid var(--color-border)',
                }}
            >
                <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder="Ask about Apollo's business, metrics, strategy..."
                    disabled={loading}
                    style={{
                        flex: 1,
                        background: 'transparent',
                        border: 'none',
                        outline: 'none',
                        color: 'var(--color-text-primary)',
                        fontSize: 'var(--font-size-sm)',
                        padding: 'var(--space-2)',
                    }}
                />
                <button
                    type="submit"
                    disabled={!input.trim() || loading}
                    className="btn btn-primary"
                    style={{ padding: 'var(--space-2) var(--space-4)', display: 'flex', alignItems: 'center', gap: 'var(--space-1)' }}
                >
                    <Send size={16} />
                </button>
            </form>
        </div>
    )
}
