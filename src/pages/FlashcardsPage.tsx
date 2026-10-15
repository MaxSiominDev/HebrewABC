import { FlashCard } from '../components/FlashCard'
import type { Deck } from '../hooks/useDeck'
import type { DeckFilter } from '../lib/deck'

const FILTER_OPTIONS: readonly { value: DeckFilter; label: string }[] = [
  { value: 'all', label: 'All letters' },
  { value: 'regular', label: 'Without final' },
  { value: 'final', label: 'Final only' },
]

function isDeckFilter(value: string): value is DeckFilter {
  return FILTER_OPTIONS.some((option) => option.value === value)
}

export function FlashcardsPage({ deck }: { deck: Deck }) {
  return (
    <>
      <main className="card-area">
        <FlashCard
          card={deck.card}
          flipped={deck.flipped}
          direction={deck.direction}
          revision={deck.revision}
          onFlip={deck.flip}
          onNext={deck.next}
          onPrev={deck.prev}
        />
      </main>

      <div className="hints">
        <p>Tap to flip</p>
        <p>Swipe up / down</p>
      </div>

      <nav className="nav">
        <button type="button" className="button" onClick={deck.prev}>
          Back
        </button>
        <span className="counter">
          {deck.position + 1} / {deck.count}
        </span>
        <button type="button" className="button" onClick={deck.next}>
          Next
        </button>
      </nav>

      <div className="deck-controls">
        <label className="filter">
          <span>Filter</span>
          <select
            className="filter-select"
            value={deck.filter}
            onChange={(event) => {
              if (isDeckFilter(event.target.value)) deck.setFilter(event.target.value)
            }}
          >
            {FILTER_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <div className="deck-buttons">
          <button type="button" className="button" onClick={deck.shuffle}>
            Shuffle
          </button>
          <button type="button" className="button" onClick={deck.restoreAlphabet}>
            Alphabetical
          </button>
        </div>
      </div>
    </>
  )
}
