import { useEffect, useRef } from 'react'
import type { PointerEvent as ReactPointerEvent, KeyboardEvent as ReactKeyboardEvent } from 'react'
import type { Card } from '../data/cards'
import type { MoveDirection } from '../lib/deck'
import {
  SWIPE_MIN_PX,
  TAP_MAX_PX,
  classifyGesture,
  createWheelGate,
  wheelPixelDelta,
} from '../lib/gestures'

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
  const cardRef = useRef<HTMLDivElement>(null)
  const pointerStartRef = useRef<{ id: number; x: number; y: number } | null>(null)

  useEffect(() => {
    const element = cardRef.current
    if (!element) return

    const gate = createWheelGate(() => performance.now())
    const handleWheel = (event: WheelEvent) => {
      const step = gate(wheelPixelDelta(event.deltaMode, event.deltaY))
      if (step === 1) onNext()
      if (step === -1) onPrev()
    }

    element.addEventListener('wheel', handleWheel, { passive: true })
    return () => element.removeEventListener('wheel', handleWheel)
  }, [onNext, onPrev])

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!event.isPrimary || event.button !== 0) return
    event.currentTarget.setPointerCapture(event.pointerId)
    pointerStartRef.current = { id: event.pointerId, x: event.clientX, y: event.clientY }
  }

  const handlePointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    const start = pointerStartRef.current
    pointerStartRef.current = null
    if (!start || event.pointerId !== start.id) return

    const action = classifyGesture(
      event.clientX - start.x,
      event.clientY - start.y,
      TAP_MAX_PX,
      SWIPE_MIN_PX,
    )
    if (action === 'tap') onFlip()
    else if (action === 'swipe-up') onNext()
    else if (action === 'swipe-down') onPrev()
  }

  const handlePointerCancel = () => {
    pointerStartRef.current = null
  }

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
      ref={cardRef}
      className="card"
      role="button"
      tabIndex={0}
      aria-label={
        flipped
          ? `${card.name}, flip back to the letter`
          : `Hebrew letter ${card.letter}, flip to the answer`
      }
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}
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
