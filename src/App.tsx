import { NavLink, Navigate, Route, Routes } from 'react-router'
import { useDeck } from './hooks/useDeck'
import { useTheme } from './hooks/useTheme'
import { AlphabetPage } from './pages/AlphabetPage'
import { FlashcardsPage } from './pages/FlashcardsPage'
import './App.css'

export default function App() {
  const deck = useDeck()
  const { theme, toggle } = useTheme()
  const isDark = theme === 'dark'

  return (
    <div className="app">
      <header className="header">
        <button
          type="button"
          className="theme-toggle"
          onClick={toggle}
          aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
        >
          {isDark ? 'Light' : 'Dark'}
        </button>
        <h1 className="header-title">Hebrew</h1>
        <p className="header-subtitle">Alphabet</p>
      </header>

      <nav className="tabs">
        <NavLink className="tab" to="/">
          Cards
        </NavLink>
        <NavLink className="tab" to="/alphabet">
          Alphabet
        </NavLink>
      </nav>

      <Routes>
        <Route index element={<FlashcardsPage deck={deck} />} />
        <Route path="alphabet" element={<AlphabetPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}
