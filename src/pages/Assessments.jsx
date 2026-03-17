import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useProgress } from '../App'
import { CitationList } from '../components/Citations'
import { Radio, CheckSquare, CheckCircle2, XCircle, RotateCcw } from 'lucide-react'

// Earnings Call Decoder scenarios
const decoderScenarios = [
    {
        id: 'ec-1',
        quote: '"FRE for the year $2.5 billion, up 23% year-over-year."',
        speaker: 'Marc Rowan, CEO',
        source: 'Q4 2025 Earnings Call',
        question: 'Which segment and metric does this statement primarily describe?',
        options: [
            'Retirement Services — SRE',
            'Asset Management — FRE',
            'Principal Investing — PII',
            'Total Company — ANI'
        ],
        correctIndex: 1,
        explanation: 'FRE (Fee Related Earnings) is the primary metric for the Asset Management segment. The 23% growth reflects strong management fee growth, capital solutions fees, and fee-related performance fees.',
        citations: ['c-fre-record']
    },
    {
        id: 'ec-2',
        quote: '"Record origination, record for the quarter $97 billion, record for the year $309 billion. More importantly, robust, consistent spread, 350 basis points over treasuries with an average rating of BBB."',
        speaker: 'Marc Rowan, CEO',
        source: 'Q4 2025 Earnings Call',
        question: 'What does "350 basis points over treasuries" tell us about Apollo\'s origination quality?',
        options: [
            'Apollo is taking excessive risk to generate returns',
            'The originated assets are junk-rated and high-yield',
            'Apollo generates consistent excess spread at investment-grade quality (avg BBB)',
            'This spread is only available in public markets'
        ],
        correctIndex: 2,
        explanation: 'The 350bps spread at an average BBB rating demonstrates Apollo\'s origination moat — generating significant excess return at investment-grade quality. This is 100-200bps above equivalent-rated public corporates.',
        citations: ['c-origination-spread']
    },
    {
        id: 'ec-3',
        quote: '"A principal\'s mindset approaches every asset and every asset class as if they\'re going to own it for the long term because they do. An agent\'s mindset responds to the hot dot in the marketplace."',
        speaker: 'Marc Rowan, CEO',
        source: 'Q4 2025 Earnings Call',
        question: 'What concrete positioning does the "principal mindset" drive at Apollo?',
        options: [
            'Aggressive growth at all costs',
            'Conservative positioning — near-zero software PE exposure, defensive cash position at Athene',
            'Following market trends in popular sectors',
            'Maximizing short-term performance fees'
        ],
        correctIndex: 1,
        explanation: 'The principal mindset means Apollo approaches investments as a long-term owner (especially through Athene). This drives conservative positioning: near-zero software PE exposure, $24B defensive cash position at Athene, and 100% senior secured first lien in ADS.',
        citations: ['c-principal-rowan']
    },
    {
        id: 'ec-4',
        quote: '"We are going from serving one market, institutional alts portfolios, to serving six markets. Each of these markets has the ability to be roughly the same size as our original market."',
        speaker: 'Marc Rowan, CEO',
        source: 'Q4 2025 Earnings Call',
        question: 'If the original institutional alts market is the baseline, what is the total implied TAM expansion?',
        options: [
            '2x the original market',
            '3x the original market',
            '6x the original market',
            '10x the original market'
        ],
        correctIndex: 2,
        explanation: 'If each of the six markets is "roughly the same size" as the original institutional alts market, then Apollo\'s total addressable market is approximately 6x what powered the entire alternatives industry for 35 years.',
        citations: ['c-six-markets-rowan']
    },
    {
        id: 'ec-5',
        quote: '"The blended net spread ex notables was 120 basis points in the fourth quarter versus 121 basis points in the prior quarter."',
        speaker: 'Martin Kelly, CFO',
        source: 'Q4 2025 Earnings Call',
        question: 'Which earnings stream is directly driven by net investment spread?',
        options: [
            'FRE — management fees scale with spread',
            'PII — carry depends on spread',
            'SRE — Athene earns spread between asset returns and liability costs',
            'ANI — spread flows directly to bottom line'
        ],
        correctIndex: 2,
        explanation: 'Net investment spread is the core driver of SRE (Spread Related Earnings). It measures what Athene earns on its $292B net invested assets minus the cost of funds on its liabilities. The 120bps spread translates to ~$3.5B annualized net investment income.',
        citations: ['c-sre-spread', 'c-nis-data']
    }
]

