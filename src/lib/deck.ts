import type { Card } from '../data/cards'

export type MoveDirection = 'next' | 'prev' | 'reset'

export interface DeckState {
  readonly order: readonly Card[]
  readonly position: number
  readonly flipped: boolean
  readonly direction: MoveDirection
  readonly revision: number
}

export type DeckAction =
  | { type: 'flip' }
  | { type: 'next' }
  | { type: 'prev' }
  | { type: 'set-order'; order: readonly Card[] }

export function initialDeckState(order: readonly Card[]): DeckState {
  return { order, position: 0, flipped: false, direction: 'reset', revision: 0 }
}

export function deckReducer(state: DeckState, action: DeckAction): DeckState {
  switch (action.type) {
    case 'flip':
      return { ...state, flipped: !state.flipped }
    case 'next':
    case 'prev': {
      const delta = action.type === 'next' ? 1 : -1
      return {
        ...state,
        position: stepPosition(state.position, state.order.length, delta),
        direction: action.type,
        flipped: false,
        revision: state.revision + 1,
      }
    }
    case 'set-order':
      return {
        ...state,
        order: action.order,
        position: 0,
        direction: 'reset',
        flipped: false,
        revision: state.revision + 1,
      }
  }
}

// Fisher-Yates over a copy, so the source order stays intact
export function shuffled(cards: readonly Card[]): Card[] {
  const deck = [...cards]
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[deck[i], deck[j]] = [deck[j], deck[i]]
  }
  return deck
}

export function stepPosition(position: number, count: number, delta: 1 | -1): number {
  return (((position + delta) % count) + count) % count
}
