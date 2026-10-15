import type { KeyboardEvent as ReactKeyboardEvent } from 'react'
import type { Card } from '../data/cards'
import type { MoveDirection } from '../lib/deck'

const LONG_SOUND_MAX_CHARS = 6

interface FlashCardProps {
  card: Card
  flipped: boolean
  direction: MoveDirection
  revision: number
  onFlip: () => void
  onNext: () => void
  onPrev: () => void
}

export function FlashCard({
  card,
  flipped,
  direction,
  revision,
  onFlip,
  onNext,
  onPrev,
}: FlashCardProps) {
  const handleKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault()
      onFlip()
    } else if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
      event.preventDefault()
      onNext()
    } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
      event.preventDefault()
      onPrev()
    }
  }

  const slideClass =
    direction === 'next' ? 'card-slide-next' : direction === 'prev' ? 'card-slide-prev' : ''

  return (
    <div
      className="card"
      role="button"
      tabIndex={0}
      aria-label={
        flipped
          ? `${card.name}, flip back to the letter`
          : `Hebrew letter ${card.letter}, flip to the answer`
      }
      onClick={onFlip}
      onKeyDown={handleKeyDown}
    >
      {/* Remounting on revision discards a mid-flight flip, so a transition always starts from the front */}
      <div
        key={revision}
        className={`card-inner${flipped ? ' is-flipped' : ''} ${slideClass}`.trim()}
      >
        <div className="card-face card-face-front">{card.letter}</div>
        <div className="card-face card-face-back">
          <p className="card-name">{card.name}</p>
          <p
            className={`card-sound${card.sound.length > LONG_SOUND_MAX_CHARS ? ' card-sound-long' : ''}`}
          >
            {card.sound}
            {card.soundNote && <span className="card-sound-note">{card.soundNote}</span>}
          </p>
        </div>
      </div>
    </div>
  )
}
