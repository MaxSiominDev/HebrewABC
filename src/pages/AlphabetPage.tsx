import { LetterTile } from '../components/LetterTile'
import { CARDS } from '../data/cards'
import { cardsForFilter } from '../lib/deck'

const BASIC_LETTERS = cardsForFilter(CARDS, 'regular')
const FINAL_FORMS = cardsForFilter(CARDS, 'final')

export function AlphabetPage() {
  return (
    <main className="page-scroll">
      <section className="section">
        <h2 className="section-title">Letters</h2>
        <ul className="letter-grid">
          {BASIC_LETTERS.map((card) => (
            <LetterTile key={card.letter} card={card} />
          ))}
        </ul>
      </section>

      <section className="section">
        <h2 className="section-title">Final forms</h2>
        <ul className="letter-grid">
          {FINAL_FORMS.map((card) => (
            <LetterTile key={card.letter} card={card} />
          ))}
        </ul>
      </section>
    </main>
  )
}
