import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { terms, searchTerms } from '../data/terms'
import { getAllLessons } from '../data/curriculum'
import { sources } from '../data/sources'
import { Brain, BookOpen, Library, Search } from 'lucide-react'

// Static data — compute once at module load, not on every render
const allLessons = getAllLessons()

export default function SearchOverlay({ onClose }) {
    const [query, setQuery] = useState('')
    const [debouncedQuery, setDebouncedQuery] = useState('')
    const navigate = useNavigate()

    // Debounce: wait 250ms after the user stops typing before searching
    useEffect(() => {
        const timer = setTimeout(() => setDebouncedQuery(query), 250)
        return () => clearTimeout(timer)
    }, [query])

    const results = useMemo(() => {
        if (debouncedQuery.length < 2) return []
        return getSearchResults(debouncedQuery)
    }, [debouncedQuery])

    function getSearchResults(q) {
        const matches = []
        const ql = q.toLowerCase()

        // Search terms
        searchTerms(q).slice(0, 5).forEach(t => {
            matches.push({ type: 'Term', name: t.name, path: `/knowledge?term=${t.id}`, icon: <Brain size={16} /> })
        })

        // Search lessons
        allLessons.filter(l =>
            l.title.toLowerCase().includes(ql) ||
            l.objective.toLowerCase().includes(ql)
        ).slice(0, 5).forEach(l => {
            matches.push({ type: 'Lesson', name: l.title, path: `/lesson/${l.id}`, icon: <BookOpen size={16} /> })
        })

        // Search sources
        sources.filter(s =>
            s.title.toLowerCase().includes(ql) ||
            s.summary.toLowerCase().includes(ql)
        ).slice(0, 3).forEach(s => {
            matches.push({ type: 'Source', name: s.title, path: `/library?source=${s.id}`, icon: <Library size={16} /> })
        })

        return matches
    }

    function handleSelect(result) {
        navigate(result.path)
        onClose()
    }

    return (
        <div className="search-overlay" onClick={onClose}>
            <div className="search-container" onClick={e => e.stopPropagation()}>
                <div className="search-input-wrapper">
                    <span className="search-icon" style={{ display: 'flex', alignItems: 'center', marginTop: 2 }}><Search size={16} /></span>
                    <input
                        className="search-input"
                        type="text"
                        placeholder="Search terms, lessons, sources..."
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        autoFocus
                    />
                    <button className="btn-ghost" onClick={onClose} style={{ fontSize: 'var(--font-size-xs)' }}>
                        ESC
                    </button>
                </div>
                {results.length > 0 && (
                    <div className="search-results">
                        {results.map((r, i) => (
                            <div key={i} className="search-result-item" onClick={() => handleSelect(r)}>
                                <span style={{ display: 'flex', alignItems: 'center', color: 'var(--color-text-muted)' }}>{r.icon}</span>
                                <span className="search-result-type">{r.type}</span>
                                <span className="search-result-name">{r.name}</span>
                            </div>
                        ))}
                    </div>
                )}
                {debouncedQuery.length >= 2 && results.length === 0 && (
                    <div style={{ padding: 'var(--space-6)', textAlign: 'center', color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)' }}>
                        No results found for "{debouncedQuery}"
                    </div>
                )}
                {query.length < 2 && (
                    <div style={{ padding: 'var(--space-6)', textAlign: 'center', color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)' }}>
                        Type at least 2 characters to search
                    </div>
                )}
            </div>
        </div>
    )
}
