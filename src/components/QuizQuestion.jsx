import { useState } from 'react'

export default function QuizQuestion({ question, options, correctIndex, explanation, onComplete }) {
    const [selected, setSelected] = useState(null)
    const [submitted, setSubmitted] = useState(false)

    const isCorrect = selected === correctIndex

    function handleSubmit() {
        if (selected === null) return
        setSubmitted(true)
        if (onComplete) onComplete(isCorrect)
    }

    function getOptionClass(i) {
        if (!submitted) return selected === i ? 'selected' : ''
        if (i === correctIndex) return 'correct'
        if (i === selected && !isCorrect) return 'incorrect'
        return ''
    }

    const markers = ['A', 'B', 'C', 'D', 'E']

    return (
        <div className="quiz-container">
            <div style={{ marginBottom: 'var(--space-2)' }}>
                <span className="badge badge-gold">Checkpoint Quiz</span>
            </div>
            <p className="quiz-question-text">{question}</p>

            <div>
                {options.map((opt, i) => (
                    <div
                        key={i}
                        className={`quiz-option ${getOptionClass(i)}`}
                        onClick={() => !submitted && setSelected(i)}
                    >
                        <span className="quiz-option-marker">{markers[i]}</span>
                        <span>{opt}</span>
                    </div>
                ))}
            </div>

            {!submitted ? (
                <button
                    className="btn btn-primary"
                    onClick={handleSubmit}
                    disabled={selected === null}
                    style={{ marginTop: 'var(--space-6)', opacity: selected === null ? 0.5 : 1 }}
                >
                    Check Answer
                </button>
            ) : (
                <div className={`quiz-feedback ${isCorrect ? 'correct' : 'incorrect'}`}>
                    <strong>{isCorrect ? '✅ Correct!' : '❌ Not quite.'}</strong>
                    <p style={{ marginTop: 'var(--space-2)', lineHeight: 1.6 }}>{explanation}</p>
                </div>
            )}
        </div>
    )
}
