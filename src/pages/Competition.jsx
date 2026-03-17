import { Link } from 'react-router-dom'
import { CitationList } from '../components/Citations'

const competitorGroups = [
    {
        segment: 'Asset Management',
        icon: '📊',
        color: 'var(--color-segment-am)',
        competitors: ['Blackstone', 'KKR', 'Carlyle', 'Ares', 'TPG', 'Blue Owl', 'Brookfield'],
        dimensions: [
            { name: 'Origination Capability', apollo: 'Leader', detail: '16 platforms, 4,000+ originators, $309B FY\'25' },
            { name: 'Product Breadth', apollo: 'Leader', detail: 'Yield to equity spectrum, 6 markets' },
            { name: 'PE Track Record', apollo: 'Strong', detail: '39% gross / 24% net IRR since 1990' },
            { name: 'Credit AUM', apollo: 'Leader', detail: '#1 IG alternative credit, 60% IG mix' },
            { name: 'Wealth Distribution', apollo: 'Growing', detail: '$18B raised in FY\'25 (record)' }
        ],
        citations: ['c-comp-am']
    },
    {
        segment: 'Retirement Services',
        icon: '🏦',
        color: 'var(--color-segment-rs)',
        competitors: ['MetLife', 'Prudential', 'Lincoln', 'Global Atlantic (KKR)', 'MassMutual'],
        dimensions: [
            { name: 'Financial Strength', apollo: 'A1/A+/A+', detail: 'Consistent top-tier ratings across agencies' },
            { name: 'Annuity Sales', apollo: '#1 US', detail: '~9% market share per LIMRA' },
            { name: 'Cost Structure', apollo: 'Low', detail: 'Operating efficiency competitive advantage' },
            { name: 'Investment Returns', apollo: 'Leader', detail: 'Apollo origination → excess spread' },
            { name: 'Channel Diversity', apollo: 'Strong', detail: 'Retail, institutional, reinsurance, PGA' }
        ],
        citations: ['c-comp-rs']
    }
]

export default function Competition() {
    return (
        <div className="page-container">
            <div className="page-header animate-in">
                <div className="page-eyebrow">Competition & Market</div>
                <h1 className="page-title">Competitive Landscape</h1>
                <p className="page-subtitle">
                    How Apollo differentiates across segments, who the key competitors are,
                    and where competitive pressure manifests.
                </p>
            </div>

            {/* Apollo's Moat */}
            <div className="card card-gold animate-in animate-in-delay-1" style={{ marginBottom: 'var(--space-10)' }}>
                <h2 style={{ fontSize: 'var(--font-size-lg)', marginBottom: 'var(--space-4)' }}>
                    🏰 Apollo&apos;s Core Competitive Advantage
                    <CitationList citationIds={['c-moat-zelter', 'c-moat-platforms']} />
                </h2>
                <p style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-text-secondary)', lineHeight: 1.7, marginBottom: 'var(--space-4)' }}>
                    Apollo&apos;s deepest moat is its <strong>origination machine</strong> — 16 proprietary platforms
                    with 4,000+ originators, built over a decade with $8B+ invested. This generates assets at
                    100-200bps excess spread versus equivalent-rated public corporates, fueling both FRE (through
                    management and ACS fees) and SRE (through Athene balance sheet returns).
                </p>
                <div className="formula-box" style={{ background: 'var(--color-bg-secondary)' }}>
                    <div className="formula" style={{ fontSize: 'var(--font-size-lg)' }}>
                        Origination → Excess Spread → FRE + SRE + ACS + PII
                    </div>
                    <div className="formula-desc">The origination flywheel touches every earning stream</div>
                </div>
            </div>

            {/* Competitor Groups */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-10)' }}>
                {competitorGroups.map((group, gi) => (
                    <div key={gi} className="animate-in" style={{ animationDelay: `${(gi + 2) * 0.15}s` }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-6)' }}>
                            <span style={{ fontSize: '1.5rem' }}>{group.icon}</span>
                            <h2 style={{ fontSize: 'var(--font-size-xl)' }}>{group.segment}</h2>
                            <CitationList citationIds={group.citations} />
                        </div>

                        {/* Competitor tags */}
                        <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap', marginBottom: 'var(--space-6)' }}>
                            <span className="badge badge-gold">Apollo</span>
                            {group.competitors.map(c => (
                                <span key={c} className="badge" style={{ background: 'var(--color-bg-tertiary)', color: 'var(--color-text-muted)' }}>
                                    {c}
                                </span>
                            ))}
                        </div>

                        {/* Dimensions table */}
                        <div className="card">
                            <table className="metric-table">
                                <thead>
                                    <tr>
                                        <th>Dimension</th>
                                        <th>Apollo Position</th>
                                        <th>Detail</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {group.dimensions.map((dim, di) => (
                                        <tr key={di}>
                                            <td className="metric-name">{dim.name}</td>
                                            <td>
                                                <span className="badge badge-success" style={{
                                                    background: dim.apollo === 'Leader' || dim.apollo === '#1 US'
                                                        ? 'var(--color-success-bg)' : 'var(--color-info-bg)',
                                                    color: dim.apollo === 'Leader' || dim.apollo === '#1 US'
                                                        ? 'var(--color-success)' : 'var(--color-info)'
                                                }}>
                                                    {dim.apollo}
                                                </span>
                                            </td>
                                            <td style={{ color: 'var(--color-text-secondary)' }}>{dim.detail}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ))}
            </div>

            {/* Deep Dive Link */}
            <div style={{ textAlign: 'center', marginTop: 'var(--space-10)' }}>
                <Link to="/lesson/competitive-landscape" className="btn btn-primary btn-lg">
                    📖 Full Competition Deep Dive
                </Link>
            </div>
        </div>
    )
}
