import { useParams, Link } from 'react-router-dom'

// Segment details data inline
const segmentDetails = {
    am: {
        name: 'Asset Management',
        icon: '📊',
        color: 'var(--color-segment-am)',
        lessons: ['fre-mechanics', 'aum-and-capital', 'origination-platforms']
    },
    rs: {
        name: 'Retirement Services',
        icon: '🏦',
        color: 'var(--color-segment-rs)',
        lessons: ['sre-mechanics', 'athene-competitive-position', 'retirement-market']
    },
    pi: {
        name: 'Principal Investing',
        icon: '💎',
        color: 'var(--color-segment-pi)',
        lessons: ['pii-deep-dive']
    }
}

export default function SegmentDetail() {
    const { segmentId } = useParams()
    const seg = segmentDetails[segmentId]

    if (!seg) {
        return (
            <div className="page-container" style={{ textAlign: 'center' }}>
                <h1>Segment not found</h1>
                <Link to="/segments" className="btn btn-primary" style={{ marginTop: 'var(--space-6)' }}>
                    Back to Segments
                </Link>
            </div>
        )
    }

    return (
        <div className="page-container">
            <div className="page-header animate-in">
                <Link to="/segments" style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>
                    ← All Segments
                </Link>
                <h1 className="page-title" style={{ marginTop: 'var(--space-4)' }}>
                    <span style={{ marginRight: 'var(--space-3)' }}>{seg.icon}</span>
                    {seg.name}
                </h1>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                {seg.lessons.map(lid => (
                    <Link key={lid} to={`/lesson/${lid}`} className="btn btn-primary btn-lg">
                        📖 Start Deep Dive: {lid.replace(/-/g, ' ')}
                    </Link>
                ))}
            </div>
        </div>
    )
}
