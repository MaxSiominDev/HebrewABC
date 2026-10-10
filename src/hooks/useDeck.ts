import { useCallback, useReducer } from 'react'
import { CARDS } from '../data/cards'
import { deckReducer, initialDeckState, shuffled } from '../lib/deck'

export function useDeck() {
  const [state, dispatch] = useReducer(deckReducer, CARDS, initialDeckState)

  const next = useCallback(() => dispatch({ type: 'next' }), [])
  const prev = useCallback(() => dispatch({ type: 'prev' }), [])
  const flip = useCallback(() => dispatch({ type: 'flip' }), [])
  const shuffle = useCallback(() => dispatch({ type: 'set-order', order: shuffled(CARDS) }), [])
  const restoreAlphabet = useCallback(() => dispatch({ type: 'set-order', order: CARDS }), [])

  return {
    ...state,
    card: state.order[state.position],
    count: state.order.length,
    next,
    prev,
    flip,
    shuffle,
    restoreAlphabet,
  }
}
