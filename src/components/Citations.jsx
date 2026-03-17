import { useState } from 'react'
import { getCitation } from '../data/citations'
import { getSourceById } from '../data/sources'

export function CitationChip({ citationId, index }) {
    const [showViewer, setShowViewer] = useState(false)

    return (
        <>
            <button
                className="citation-chip"
                onClick={() => setShowViewer(true)}
                title="View source citation"
                aria-label={`View citation ${index || citationId}`}
            >
                {index || '?'}
            </button>
            {showViewer && (
                <ExcerptViewer citationId={citationId} onClose={() => setShowViewer(false)} />
            )}
        </>
    )
}

export function ExcerptViewer({ citationId, onClose }) {
    const citation = getCitation(citationId)
    if (!citation) return null

    const source = getSourceById(citation.source)

    return (
        <div
            className="excerpt-viewer-overlay"
            onClick={onClose}
            role="presentation"
        >
            <div
                className="excerpt-viewer"
                onClick={e => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-label={`Citation from ${citation.document}`}
            >
                <div className="excerpt-viewer-header">
                    <div>
                        <h3 style={{ fontSize: 'var(--font-size-md)', fontWeight: 600 }}>
                            📄 {citation.document}
                        </h3>
                        <div className="excerpt-viewer-meta">
                            <span className="excerpt-viewer-meta-tag">📅 {citation.date}</span>
                            {citation.page && <span className="excerpt-viewer-meta-tag">📄 Page {citation.page}</span>}
                            {citation.lineRange && <span className="excerpt-viewer-meta-tag">📍 Lines {citation.lineRange}</span>}
                            {source && <span className="excerpt-viewer-meta-tag">📁 {source.type}</span>}
                        </div>
                    </div>
                    <button className="excerpt-viewer-close" onClick={onClose} aria-label="Close citation viewer">✕</button>
                </div>
                <div className="excerpt-viewer-body">
                    <p className="excerpt-text">{citation.excerpt}</p>
                </div>
            </div>
        </div>
    )
}

export function CitationList({ citationIds }) {
    if (!citationIds || citationIds.length === 0) return null

    return (
        <span className="citation-list">
            {citationIds.map((id, i) => (
                <CitationChip key={id} citationId={id} index={i + 1} />
            ))}
        </span>
    )
}
