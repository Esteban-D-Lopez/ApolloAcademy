import { Link } from 'react-router-dom'
import { useProgress } from '../App'
import { modules, getAllLessons } from '../data/curriculum'
import { Target, Landmark, Star, Brain, BarChart3, Trophy, BookOpen, Building, Gem, Compass, Swords, TrendingUp } from 'lucide-react'

const iconMap = {
    Landmark,
    BarChart3,
    Building,
    Gem,
    Compass,
    Swords,
    TrendingUp
}

const badges = [
    { id: 'first-lesson', name: 'First Steps', icon: <Target size={40} />, description: 'Complete your first lesson', condition: (p) => p.completedLessons.length >= 1 },
    {
        id: 'foundations', name: 'Foundation Layer', icon: <Landmark size={40} />, description: 'Complete all Foundations lessons', condition: (p) => {
            const mod = modules.find(m => m.id === 'foundations')
            return mod && mod.lessons.every(l => p.completedLessons.includes(l.id))
        }
    },
    { id: 'half-way', name: 'Halfway There', icon: <Star size={40} />, description: 'Complete 50% of all lessons', condition: (p) => p.completedLessons.length >= getAllLessons().length / 2 },
    { id: 'quiz-master', name: 'Quiz Master', icon: <Brain size={40} />, description: 'Pass 5 checkpoint quizzes', condition: (p) => Object.values(p.quizScores).filter(s => s === 100).length >= 5 },
    {
        id: 'all-segments', name: 'Segment Scholar', icon: <BarChart3 size={40} />, description: 'Complete all three segment deep dives', condition: (p) => {
            return ['fre-mechanics', 'sre-mechanics', 'pii-deep-dive'].every(l => p.completedLessons.includes(l))
        }
    },
    { id: 'completionist', name: 'Apollo Expert', icon: <Trophy size={40} />, description: 'Complete all lessons', condition: (p) => p.completedLessons.length >= getAllLessons().length },
]

