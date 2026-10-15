import { NavLink, Navigate, Route, Routes } from 'react-router'
import { useDeck } from './hooks/useDeck'
import { AlphabetPage } from './pages/AlphabetPage'
import { FlashcardsPage } from './pages/FlashcardsPage'
import './App.css'

export default function App() {
  const deck = useDeck()

  return (
    <div className="app">
      <header className="header">
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
