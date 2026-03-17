import { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { useProgress } from '../App'
import { getAllLessons } from '../data/curriculum'
import SearchOverlay from './SearchOverlay'
import { Rocket, BookOpen, Building2, TrendingUp, Compass, Swords, Library, Brain, CheckSquare, UserCircle, Search, Menu, X, MessageCircle } from 'lucide-react'

const navItems = [
    { path: '/', icon: Rocket, label: 'Start Here' },
    { path: '/curriculum', icon: BookOpen, label: 'Curriculum' },
    { path: '/segments', icon: Building2, label: 'Segments' },
    { path: '/financial', icon: TrendingUp, label: 'Financial Performance' },
    { path: '/strategy', icon: Compass, label: 'Strategy & Narratives' },
    { path: '/competition', icon: Swords, label: 'Competition & Market' },
    { path: '/library', icon: Library, label: 'Library (Sources)' },
    { path: '/knowledge', icon: Brain, label: 'Knowledge Base' },
    { path: '/chat', icon: MessageCircle, label: 'Ask Apollo AI' },
    { path: '/assessments', icon: CheckSquare, label: 'Assessments' },
    { path: '/profile', icon: UserCircle, label: 'Profile & Progress' },
]

export default function Layout() {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [searchOpen, setSearchOpen] = useState(false)
    const { progress } = useProgress()

    const allLessons = getAllLessons()
    const completionPct = allLessons.length > 0
        ? Math.round((progress.completedLessons.length / allLessons.length) * 100)
        : 0

    return (
        <div className="app-layout">
            {/* Mobile Menu Toggle */}
            <button
                className="mobile-menu-toggle"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                aria-label="Toggle menu"
            >
                {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {/* Mobile Overlay */}
            <div
                className={`mobile-overlay ${sidebarOpen ? 'visible' : ''}`}
                onClick={() => setSidebarOpen(false)}
            />

            {/* Sidebar */}
            <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
                <div className="sidebar-brand">
                    <h1>Apollo Academy</h1>
                    <span>Interactive Learning Platform</span>
                </div>

                <nav className="sidebar-nav">
                    {/* Search Button */}
                    <button
                        className="nav-item"
                        onClick={() => { setSearchOpen(true); setSidebarOpen(false) }}
                        style={{ width: '100%', textAlign: 'left' }}
                    >
                        <span className="nav-icon"><Search size={18} /></span>
                        <span>Search</span>
                    </button>

                    {navItems.map(item => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            end={item.path === '/'}
                            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                            onClick={() => setSidebarOpen(false)}
                        >
                            <span className="nav-icon"><item.icon size={18} /></span>
                            <span>{item.label}</span>
                        </NavLink>
                    ))}
                </nav>

                <div className="sidebar-footer">
                    <div className="sidebar-progress">
                        <div className="sidebar-progress-label">
                            <span>Overall Progress</span>
                            <span>{completionPct}%</span>
                        </div>
                        <div className="progress-bar">
                            <div className="progress-bar-fill" style={{ width: `${completionPct}%` }} />
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="main-content">
                <Outlet />
            </main>

            {/* Search Overlay */}
            {searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} />}
        </div>
    )
}
