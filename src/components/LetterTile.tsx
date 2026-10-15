import type { Card } from '../data/cards'

export function LetterTile({ card }: { card: Card }) {
  return (
    <li className="tile">
      <span className="tile-letter">{card.letter}</span>
      <span className="tile-name">{card.name}</span>
      <span className="tile-sound">
        {card.sound}
        {card.soundNote && <span className="tile-note">{card.soundNote}</span>}
      </span>
      <span className="tile-russian">{card.russian}</span>
    </li>
  )
}
