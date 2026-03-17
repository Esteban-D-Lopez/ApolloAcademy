import { Link } from 'react-router-dom'
import { useProgress } from '../App'
import { modules, getAllLessons } from '../data/curriculum'
import { Landmark, BarChart3, Building, Gem, Compass, Swords, TrendingUp } from 'lucide-react'

const iconMap = {
    Landmark,
    BarChart3,
    Building,
    Gem,
    Compass,
    Swords,
    TrendingUp
}

export default function StartHere() {
    const { progress } = useProgress()
    const allLessons = getAllLessons()
    const completedCount = progress.completedLessons.length
    const totalLessons = allLessons.length
    const completionPct = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0

    // Find next uncompleted lesson
    const nextLesson = allLessons.find(l => !progress.completedLessons.includes(l.id))

    const totalMinutes = modules.reduce((sum, m) => sum + m.estimatedMinutes, 0)

    return (
        <div className="page-container">
            {/* Hero Section */}
            <div className="animate-in" style={{ textAlign: 'center', marginBottom: 'var(--space-16)' }}>
                <div style={{
                    width: 80, height: 80, borderRadius: 'var(--radius-xl)',
                    background: 'linear-gradient(135deg, var(--color-gold-dark), var(--color-gold))',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '2.2rem', margin: '0 auto var(--space-6)',
                    boxShadow: 'var(--shadow-glow-strong)'
                }}>
                    <Landmark size={40} color="var(--color-bg-primary)" />
                </div>

                <h1 style={{
                    fontSize: 'var(--font-size-4xl)', fontWeight: 800, letterSpacing: '-0.04em',
                    marginBottom: 'var(--space-4)',
                    background: 'linear-gradient(135deg, var(--color-text-primary) 0%, var(--color-gold) 100%)',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'
                }}>
                    Welcome to Apollo Academy
                </h1>

                <p style={{
                    fontSize: 'var(--font-size-lg)', color: 'var(--color-text-secondary)',
                    maxWidth: 600, margin: '0 auto var(--space-8)', lineHeight: 1.7
                }}>
                    Master Apollo&apos;s business model, financial performance, and strategic narratives.
                    Every claim is cited. Every metric is sourced.
                </p>

                {/* Progress Ring */}
                {completedCount > 0 && (
                    <div style={{
                        display: 'inline-flex', alignItems: 'center', gap: 'var(--space-4)',
                        background: 'var(--color-bg-card)', padding: 'var(--space-4) var(--space-6)',
                        borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)',
                        marginBottom: 'var(--space-6)'
                    }}>
                        <svg width="48" height="48" viewBox="0 0 48 48">
                            <circle cx="24" cy="24" r="20" fill="none" stroke="var(--color-bg-tertiary)" strokeWidth="4" />
                            <circle cx="24" cy="24" r="20" fill="none" stroke="var(--color-gold)" strokeWidth="4"
                                strokeDasharray={`${2 * Math.PI * 20}`}
                                strokeDashoffset={`${2 * Math.PI * 20 * (1 - completionPct / 100)}`}
                                strokeLinecap="round"
                                transform="rotate(-90 24 24)"
                                style={{ transition: 'stroke-dashoffset 0.5s ease' }}
                            />
                            <text x="24" y="28" textAnchor="middle" fill="var(--color-gold)" fontSize="12" fontWeight="700">
                                {completionPct}%
                            </text>
                        </svg>
                        <div style={{ textAlign: 'left' }}>
                            <div style={{ fontSize: 'var(--font-size-sm)', fontWeight: 600 }}>
                                {completedCount} of {totalLessons} lessons complete
                            </div>
                            <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
                                Keep going!
                            </div>
                        </div>
                    </div>
                )}

                <div style={{ display: 'flex', gap: 'var(--space-4)', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <Link
                        to={nextLesson ? `/lesson/${nextLesson.id}` : '/curriculum'}
                        className="btn btn-primary btn-lg"
                    >
                        {completedCount > 0 ? 'Continue Learning' : 'Begin Day 1 Path'}
                    </Link>
                    <Link to="/curriculum" className="btn btn-secondary btn-lg">
                        Browse Curriculum
                    </Link>
                </div>
            </div>

            {/* Stats */}
            <div className="animate-in animate-in-delay-1" style={{ marginBottom: 'var(--space-12)' }}>
                <div className="stats-row" style={{ justifyContent: 'center' }}>
                    <div className="stat-item">
                        <div className="stat-value">{modules.length}</div>
                        <div className="stat-label">Modules</div>
                    </div>
                    <div className="stat-item">
                        <div className="stat-value">{totalLessons}</div>
                        <div className="stat-label">Lessons</div>
                    </div>
                    <div className="stat-item">
                        <div className="stat-value">~{totalMinutes}</div>
                        <div className="stat-label">Minutes</div>
                    </div>
                    <div className="stat-item">
                        <div className="stat-value">8</div>
                        <div className="stat-label">Sources</div>
                    </div>
                    <div className="stat-item">
                        <div className="stat-value">45+</div>
                        <div className="stat-label">Citations</div>
                    </div>
                </div>
            </div>

            {/* Module Cards */}
            <div className="animate-in animate-in-delay-2">
                <h2 style={{ fontSize: 'var(--font-size-xl)', marginBottom: 'var(--space-6)' }}>
                    Learning Path
                </h2>
                <div className="grid-2">
                    {modules.map((mod, i) => {
                        const modLessons = mod.lessons
                        const modCompleted = modLessons.filter(l => progress.completedLessons.includes(l.id)).length
                        const modPct = Math.round((modCompleted / modLessons.length) * 100)

                        return (
                            <Link
                                key={mod.id}
                                to={`/lesson/${mod.lessons[0].id}`}
                                style={{ textDecoration: 'none' }}
                            >
                                <div className={`card ${i === 0 ? 'card-gold' : ''}`}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 'var(--space-3)' }}>
                                        {(() => {
                                            const IconComponent = iconMap[mod.icon];
                                            return <span style={{ display: 'flex', alignItems: 'center', color: 'var(--color-primary)' }}><IconComponent size={32} /></span>
                                        })()}
                                        {modCompleted > 0 && (
                                            <span className="badge badge-success">{modPct}% done</span>
                                        )}
                                    </div>
                                    <h3 style={{ fontSize: 'var(--font-size-lg)', marginBottom: 'var(--space-1)' }}>
                                        {mod.title}
                                    </h3>
                                    <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-accent)', marginBottom: 'var(--space-2)' }}>
                                        {mod.subtitle}
                                    </p>
                                    <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-4)', lineHeight: 1.5 }}>
                                        {mod.description}
                                    </p>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
                                            {modLessons.length} lessons · ~{mod.estimatedMinutes} min
                                        </span>
                                        <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-gold)' }}>→</span>
                                    </div>
                                    {modCompleted > 0 && (
                                        <div className="progress-bar" style={{ marginTop: 'var(--space-3)' }}>
                                            <div className="progress-bar-fill" style={{ width: `${modPct}%` }} />
                                        </div>
                                    )}
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