export default function Profile() {
    const { progress } = useProgress()
    const allLessons = getAllLessons()
    const totalLessons = allLessons.length
    const completedCount = progress.completedLessons.length
    const completionPct = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0
    const quizzesPassed = Object.values(progress.quizScores).filter(s => s === 100).length
    const totalQuizzes = Object.keys(progress.quizScores).length

    const earnedBadges = badges.filter(b => b.condition(progress))
    const lockedBadges = badges.filter(b => !b.condition(progress))

    return (
        <div className="page-container">
            <div className="page-header animate-in">
                <div className="page-eyebrow">Profile</div>
                <h1 className="page-title">Your Progress</h1>
                <p className="page-subtitle">
                    Track your learning journey across Apollo Academy.
                </p>
            </div>

            {/* Progress Overview */}
            <div className="grid-3 animate-in animate-in-delay-1" style={{ marginBottom: 'var(--space-10)' }}>
                <div className="card card-gold" style={{ textAlign: 'center' }}>
                    <svg width="80" height="80" viewBox="0 0 80 80" style={{ margin: '0 auto var(--space-4)' }}>
                        <circle cx="40" cy="40" r="34" fill="none" stroke="var(--color-bg-tertiary)" strokeWidth="6" />
                        <circle cx="40" cy="40" r="34" fill="none" stroke="var(--color-gold)" strokeWidth="6"
                            strokeDasharray={`${2 * Math.PI * 34}`}
                            strokeDashoffset={`${2 * Math.PI * 34 * (1 - completionPct / 100)}`}
                            strokeLinecap="round" transform="rotate(-90 40 40)"
                            style={{ transition: 'stroke-dashoffset 0.8s ease' }}
                        />
                        <text x="40" y="45" textAnchor="middle" fill="var(--color-gold)" fontSize="18" fontWeight="800">
                            {completionPct}%
                        </text>
                    </svg>
                    <div style={{ fontSize: 'var(--font-size-sm)', fontWeight: 600 }}>Overall Completion</div>
                    <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
                        {completedCount} of {totalLessons} lessons
                    </div>
                </div>

                <div className="card" style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 'var(--font-size-4xl)', fontWeight: 800, color: 'var(--color-success)', margin: 'var(--space-4) 0' }}>
                        {quizzesPassed}
                    </div>
                    <div style={{ fontSize: 'var(--font-size-sm)', fontWeight: 600 }}>Quizzes Passed</div>
                    <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
                        {totalQuizzes} attempted
                    </div>
                </div>

                <div className="card" style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 'var(--font-size-4xl)', fontWeight: 800, color: 'var(--color-segment-am)', margin: 'var(--space-4) 0' }}>
                        {earnedBadges.length}
                    </div>
                    <div style={{ fontSize: 'var(--font-size-sm)', fontWeight: 600 }}>Badges Earned</div>
                    <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
                        {badges.length} total
                    </div>
                </div>
            </div>

            {/* Badges */}
            <div className="animate-in animate-in-delay-2" style={{ marginBottom: 'var(--space-10)' }}>
                <h2 style={{ display: 'flex', alignItems: 'center', fontSize: 'var(--font-size-xl)', marginBottom: 'var(--space-6)' }}>
                    <Trophy size={24} style={{ marginRight: 8, color: 'var(--color-gold)' }} /> Badges
                </h2>
                <div className="grid-3">
                    {earnedBadges.map(badge => (
                        <div key={badge.id} className="card card-gold" style={{ textAlign: 'center' }}>
                            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 'var(--space-3)', color: 'var(--color-primary)' }}>{badge.icon}</div>
                            <div style={{ fontSize: 'var(--font-size-sm)', fontWeight: 700 }}>{badge.name}</div>
                            <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', marginTop: 'var(--space-1)' }}>
                                {badge.description}
                            </div>
                            <span className="badge badge-success" style={{ marginTop: 'var(--space-3)' }}>Earned ✓</span>
                        </div>
                    ))}
                    {lockedBadges.map(badge => (
                        <div key={badge.id} className="card" style={{ textAlign: 'center', opacity: 0.5 }}>
                            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 'var(--space-3)', color: 'var(--color-text-muted)' }}>{badge.icon}</div>
                            <div style={{ fontSize: 'var(--font-size-sm)', fontWeight: 700 }}>{badge.name}</div>
                            <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', marginTop: 'var(--space-1)' }}>
                                {badge.description}
                            </div>
                            <span className="badge" style={{ marginTop: 'var(--space-3)', background: 'var(--color-bg-tertiary)', color: 'var(--color-text-muted)' }}>
                                🔒 Locked
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Module Progress */}
            <div className="animate-in animate-in-delay-3">
                <h2 style={{ display: 'flex', alignItems: 'center', fontSize: 'var(--font-size-xl)', marginBottom: 'var(--space-6)' }}>
                    <BookOpen size={24} style={{ marginRight: 8, color: 'var(--color-primary)' }} /> Module Progress
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                    {modules.map(mod => {
                        const modCompleted = mod.lessons.filter(l => progress.completedLessons.includes(l.id)).length
                        const modPct = Math.round((modCompleted / mod.lessons.length) * 100)

                        return (
                            <div key={mod.id} className="card" style={{ padding: 'var(--space-4) var(--space-6)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-3)' }}>
                                    {(() => {
                                        const IconComponent = iconMap[mod.icon];
                                        return <span style={{ display: 'flex', color: 'var(--color-text-secondary)' }}><IconComponent size={20} /></span>
                                    })()}
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontSize: 'var(--font-size-sm)', fontWeight: 600 }}>{mod.title}</div>
                                        <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
                                            {modCompleted}/{mod.lessons.length} lessons · {mod.estimatedMinutes} min
                                        </div>
                                    </div>
                                    <span style={{ fontSize: 'var(--font-size-sm)', fontWeight: 700, color: modPct === 100 ? 'var(--color-success)' : 'var(--color-gold)' }}>
                                        {modPct}%
                                    </span>
                                </div>
                                <div className="progress-bar" style={{ height: 4 }}>
                                    <div className="progress-bar-fill" style={{ width: `${modPct}%` }} />
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* CTA */}
            {completedCount < totalLessons && (
                <div style={{ textAlign: 'center', marginTop: 'var(--space-10)' }}>
                    <Link to="/curriculum" className="btn btn-primary btn-lg">
                        Continue Learning →
                    </Link>
                </div>
            )}
        </div>
    )
}
