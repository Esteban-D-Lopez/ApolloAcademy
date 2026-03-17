import { Link } from 'react-router-dom'
import { useProgress } from '../App'
import { modules } from '../data/curriculum'
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

export default function Curriculum() {
    const { progress } = useProgress()

    return (
        <div className="page-container">
            <div className="page-header animate-in">
                <div className="page-eyebrow">Curriculum</div>
                <h1 className="page-title">Learning Modules</h1>
                <p className="page-subtitle">
                    7 modules from foundations to financial storytelling. Each lesson includes cited definitions,
                    leadership language, and checkpoint quizzes.
                </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
                {modules.map((mod, mi) => {
                    const modCompleted = mod.lessons.filter(l => progress.completedLessons.includes(l.id)).length
                    const modPct = Math.round((modCompleted / mod.lessons.length) * 100)

                    return (
                        <div key={mod.id} className="animate-in" style={{ animationDelay: `${mi * 0.1}s` }}>
                            {/* Module Header */}
                            <div style={{
                                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                marginBottom: 'var(--space-4)'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                                    {(() => {
                                        const IconComponent = iconMap[mod.icon];
                                        return <span style={{ display: 'flex', alignItems: 'center', color: 'var(--color-primary)' }}><IconComponent size={28} /></span>
                                    })()}
                                    <div>
                                        <h2 style={{ fontSize: 'var(--font-size-xl)' }}>{mod.title}</h2>
                                        <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-accent)' }}>
                                            {mod.subtitle} · ~{mod.estimatedMinutes} min
                                        </span>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                                    {modCompleted > 0 && (
                                        <span className="badge badge-success">{modCompleted}/{mod.lessons.length}</span>
                                    )}
                                </div>
                            </div>

                            {/* Module Progress */}
                            {modCompleted > 0 && (
                                <div className="progress-bar" style={{ marginBottom: 'var(--space-4)', height: 4 }}>
                                    <div className="progress-bar-fill" style={{ width: `${modPct}%` }} />
                                </div>
                            )}

                            {/* Lessons */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                                {mod.lessons.map((lesson, li) => {
                                    const isCompleted = progress.completedLessons.includes(lesson.id)

                                    return (
                                        <Link
                                            key={lesson.id}
                                            to={`/lesson/${lesson.id}`}
                                            style={{ textDecoration: 'none' }}
                                        >
                                            <div className="card" style={{
                                                display: 'flex', gap: 'var(--space-4)', alignItems: 'center',
                                                padding: 'var(--space-4) var(--space-6)'
                                            }}>
                                                <div style={{
                                                    width: 40, height: 40, borderRadius: 'var(--radius-full)',
                                                    background: isCompleted ? 'var(--color-success-bg)' : 'var(--color-bg-tertiary)',
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                    fontSize: isCompleted ? '1rem' : 'var(--font-size-sm)',
                                                    fontWeight: 700,
                                                    color: isCompleted ? 'var(--color-success)' : 'var(--color-text-muted)',
                                                    flexShrink: 0,
                                                    border: isCompleted ? '2px solid var(--color-success)' : '2px solid var(--color-border)'
                                                }}>
                                                    {isCompleted ? '✓' : li + 1}
                                                </div>

                                                <div style={{ flex: 1, minWidth: 0 }}>
                                                    <h3 style={{ fontSize: 'var(--font-size-base)', fontWeight: 600, marginBottom: 2 }}>
                                                        {lesson.title}
                                                    </h3>
                                                    <p style={{
                                                        fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)',
                                                        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'
                                                    }}>
                                                        {lesson.objective}
                                                    </p>
                                                </div>

                                                <div style={{
                                                    display: 'flex', alignItems: 'center', gap: 'var(--space-3)',
                                                    flexShrink: 0
                                                }}>
                                                    <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
                                                        ~{lesson.estimatedMinutes} min
                                                    </span>
                                                    <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-gold)' }}>
                                                        {lesson.citations?.length || 0} citations
                                                    </span>
                                                    <span style={{ color: 'var(--color-text-muted)' }}>→</span>
                                                </div>
                                            </div>
                                        </Link>
                                    )
                                })}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
