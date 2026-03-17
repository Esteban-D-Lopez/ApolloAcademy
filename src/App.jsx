import { useState, createContext, useContext, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Layout from './components/Layout'
import StartHere from './pages/StartHere'
import Curriculum from './pages/Curriculum'
import LessonView from './pages/LessonView'
import Segments from './pages/Segments'
import SegmentDetail from './pages/SegmentDetail'
import FinancialPerformance from './pages/FinancialPerformance'
import StrategyNarratives from './pages/StrategyNarratives'
import Competition from './pages/Competition'
import Library from './pages/Library'
import Assessments from './pages/Assessments'
import KnowledgeBase from './pages/KnowledgeBase'
import Profile from './pages/Profile'
import Chat from './pages/Chat'

function ScrollToTop() {
    const { pathname } = useLocation()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [pathname])

    return null
}

// Progress Context
const ProgressContext = createContext()

export function useProgress() {
    return useContext(ProgressContext)
}

function getStoredProgress() {
    try {
        const stored = localStorage.getItem('apollo-academy-progress')
        return stored ? JSON.parse(stored) : { completedLessons: [], quizScores: {}, badges: [] }
    } catch {
        return { completedLessons: [], quizScores: {}, badges: [] }
    }
}

function App() {
    const [progress, setProgress] = useState(getStoredProgress)

    const updateProgress = (update) => {
        setProgress(prev => {
            const next = { ...prev, ...update }
            try {
                localStorage.setItem('apollo-academy-progress', JSON.stringify(next))
            } catch {
                // Storage quota exceeded or unavailable — state still updates in memory
            }
            return next
        })
    }

    const completeLesson = (lessonId) => {
        if (!progress.completedLessons.includes(lessonId)) {
            updateProgress({ completedLessons: [...progress.completedLessons, lessonId] })
        }
    }

    const saveQuizScore = (lessonId, score) => {
        updateProgress({ quizScores: { ...progress.quizScores, [lessonId]: score } })
    }

    const earnBadge = (badgeId) => {
        if (!progress.badges.includes(badgeId)) {
            updateProgress({ badges: [...progress.badges, badgeId] })
        }
    }

    return (
        <ProgressContext.Provider value={{ progress, completeLesson, saveQuizScore, earnBadge }}>
            <ScrollToTop />
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<StartHere />} />
                    <Route path="/curriculum" element={<Curriculum />} />
                    <Route path="/lesson/:lessonId" element={<LessonView />} />
                    <Route path="/segments" element={<Segments />} />
                    <Route path="/segments/:segmentId" element={<SegmentDetail />} />
                    <Route path="/financial" element={<FinancialPerformance />} />
                    <Route path="/strategy" element={<StrategyNarratives />} />
                    <Route path="/competition" element={<Competition />} />
                    <Route path="/library" element={<Library />} />
                    <Route path="/assessments" element={<Assessments />} />
                    <Route path="/knowledge" element={<KnowledgeBase />} />
                    <Route path="/chat" element={<Chat />} />
                    <Route path="/profile" element={<Profile />} />
                </Route>
            </Routes>
        </ProgressContext.Provider>
    )
}

export default App