export default function Assessments() {
    const [activeTab, setActiveTab] = useState('decoder')
    const [currentScenario, setCurrentScenario] = useState(0)
    const [selected, setSelected] = useState(null)
    const [submitted, setSubmitted] = useState(false)
    const [score, setScore] = useState({ correct: 0, total: 0 })
    const { progress } = useProgress()

    const scenario = decoderScenarios[currentScenario]
    const isCorrect = selected === scenario?.correctIndex

    function handleSubmit() {
        if (selected === null) return
        setSubmitted(true)
        setScore(prev => ({
            correct: prev.correct + (selected === scenario.correctIndex ? 1 : 0),
            total: prev.total + 1
        }))
    }

    function handleNext() {
        if (currentScenario < decoderScenarios.length - 1) {
            setCurrentScenario(prev => prev + 1)
            setSelected(null)
            setSubmitted(false)
        }
    }

    function handleRestart() {
        setCurrentScenario(0)
        setSelected(null)
        setSubmitted(false)
        setScore({ correct: 0, total: 0 })
    }

    const markers = ['A', 'B', 'C', 'D']

    return (
        <div className="page-container">
            <div className="page-header animate-in">
                <div className="page-eyebrow">Assessments</div>
                <h1 className="page-title">Test Your Knowledge</h1>
                <p className="page-subtitle">
                    Simulations and quizzes to practice financial fluency, narrative decoding, and metric mapping.
                </p>
            </div>

            {/* Tabs */}
            <div className="tabs animate-in animate-in-delay-1">
                <button className={`tab ${activeTab === 'decoder' ? 'active' : ''}`} onClick={() => setActiveTab('decoder')} style={{ display: 'flex', alignItems: 'center' }}>
                    <Radio size={18} style={{ marginRight: 8 }} /> Earnings Call Decoder
                </button>
                <button className={`tab ${activeTab === 'quizzes' ? 'active' : ''}`} onClick={() => setActiveTab('quizzes')} style={{ display: 'flex', alignItems: 'center' }}>
                    <CheckSquare size={18} style={{ marginRight: 8 }} /> Checkpoint Quizzes
                </button>
            </div>

            {activeTab === 'decoder' && (
                <div className="animate-in animate-in-delay-2">
                    {/* Score Bar */}
                    {score.total > 0 && (
                        <div style={{
                            display: 'flex', alignItems: 'center', gap: 'var(--space-4)',
                            marginBottom: 'var(--space-6)', padding: 'var(--space-3) var(--space-5)',
                            background: 'var(--color-bg-card)', borderRadius: 'var(--radius-md)',
                            border: '1px solid var(--color-border)'
                        }}>
                            <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>Score:</span>
                            <span style={{ fontSize: 'var(--font-size-lg)', fontWeight: 800, color: 'var(--color-gold)' }}>
                                {score.correct}/{score.total}
                            </span>
                            <div className="progress-bar" style={{ flex: 1, height: 4 }}>
                                <div className="progress-bar-fill" style={{ width: `${(currentScenario + 1) / decoderScenarios.length * 100}%` }} />
                            </div>
                            <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
                                {currentScenario + 1} of {decoderScenarios.length}
                            </span>
                        </div>
                    )}

                    {/* Scenario Card */}
                    <div className="card card-gold">
                        <div style={{ marginBottom: 'var(--space-2)' }}>
                            <span className="badge badge-gold">Earnings Call Decoder</span>
                            <span className="badge badge-info" style={{ marginLeft: 'var(--space-2)' }}>
                                Scenario {currentScenario + 1} of {decoderScenarios.length}
                            </span>
                        </div>

                        {/* Quote */}
                        <div style={{
                            background: 'var(--color-bg-primary)', borderLeft: '3px solid var(--color-gold)',
                            padding: 'var(--space-5)', borderRadius: '0 var(--radius-md) var(--radius-md) 0',
                            marginBottom: 'var(--space-6)', marginTop: 'var(--space-4)'
                        }}>
                            <p style={{
                                fontSize: 'var(--font-size-md)', fontStyle: 'italic',
                                color: 'var(--color-text-primary)', lineHeight: 1.7
                            }}>
                                {scenario.quote}
                            </p>
                            <div style={{ marginTop: 'var(--space-3)', fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
                                — {scenario.speaker}, {scenario.source}
                            </div>
                        </div>

                        {/* Question */}
                        <p className="quiz-question-text">{scenario.question}</p>

                        {/* Options */}
                        <div>
                            {scenario.options.map((opt, i) => (
                                <div
                                    key={i}
                                    className={`quiz-option ${!submitted ? (selected === i ? 'selected' : '') :
                                        i === scenario.correctIndex ? 'correct' :
                                            i === selected ? 'incorrect' : ''
                                        }`}
                                    onClick={() => !submitted && setSelected(i)}
                                >
                                    <span className="quiz-option-marker">{markers[i]}</span>
                                    <span>{opt}</span>
                                </div>
                            ))}
                        </div>

                        {/* Submit / Feedback */}
                        {!submitted ? (
                            <button
                                className="btn btn-primary"
                                onClick={handleSubmit}
                                disabled={selected === null}
                                style={{ marginTop: 'var(--space-6)', opacity: selected === null ? 0.5 : 1 }}
                            >
                                Decode This Statement
                            </button>
                        ) : (
                            <div style={{ marginTop: 'var(--space-6)' }}>
                                <div className={`quiz-feedback ${isCorrect ? 'correct' : 'incorrect'}`}>
                                    <strong style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                        {isCorrect ? <><CheckCircle2 size={18} /> Correct!</> : <><XCircle size={18} /> Not quite.</>}
                                    </strong>
                                    <p style={{ marginTop: 'var(--space-2)', lineHeight: 1.6 }}>{scenario.explanation}</p>
                                    {scenario.citations && (
                                        <div style={{ marginTop: 'var(--space-3)' }}>
                                            <CitationList citationIds={scenario.citations} />
                                        </div>
                                    )}
                                </div>

                                <div style={{ display: 'flex', gap: 'var(--space-3)', marginTop: 'var(--space-4)' }}>
                                    {currentScenario < decoderScenarios.length - 1 ? (
                                        <button className="btn btn-primary" onClick={handleNext}>
                                            Next Scenario →
                                        </button>
                                    ) : (
                                        <div style={{ textAlign: 'center', width: '100%' }}>
                                            <div style={{ fontSize: 'var(--font-size-xl)', fontWeight: 800, color: 'var(--color-gold)', marginBottom: 'var(--space-2)' }}>
                                                Simulation Complete!
                                            </div>
                                            <div style={{ fontSize: 'var(--font-size-md)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-4)' }}>
                                                Final Score: {score.correct}/{score.total} ({Math.round(score.correct / score.total * 100)}%)
                                            </div>
                                            <button className="btn btn-secondary" onClick={handleRestart} style={{ display: 'flex', alignItems: 'center', margin: '0 auto', gap: 6 }}>
                                                <RotateCcw size={16} /> Try Again
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {activeTab === 'quizzes' && (
                <div className="animate-in animate-in-delay-2">
                    <div className="card" style={{ marginBottom: 'var(--space-6)' }}>
                        <h3 style={{ fontSize: 'var(--font-size-lg)', marginBottom: 'var(--space-4)' }}>
                            Checkpoint Quizzes
                        </h3>
                        <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-6)' }}>
                            Each lesson includes a checkpoint quiz. Complete lessons to unlock quiz tracking.
                        </p>

                        {Object.keys(progress.quizScores).length > 0 ? (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                                {Object.entries(progress.quizScores).map(([lessonId, sc]) => (
                                    <div key={lessonId} style={{
                                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                        padding: 'var(--space-3) var(--space-4)',
                                        background: 'var(--color-bg-tertiary)', borderRadius: 'var(--radius-md)'
                                    }}>
                                        <Link to={`/lesson/${lessonId}`} style={{ fontSize: 'var(--font-size-sm)', fontWeight: 500 }}>
                                            {lessonId.replace(/-/g, ' ')}
                                        </Link>
                                        <span className={`badge ${sc === 100 ? 'badge-success' : 'badge-warning'}`}>
                                            {sc === 100 ? '✓ Passed' : 'Review'}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div style={{ textAlign: 'center', padding: 'var(--space-8)', color: 'var(--color-text-muted)' }}>
                                <p style={{ marginBottom: 'var(--space-4)' }}>No quizzes completed yet.</p>
                                <Link to="/curriculum" className="btn btn-primary">Start Learning →</Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}
