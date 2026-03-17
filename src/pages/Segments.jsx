import { Link } from 'react-router-dom'

const segments = [
    {
        id: 'am',
        name: 'Asset Management',
        icon: '📊',
        color: 'var(--color-segment-am)',
        colorBg: 'rgba(129, 140, 248, 0.08)',
        colorBorder: 'rgba(129, 140, 248, 0.2)',
        badgeClass: 'badge-segment-am',
        metric: 'Fee Related Earnings (FRE)',
        metricValue: '$2.5B',
        metricLabel: 'FY 2025 (record)',
        description: 'Apollo\'s asset management business earns fees for managing $938B in AUM across yield, hybrid, and equity strategies. FRE is its primary metric.',
        keyStats: [
            { label: 'AUM', value: '$938B' },
            { label: 'FGAUM', value: '$709B' },
            { label: 'Origination', value: '$309B' },
            { label: 'FRE Growth', value: '+23% YoY' },
            { label: 'FRE Margin', value: '~57%' },
            { label: 'Mgmt Fees', value: '$3.4B' }
        ],
        lessons: ['fre-mechanics', 'aum-and-capital', 'origination-platforms']
    },
    {
        id: 'rs',
        name: 'Retirement Services',
        icon: '🏦',
        color: 'var(--color-segment-rs)',
        colorBg: 'rgba(52, 211, 153, 0.08)',
        colorBorder: 'rgba(52, 211, 153, 0.2)',
        badgeClass: 'badge-segment-rs',
        metric: 'Spread Related Earnings (SRE)',
        metricValue: '$3.4B',
        metricLabel: 'FY 2025 (record)',
        description: 'Athene earns spread on $292B of net invested assets backing retirement obligations. SRE is driven by net investment spread minus operating costs.',
        keyStats: [
            { label: 'NIA', value: '$292B' },
            { label: 'Net Spread', value: '120 bps' },
            { label: 'Inflows', value: '$83B' },
            { label: 'SRE Growth', value: '+9% YoY' },
            { label: 'Ratings', value: 'A1/A+/A+' },
            { label: 'US Annuity Rank', value: '#1' }
        ],
        lessons: ['sre-mechanics', 'athene-competitive-position', 'retirement-market']
    },
    {
        id: 'pi',
        name: 'Principal Investing',
        icon: '💎',
        color: 'var(--color-segment-pi)',
        colorBg: 'rgba(251, 146, 60, 0.08)',
        colorBorder: 'rgba(251, 146, 60, 0.2)',
        badgeClass: 'badge-segment-pi',
        metric: 'Principal Investing Income (PII)',
        metricValue: '$338M',
        metricLabel: 'FY 2025',
        description: 'Net realized performance fees (carry) from Apollo\'s funds. PII is a cycle-average business — lumpy but important for capital creation and retention.',
        keyStats: [
            { label: 'Q4 PII', value: '$227M' },
            { label: 'PE Gross IRR', value: '39%' },
            { label: 'PE Net IRR', value: '24%' },
            { label: 'Fund X', value: 'Escrow cleared' },
            { label: 'Type', value: 'Cycle Average' },
            { label: 'Dry Powder', value: '$64B' }
        ],
        lessons: ['pii-deep-dive']
    }
]

export default function Segments() {
    return (
        <div className="page-container">
            <div className="page-header animate-in">
                <div className="page-eyebrow">Segment Overview</div>
                <h1 className="page-title">Three Business Segments</h1>
                <p className="page-subtitle">
                    Apollo operates through three segments that combine to produce Segment Income.
                    Each has distinct economics, metrics, and growth drivers.
                </p>
            </div>

            {/* Segment Income Formula */}
            <div className="animate-in animate-in-delay-1 formula-box" style={{ marginBottom: 'var(--space-10)' }}>
                <div className="formula">
                    <span style={{ color: 'var(--color-segment-am)' }}>FRE</span>
                    {' + '}
                    <span style={{ color: 'var(--color-segment-rs)' }}>SRE</span>
                    {' + '}
                    <span style={{ color: 'var(--color-segment-pi)' }}>PII</span>
                    {' = '}
                    <span style={{ color: 'var(--color-gold)' }}>Segment Income</span>
                </div>
                <div className="formula-desc">
                    $2.5B + $3.4B + $338M = $6.2B (FY 2025)
                </div>
            </div>

            {/* Segment Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
                {segments.map((seg, i) => (
                    <div
                        key={seg.id}
                        className="card animate-in"
                        style={{
                            animationDelay: `${(i + 2) * 0.1}s`,
                            background: seg.colorBg,
                            borderColor: seg.colorBorder
                        }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 'var(--space-4)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                                <span style={{ fontSize: '2rem' }}>{seg.icon}</span>
                                <div>
                                    <h2 style={{ fontSize: 'var(--font-size-xl)' }}>{seg.name}</h2>
                                    <span className={`badge ${seg.badgeClass}`}>{seg.metric}</span>
                                </div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <div style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 800, color: seg.color }}>{seg.metricValue}</div>
                                <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>{seg.metricLabel}</div>
                            </div>
                        </div>

                        <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-6)', lineHeight: 1.6 }}>
                            {seg.description}
                        </p>

                        {/* Key Stats Grid */}
                        <div style={{
                            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
                            gap: 'var(--space-3)', marginBottom: 'var(--space-6)'
                        }}>
                            {seg.keyStats.map((stat, si) => (
                                <div key={si} style={{
                                    background: 'var(--color-bg-primary)', borderRadius: 'var(--radius-md)',
                                    padding: 'var(--space-3)', textAlign: 'center'
                                }}>
                                    <div style={{ fontSize: 'var(--font-size-sm)', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                                        {stat.value}
                                    </div>
                                    <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Deep Dive Link */}
                        <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
                            {seg.lessons.map(lid => (
                                <Link key={lid} to={`/lesson/${lid}`} className="btn btn-secondary" style={{ fontSize: 'var(--font-size-xs)' }}>
                                    📖 Deep Dive
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
