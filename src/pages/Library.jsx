import { useState } from 'react'
import { sources, getSourceById } from '../data/sources'
import { getCitationsBySource } from '../data/citations'

export default function Library() {
    const [selectedSource, setSelectedSource] = useState(null)
    const [filter, setFilter] = useState('all')

    const typeFilters = ['all', ...new Set(sources.map(s => s.type))]
    const filtered = filter === 'all' ? sources : sources.filter(s => s.type === filter)

    const detail = selectedSource ? getSourceById(selectedSource) : null
    const detailCitations = selectedSource ? getCitationsBySource(selectedSource) : []

    return (
        <div className="page-container">
            <div className="page-header animate-in">
                <div className="page-eyebrow">Library</div>
                <h1 className="page-title">Source Documents</h1>
                <p className="page-subtitle">
                    Browse the 8 primary sources that power Apollo Academy. Every claim, definition,
                    and metric in the curriculum is cited from these documents.
                </p>
            </div>

            {/* Filters */}
            <div className="tabs animate-in animate-in-delay-1">
                {typeFilters.map(t => (
                    <button
                        key={t}
                        className={`tab ${filter === t ? 'active' : ''}`}
                        onClick={() => { setFilter(t); setSelectedSource(null) }}
                    >
                        {t === 'all' ? 'All Sources' : t}
                    </button>
                ))}
            </div>

            <div style={{ display: 'flex', gap: 'var(--space-6)', alignItems: 'flex-start' }}>
                {/* Source List */}
                <div style={{ flex: selectedSource ? '0 0 45%' : '1', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                    {filtered.map((src, i) => (
                        <div
                            key={src.id}
                            className={`card animate-in ${selectedSource === src.id ? 'card-gold' : ''}`}
                            style={{ animationDelay: `${(i + 2) * 0.08}s`, cursor: 'pointer' }}
                            onClick={() => setSelectedSource(selectedSource === src.id ? null : src.id)}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 'var(--space-3)' }}>
                                <div>
                                    <h3 style={{ fontSize: 'var(--font-size-base)', fontWeight: 600, marginBottom: 'var(--space-1)' }}>
                                        {src.title}
                                    </h3>
                                    <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
                                        <span className="badge badge-gold">{src.type}</span>
                                        <span className="badge badge-info">{src.period}</span>
                                    </div>
                                </div>
                                <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', whiteSpace: 'nowrap' }}>
                                    📅 {src.date}
                                </span>
                            </div>
                            <p style={{
                                fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)',
                                lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical', overflow: 'hidden'
                            }}>
                                {src.summary}
                            </p>
                            <div style={{ marginTop: 'var(--space-3)', fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
                                {src.sections.length} sections · {src.pages} pages
                            </div>
                        </div>
                    ))}
                </div>

                {/* Detail Panel */}
                {detail && (
                    <div style={{
                        flex: '0 0 50%', position: 'sticky', top: 'var(--space-8)',
                        maxHeight: 'calc(100vh - 4rem)', overflowY: 'auto'
                    }}>
                        <div className="card card-gold">
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 'var(--space-4)' }}>
                                <h2 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 700 }}>{detail.title}</h2>
                                <button className="btn btn-ghost" onClick={() => setSelectedSource(null)}>✕</button>
                            </div>

                            <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap', marginBottom: 'var(--space-4)' }}>
                                <span className="badge badge-gold">{detail.type}</span>
                                <span className="badge badge-info">{detail.period}</span>
                                <span className="badge" style={{ background: 'var(--color-bg-tertiary)', color: 'var(--color-text-muted)' }}>
                                    {detail.pages} pages
                                </span>
                            </div>

                            <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', lineHeight: 1.7, marginBottom: 'var(--space-6)' }}>
                                {detail.summary}
                            </p>

                            {/* Section Index */}
                            <h3 style={{ fontSize: 'var(--font-size-sm)', fontWeight: 700, marginBottom: 'var(--space-3)' }}>
                                📑 Sections
                            </h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', marginBottom: 'var(--space-6)' }}>
                                {detail.sections.map((sec, i) => (
                                    <div key={i} style={{
                                        display: 'flex', gap: 'var(--space-3)', padding: 'var(--space-2) var(--space-3)',
                                        background: 'var(--color-bg-tertiary)', borderRadius: 'var(--radius-sm)',
                                        fontSize: 'var(--font-size-xs)'
                                    }}>
                                        <span style={{ color: 'var(--color-text-muted)', minWidth: 40 }}>p.{sec.page}</span>
                                        <div>
                                            <div style={{ fontWeight: 600 }}>{sec.name}</div>
                                            <div style={{ color: 'var(--color-text-muted)' }}>{sec.description}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Citations from this source */}
                            {detailCitations.length > 0 && (
                                <>
                                    <h3 style={{ fontSize: 'var(--font-size-sm)', fontWeight: 700, marginBottom: 'var(--space-3)' }}>
                                        📎 Used in Academy ({detailCitations.length} citations)
                                    </h3>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                                        {detailCitations.slice(0, 10).map(cit => (
                                            <div key={cit.id} style={{
                                                padding: 'var(--space-3)', background: 'var(--color-bg-tertiary)',
                                                borderRadius: 'var(--radius-sm)', borderLeft: '2px solid var(--color-gold)',
                                                fontSize: 'var(--font-size-xs)'
                                            }}>
                                                <div style={{ display: 'flex', gap: 'var(--space-2)', marginBottom: 'var(--space-1)' }}>
                                                    {cit.page && <span style={{ color: 'var(--color-text-muted)' }}>p.{cit.page}</span>}
                                                    {cit.lineRange && <span style={{ color: 'var(--color-text-muted)' }}>Lines {cit.lineRange}</span>}
                                                </div>
                                                <div style={{
                                                    color: 'var(--color-text-secondary)', fontStyle: 'italic',
                                                    display: '-webkit-box', WebkitLineClamp: 2,
                                                    WebkitBoxOrient: 'vertical', overflow: 'hidden'
                                                }}>
                                                    {cit.excerpt}
                                                </div>
                                            </div>
                                        ))}
                                        {detailCitations.length > 10 && (
                                            <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', padding: 'var(--space-2)' }}>
                                                + {detailCitations.length - 10} more citations
                                            </div>
                                        )}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
