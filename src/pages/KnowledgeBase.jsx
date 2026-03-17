import { useState } from 'react'
import { Link } from 'react-router-dom'
import { terms, categories, searchTerms, getTermsByCategory } from '../data/terms'
import { CitationList } from '../components/Citations'

export default function KnowledgeBase() {
    const [query, setQuery] = useState('')
    const [activeCategory, setActiveCategory] = useState('all')
    const [selectedTerm, setSelectedTerm] = useState(null)

    const filtered = query.length >= 2
        ? searchTerms(query)
        : activeCategory === 'all'
            ? terms
            : getTermsByCategory(activeCategory)

    const detail = selectedTerm ? terms.find(t => t.id === selectedTerm) : null

    return (
        <div className="page-container">
            <div className="page-header animate-in">
                <div className="page-eyebrow">Knowledge Base</div>
                <h1 className="page-title">Terms & Concepts</h1>
                <p className="page-subtitle">
                    {terms.length} definitions, metrics, concepts, and products — each with cited sources
                    and cross-references to lessons.
                </p>
            </div>

            {/* Search */}
            <div className="animate-in animate-in-delay-1" style={{ marginBottom: 'var(--space-6)' }}>
                <div style={{
                    display: 'flex', alignItems: 'center', gap: 'var(--space-3)',
                    background: 'var(--color-bg-card)', border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-lg)', padding: 'var(--space-3) var(--space-6)'
                }}>
                    <span style={{ color: 'var(--color-text-muted)' }}>🔍</span>
                    <input
                        type="text"
                        placeholder="Search terms, metrics, concepts..."
                        value={query}
                        onChange={e => { setQuery(e.target.value); setSelectedTerm(null) }}
                        style={{
                            flex: 1, background: 'none', border: 'none', outline: 'none',
                            color: 'var(--color-text-primary)', fontSize: 'var(--font-size-base)'
                        }}
                    />
                    {query && (
                        <button className="btn-ghost" onClick={() => setQuery('')} style={{ fontSize: 'var(--font-size-xs)' }}>
                            Clear
                        </button>
                    )}
                </div>
            </div>

            {/* Category Tabs */}
            <div className="tabs animate-in animate-in-delay-1" style={{ marginBottom: 'var(--space-6)' }}>
                <button
                    className={`tab ${activeCategory === 'all' ? 'active' : ''}`}
                    onClick={() => { setActiveCategory('all'); setSelectedTerm(null); setQuery('') }}
                >
                    All ({terms.length})
                </button>
                {categories.map(cat => {
                    const count = getTermsByCategory(cat).length
                    return (
                        <button
                            key={cat}
                            className={`tab ${activeCategory === cat ? 'active' : ''}`}
                            onClick={() => { setActiveCategory(cat); setSelectedTerm(null); setQuery('') }}
                        >
                            {cat} ({count})
                        </button>
                    )
                })}
            </div>

            <div style={{ display: 'flex', gap: 'var(--space-6)', alignItems: 'flex-start' }}>
                {/* Term List */}
                <div style={{ flex: detail ? '0 0 40%' : '1', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                    {filtered.length === 0 && (
                        <div style={{ textAlign: 'center', padding: 'var(--space-10)', color: 'var(--color-text-muted)' }}>
                            No terms found.
                        </div>
                    )}
                    {filtered.map((term, i) => (
                        <div
                            key={term.id}
                            className={`card animate-in ${selectedTerm === term.id ? 'card-gold' : ''}`}
                            style={{
                                animationDelay: `${i * 0.04}s`, cursor: 'pointer',
                                padding: 'var(--space-4) var(--space-5)'
                            }}
                            onClick={() => setSelectedTerm(selectedTerm === term.id ? null : term.id)}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                                <div>
                                    <h3 style={{ fontSize: 'var(--font-size-sm)', fontWeight: 600 }}>{term.name}</h3>
                                    <div style={{ display: 'flex', gap: 'var(--space-2)', marginTop: 'var(--space-1)' }}>
                                        <span className="badge" style={{
                                            background: term.type === 'metric' ? 'var(--color-info-bg)' :
                                                term.type === 'concept' ? 'var(--color-gold-muted)' :
                                                    term.type === 'product' ? 'var(--color-success-bg)' : 'var(--color-bg-tertiary)',
                                            color: term.type === 'metric' ? 'var(--color-info)' :
                                                term.type === 'concept' ? 'var(--color-gold)' :
                                                    term.type === 'product' ? 'var(--color-success)' : 'var(--color-text-muted)',
                                            fontSize: '0.6rem'
                                        }}>
                                            {term.type}
                                        </span>
                                        <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
                                            {term.citations?.length || 0} citations
                                        </span>
                                    </div>
                                </div>
                                <span style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)' }}>→</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Detail Panel */}
                {detail && (
                    <div style={{
                        flex: '0 0 55%', position: 'sticky', top: 'var(--space-8)',
                        maxHeight: 'calc(100vh - 4rem)', overflowY: 'auto'
                    }}>
                        <div className="card card-gold">
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 'var(--space-4)' }}>
                                <div>
                                    <h2 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 700 }}>{detail.name}</h2>
                                    <div style={{ display: 'flex', gap: 'var(--space-2)', marginTop: 'var(--space-2)' }}>
                                        <span className="badge badge-gold">{detail.type}</span>
                                        <span className="badge badge-info">{detail.category}</span>
                                    </div>
                                </div>
                                <button className="btn btn-ghost" onClick={() => setSelectedTerm(null)}>✕</button>
                            </div>

                            {/* Definition */}
                            <div style={{
                                background: 'var(--color-bg-primary)', borderRadius: 'var(--radius-md)',
                                padding: 'var(--space-5)', marginBottom: 'var(--space-5)',
                                borderLeft: '3px solid var(--color-gold)'
                            }}>
                                <div style={{ fontSize: 'var(--font-size-xs)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-gold)', fontWeight: 700, marginBottom: 'var(--space-2)' }}>
                                    Definition
                                </div>
                                <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
                                    {detail.definition}
                                </p>
                            </div>

                            {/* Formula */}
                            {detail.formula && (
                                <div className="formula-box" style={{ marginBottom: 'var(--space-5)', background: 'var(--color-bg-secondary)' }}>
                                    <div className="formula" style={{ fontSize: 'var(--font-size-md)' }}>{detail.formula}</div>
                                </div>
                            )}

                            {/* Highlights */}
                            {detail.highlights?.length > 0 && (
                                <div style={{ marginBottom: 'var(--space-5)' }}>
                                    <div style={{ fontSize: 'var(--font-size-xs)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-text-muted)', fontWeight: 700, marginBottom: 'var(--space-2)' }}>
                                        Key Data Points
                                    </div>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
                                        {detail.highlights.map((h, i) => (
                                            <span key={i} style={{
                                                background: 'var(--color-bg-tertiary)', padding: 'var(--space-1) var(--space-3)',
                                                borderRadius: 'var(--radius-sm)', fontSize: 'var(--font-size-xs)',
                                                color: 'var(--color-text-primary)', fontWeight: 500
                                            }}>
                                                {h}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Citations */}
                            {detail.citations?.length > 0 && (
                                <div style={{ marginBottom: 'var(--space-5)' }}>
                                    <div style={{ fontSize: 'var(--font-size-xs)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-text-muted)', fontWeight: 700, marginBottom: 'var(--space-2)' }}>
                                        Sources ({detail.citations.length})
                                    </div>
                                    <CitationList citationIds={detail.citations} />
                                </div>
                            )}

                            {/* Related Terms */}
                            {detail.relatedTerms?.length > 0 && (
                                <div style={{ marginBottom: 'var(--space-5)' }}>
                                    <div style={{ fontSize: 'var(--font-size-xs)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-text-muted)', fontWeight: 700, marginBottom: 'var(--space-2)' }}>
                                        Related Terms
                                    </div>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
                                        {detail.relatedTerms.map(rt => {
                                            const related = terms.find(t => t.id === rt)
                                            return related ? (
                                                <button
                                                    key={rt}
                                                    className="btn btn-ghost"
                                                    onClick={() => setSelectedTerm(rt)}
                                                    style={{ fontSize: 'var(--font-size-xs)', border: '1px solid var(--color-border)' }}
                                                >
                                                    {related.name}
                                                </button>
                                            ) : null
                                        })}
                                    </div>
                                </div>
                            )}

                            {/* Used In Modules */}
                            {detail.usedInModules?.length > 0 && (
                                <div>
                                    <div style={{ fontSize: 'var(--font-size-xs)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-text-muted)', fontWeight: 700, marginBottom: 'var(--space-2)' }}>
                                        Used In Modules
                                    </div>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
                                        {detail.usedInModules.map(mid => (
                                            <Link key={mid} to="/curriculum" className="badge badge-gold" style={{ cursor: 'pointer', textDecoration: 'none' }}>
                                                📚 {mid}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
