import { useCallback, useReducer } from 'react'
import { CARDS } from '../data/cards'
import type { DeckFilter } from '../lib/deck'
import { cardsForFilter, deckReducer, initialDeckState, shuffled } from '../lib/deck'

export function useDeck() {
  const [state, dispatch] = useReducer(deckReducer, CARDS, initialDeckState)

  const next = useCallback(() => dispatch({ type: 'next' }), [])
  const prev = useCallback(() => dispatch({ type: 'prev' }), [])
  const flip = useCallback(() => dispatch({ type: 'flip' }), [])
  const shuffle = useCallback(
    () => dispatch({ type: 'set-order', order: shuffled(cardsForFilter(CARDS, state.filter)) }),
    [state.filter],
  )
  const restoreAlphabet = useCallback(
    () => dispatch({ type: 'set-order', order: cardsForFilter(CARDS, state.filter) }),
    [state.filter],
  )
  const setFilter = useCallback(
    (filter: DeckFilter) =>
      dispatch({ type: 'set-filter', filter, order: cardsForFilter(CARDS, filter) }),
    [],
  )

  return {
    ...state,
    card: state.order[state.position],
    count: state.order.length,
    next,
    prev,
    flip,
    shuffle,
    restoreAlphabet,
    setFilter,
  }
}

export type Deck = ReturnType<typeof useDeck>
