import { useParams, Link } from 'react-router-dom'
import { useProgress } from '../App'
import { getLessonById, getNextLesson, getModuleById } from '../data/curriculum'
import { CitationList } from '../components/Citations'
import QuizQuestion from '../components/QuizQuestion'
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

export default function LessonView() {
    const { lessonId } = useParams()
    const { progress, completeLesson, saveQuizScore } = useProgress()
    const lesson = getLessonById(lessonId)

    if (!lesson) {
        return (
            <div className="page-container" style={{ textAlign: 'center', paddingTop: 'var(--space-16)' }}>
                <h1 style={{ fontSize: 'var(--font-size-2xl)' }}>Lesson not found</h1>
                <Link to="/curriculum" className="btn btn-primary" style={{ marginTop: 'var(--space-6)' }}>
                    Back to Curriculum
                </Link>
            </div>
        )
    }

    const mod = getModuleById(lesson.moduleId)
    const nextLessonId = getNextLesson(lessonId)
    const isCompleted = progress.completedLessons.includes(lessonId)

    function handleQuizComplete(isCorrect) {
        saveQuizScore(lessonId, isCorrect ? 100 : 0)
        completeLesson(lessonId)
    }

    return (
        <div className="page-container" style={{ maxWidth: 800 }}>
            {/* Breadcrumb */}
            <div className="animate-in" style={{
                display: 'flex', alignItems: 'center', gap: 'var(--space-2)',
                marginBottom: 'var(--space-6)', fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)'
            }}>
                <Link to="/curriculum" style={{ color: 'var(--color-text-muted)' }}>Curriculum</Link>
                <span>›</span>
                <span style={{ color: 'var(--color-text-accent)' }}>{mod?.title}</span>
                <span>›</span>
                <span>{lesson.title}</span>
            </div>

            {/* Lesson Header */}
            <div className="animate-in" style={{ marginBottom: 'var(--space-8)' }}>
                <div style={{
                    display: 'flex', alignItems: 'center', gap: 'var(--space-3)',
                    marginBottom: 'var(--space-4)'
                }}>
                    {(() => {
                        const IconComponent = mod?.icon ? iconMap[mod.icon] : null;
                        return IconComponent ? <span style={{ display: 'flex', alignItems: 'center', color: 'var(--color-primary)' }}><IconComponent size={24} /></span> : null;
                    })()}
                    <div>
                        <div className="page-eyebrow">{mod?.subtitle}</div>
                        <h1 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 800 }}>{lesson.title}</h1>
                    </div>
                    {isCompleted && <span className="badge badge-success" style={{ marginLeft: 'auto' }}>✓ Completed</span>}
                </div>

                <p style={{
                    fontSize: 'var(--font-size-md)', color: 'var(--color-text-secondary)',
                    lineHeight: 1.6, marginBottom: 'var(--space-4)'
                }}>
                    {lesson.objective}
                </p>

                {/* Meta */}
                <div style={{
                    display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap',
                    fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)'
                }}>
                    <span>⏱ ~{lesson.estimatedMinutes} min</span>
                    <span>📎 {lesson.citations?.length || 0} citations</span>
                    <span>💡 {lesson.keyConcepts?.length || 0} key concepts</span>
                </div>
            </div>

            {/* Key Concepts Bar */}
            {lesson.keyConcepts?.length > 0 && (
                <div className="animate-in animate-in-delay-1" style={{
                    background: 'var(--color-bg-card)', border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-lg)', padding: 'var(--space-4) var(--space-6)',
                    marginBottom: 'var(--space-8)'
                }}>
                    <div style={{
                        fontSize: 'var(--font-size-xs)', textTransform: 'uppercase', letterSpacing: '0.1em',
                        color: 'var(--color-gold)', fontWeight: 700, marginBottom: 'var(--space-2)'
                    }}>
                        Key Concepts
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
                        {lesson.keyConcepts.map((kc, i) => (
                            <span key={i} className="badge badge-info">{kc}</span>
                        ))}
                    </div>
                </div>
            )}

            {/* Lesson Content */}
            <div className="lesson-content animate-in animate-in-delay-2">
                {lesson.content?.map((block, i) => {
                    switch (block.type) {
                        case 'text':
                            return (
                                <div key={i} dangerouslySetInnerHTML={{
                                    __html: block.body.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br/>')
                                }} style={{ marginBottom: 'var(--space-6)' }} />
                            )

                        case 'keyConcept':
                            return (
                                <div key={i} className="key-concept" style={{ marginBottom: 'var(--space-6)' }}>
                                    <div className="key-concept-label">
                                        {block.label}
                                        {block.citations && <CitationList citationIds={block.citations} />}
                                    </div>
                                    <div dangerouslySetInnerHTML={{
                                        __html: block.body.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br/>')
                                    }} style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }} />
                                </div>
                            )

                        case 'formula':
                            return (
                                <div key={i} className="formula-box">
                                    <div className="formula">{block.formula}</div>
                                    {block.description && <div className="formula-desc">{block.description}</div>}
                                </div>
                            )

                        case 'image':
                            return (
                                <div key={i} className="image-box" style={{ marginBottom: 'var(--space-6)', textAlign: 'center' }}>
                                    <img src={block.src} alt={block.caption || 'Lesson image'} style={{ maxWidth: '100%', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }} />
                                    {block.caption && <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)', marginTop: 'var(--space-2)' }}>{block.caption}</div>}
                                </div>
                            )

                        default:
                            return null
                    }
                })}
            </div>

            {/* Checkpoint Quiz */}
            {lesson.checkpoint && (
                <div className="animate-in animate-in-delay-3" style={{ marginTop: 'var(--space-8)' }}>
                    <QuizQuestion
                        key={lesson.id}
                        question={lesson.checkpoint.question}
                        options={lesson.checkpoint.options}
                        correctIndex={lesson.checkpoint.correctIndex}
                        explanation={lesson.checkpoint.explanation}
                        onComplete={handleQuizComplete}
                    />
                </div>
            )}

            {/* Lesson Citations Footer */}
            {lesson.citations?.length > 0 && (
                <div style={{
                    marginTop: 'var(--space-10)', padding: 'var(--space-6)',
                    background: 'var(--color-bg-card)', borderRadius: 'var(--radius-lg)',
                    border: '1px solid var(--color-border)'
                }}>
                    <h3 style={{ fontSize: 'var(--font-size-sm)', fontWeight: 700, marginBottom: 'var(--space-3)' }}>
                        📎 Sources Referenced in This Lesson
                    </h3>
                    <CitationList citationIds={lesson.citations} />
                </div>
            )}

            {/* Navigation */}
            <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                marginTop: 'var(--space-10)', paddingTop: 'var(--space-6)',
                borderTop: '1px solid var(--color-border)'
            }}>
                <Link to="/curriculum" className="btn btn-ghost">
                    ← All Modules
                </Link>
                {nextLessonId && (
                    <Link to={`/lesson/${nextLessonId}`} className="btn btn-primary">
                        Next Lesson →
                    </Link>
                )}
            </div>
        </div>
    )
}
