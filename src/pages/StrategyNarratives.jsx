import { Link } from 'react-router-dom'
import { CitationList } from '../components/Citations'

const phrases = [
    {
        phrase: '"Six Markets"',
        speaker: 'Marc Rowan',
        metric: 'Capital Formation / AUM Growth',
        meaning: 'Apollo now serves six buyer pools instead of one. Each is roughly the size of the original institutional alts market.',
        citations: ['c-six-markets-rowan']
    },
    {
        phrase: '"Replacement"',
        speaker: 'Leadership',
        metric: 'Inflows / AUM',
        meaning: 'Private assets will replace public fixed income (first) then equities. $50T+ TAM. Products offer 200bps yield pickup.',
        citations: ['c-replacement-thesis']
    },
    {
        phrase: '"Our Mona Lisa"',
        speaker: 'Jim Zelter',
        metric: 'Origination Volume',
        meaning: 'Apollo\'s 16-platform origination machine. Irreplaceable, built over a decade, 4,000+ originators.',
        citations: ['c-moat-zelter']
    },
    {
        phrase: '"Principal Mindset"',
        speaker: 'Marc Rowan',
        metric: 'Risk Management',
        meaning: 'Owning assets long-term (Athene) vs. chasing popularity. Drives conservative positioning like near-zero software exposure.',
        citations: ['c-principal-rowan']
    },
    {
        phrase: '"Capital Formation Machine"',
        speaker: 'Jim Zelter',
        metric: 'Inflows / Origination',
        meaning: 'Origination + capital raising work in sync. Capital formation shapes origination upstream, not just downstream distribution.',
        citations: ['c-capform-zelter']
    }
]

const growthPillars = [
    { name: 'Origination', target: '$275B+ annual', current: '$309B (FY\'25)', status: 'Ahead of plan', icon: '🏭', citationId: 'c-origination-target' },
    { name: 'Global Wealth', target: '$150B+ cumulative', current: '$18B (FY\'25)', status: 'On track', icon: '🌍', citationId: 'c-wealth-target' },
    { name: 'Capital Solutions', target: '~$1B revenue', current: '$808M (FY\'25)', status: 'Approaching', icon: '🔗', citationId: 'c-acs-target' }
]

export default function StrategyNarratives() {
    return (
        <div className="page-container">
            <div className="page-header animate-in">
                <div className="page-eyebrow">Strategy & Narratives</div>
                <h1 className="page-title">How Leaders Say It</h1>
                <p className="page-subtitle">
                    Decode the phrases Apollo leadership uses in investor communications.
                    Each phrase maps to specific metrics and initiatives.
                </p>
            </div>

            {/* Phrase Decoder */}
            <div className="animate-in animate-in-delay-1" style={{ marginBottom: 'var(--space-10)' }}>
                <h2 style={{ fontSize: 'var(--font-size-xl)', marginBottom: 'var(--space-6)' }}>
                    🔑 Leadership Phrase Decoder
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                    {phrases.map((p, i) => (
                        <div key={i} className="card" style={{ borderLeft: '3px solid var(--color-gold)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 'var(--space-3)', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
                                <h3 style={{ fontSize: 'var(--font-size-md)', color: 'var(--color-gold)' }}>
                                    {p.phrase}
                                    <CitationList citationIds={p.citations} />
                                </h3>
                                <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                                    <span className="badge badge-info">{p.speaker}</span>
                                    <span className="badge badge-gold">{p.metric}</span>
                                </div>
                            </div>
                            <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                                {p.meaning}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Growth Pillars */}
            <div className="animate-in animate-in-delay-2" style={{ marginBottom: 'var(--space-10)' }}>
                <h2 style={{ fontSize: 'var(--font-size-xl)', marginBottom: 'var(--space-6)' }}>
                    📊 Three Growth Pillars
                </h2>
                <div className="grid-3">
                    {growthPillars.map((pillar, i) => (
                        <div key={i} className="card card-gold">
                            <div style={{ fontSize: '2rem', marginBottom: 'var(--space-3)' }}>{pillar.icon}</div>
                            <h3 style={{ fontSize: 'var(--font-size-lg)', marginBottom: 'var(--space-2)' }}>
                                {pillar.name}
                            </h3>
                            <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', marginBottom: 'var(--space-4)' }}>
                                Target: {pillar.target}
                            </div>
                            <div style={{
                                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                background: 'var(--color-bg-primary)', borderRadius: 'var(--radius-md)',
                                padding: 'var(--space-3) var(--space-4)'
                            }}>
                                <div>
                                    <div style={{ fontSize: 'var(--font-size-sm)', fontWeight: 700 }}>{pillar.current}</div>
                                    <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>Current</div>
                                </div>
                                <span className="badge badge-success">{pillar.status}</span>
                            </div>
                            <div style={{ marginTop: 'var(--space-3)' }}>
                                <CitationList citationIds={[pillar.citationId]} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Link to Lesson */}
            <div className="animate-in animate-in-delay-3" style={{ textAlign: 'center' }}>
                <Link to="/lesson/investor-language-primer" className="btn btn-primary btn-lg">
                    📖 Full Investor Language Primer
                </Link>
                <Link to="/lesson/three-growth-pillars" className="btn btn-secondary btn-lg" style={{ marginLeft: 'var(--space-4)' }}>
                    📖 Growth Pillars Deep Dive
                </Link>
            </div>
        </div>
    )
}
