import { describe, expect, it } from 'vitest'
import { CARDS } from '../data/cards'
import type { Card } from '../data/cards'
import { cardsForFilter, deckReducer, initialDeckState, shuffled, stepPosition } from './deck'

const byName = (a: Card, b: Card) => a.name.localeCompare(b.name)

describe('CARDS', () => {
  it('has 27 cards: 22 basic letters then 5 final forms', () => {
    expect(CARDS).toHaveLength(27)
    const finals = CARDS.filter((card) => card.final)
    expect(finals).toHaveLength(5)
    finals.forEach((card, i) => {
      expect(CARDS[22 + i]).toBe(card)
    })
  })

  it('starts with ALEPH and has unique letters and filled fields', () => {
    expect(CARDS[0].name).toBe('ALEPH')
    expect(new Set(CARDS.map((card) => card.letter)).size).toBe(27)
    for (const card of CARDS) {
      expect(card.letter).toBeTruthy()
      expect(card.name).toBeTruthy()
      expect(card.sound).toBeTruthy()
      expect(card.russian).toBeTruthy()
    }
  })
})

describe('shuffled', () => {
  it('keeps every card exactly once', () => {
    for (let i = 0; i < 20; i++) {
      const deck = shuffled(CARDS)
      expect(deck).toHaveLength(CARDS.length)
      expect([...deck].sort(byName)).toEqual([...CARDS].sort(byName))
    }
  })

  it('does not mutate the source order', () => {
    const snapshot = [...CARDS]
    shuffled(CARDS)
    expect(CARDS).toEqual(snapshot)
  })

  it('shuffles a filtered subset without losing or mixing in cards', () => {
    const finals = cardsForFilter(CARDS, 'final')
    for (let i = 0; i < 20; i++) {
      const deck = shuffled(finals)
      expect(deck).toHaveLength(5)
      expect([...deck].sort(byName)).toEqual([...finals].sort(byName))
    }
  })
})

describe('cardsForFilter', () => {
  it('hands back the deck itself for the all filter', () => {
    expect(cardsForFilter(CARDS, 'all')).toBe(CARDS)
  })

  it('splits the deck into 22 basic letters and 5 final forms', () => {
    const regular = cardsForFilter(CARDS, 'regular')
    const finals = cardsForFilter(CARDS, 'final')
    expect(regular).toHaveLength(22)
    expect(finals).toHaveLength(5)
    expect(regular.some((card) => card.final)).toBe(false)
    expect(finals.every((card) => card.final)).toBe(true)
    expect([...regular, ...finals]).toEqual([...CARDS])
  })
})

describe('stepPosition', () => {
  it('steps normally inside the deck', () => {
    expect(stepPosition(4, 27, 1)).toBe(5)
    expect(stepPosition(4, 27, -1)).toBe(3)
  })

  it('wraps forward from the last card to the first', () => {
    expect(stepPosition(26, 27, 1)).toBe(0)
  })

  it('wraps backward from the first card to the last', () => {
    expect(stepPosition(0, 27, -1)).toBe(26)
  })
})

describe('deckReducer', () => {
  it('flips back and forth without changing position', () => {
    const flipped = deckReducer(initialDeckState(CARDS), { type: 'flip' })
    expect(flipped.flipped).toBe(true)
    expect(flipped.position).toBe(0)
    const back = deckReducer(flipped, { type: 'flip' })
    expect(back.flipped).toBe(false)
    expect(back.position).toBe(0)
  })

  it('shows the front side after next and prev, even from the back', () => {
    const flipped = deckReducer(initialDeckState(CARDS), { type: 'flip' })
    const next = deckReducer(flipped, { type: 'next' })
    expect(next.flipped).toBe(false)
    expect(next.position).toBe(1)
    const prev = deckReducer(flipped, { type: 'prev' })
    expect(prev.flipped).toBe(false)
    expect(prev.position).toBe(26)
  })

  it('set-order lands on the first card, front side, for shuffle and restore alike', () => {
    const flipped = deckReducer(initialDeckState(CARDS), { type: 'flip' })
    const deckShuffled = deckReducer(flipped, { type: 'set-order', order: shuffled(CARDS) })
    expect(deckShuffled.flipped).toBe(false)
    expect(deckShuffled.position).toBe(0)
    expect(deckShuffled.order).toHaveLength(CARDS.length)
    const restored = deckReducer(deckShuffled, { type: 'set-order', order: CARDS })
    expect(restored.order).toBe(CARDS)
    expect(restored.flipped).toBe(false)
    expect(restored.position).toBe(0)
  })

  it('set-filter swaps in the subset and lands on the first card, front side', () => {
    const flipped = deckReducer(initialDeckState(CARDS), { type: 'flip' })
    const filtered = deckReducer(flipped, {
      type: 'set-filter',
      filter: 'final',
      order: cardsForFilter(CARDS, 'final'),
    })
    expect(filtered.filter).toBe('final')
    expect(filtered.order).toHaveLength(5)
    expect(filtered.order.every((card) => card.final)).toBe(true)
    expect(filtered.flipped).toBe(false)
    expect(filtered.position).toBe(0)
    expect(filtered.revision).toBe(1)
  })

  it('set-order keeps the active filter', () => {
    const filtered = deckReducer(initialDeckState(CARDS), {
      type: 'set-filter',
      filter: 'final',
      order: cardsForFilter(CARDS, 'final'),
    })
    const deckShuffled = deckReducer(filtered, {
      type: 'set-order',
      order: shuffled(filtered.order),
    })
    expect(deckShuffled.filter).toBe('final')
  })

  it('bumps revision on view-changing transitions but not on flip', () => {
    const initial = initialDeckState(CARDS)
    const flipped = deckReducer(initial, { type: 'flip' })
    expect(flipped.revision).toBe(initial.revision)
    const next = deckReducer(flipped, { type: 'next' })
    expect(next.revision).toBe(initial.revision + 1)
    const restored = deckReducer(next, { type: 'set-order', order: CARDS })
    expect(restored.revision).toBe(initial.revision + 2)
  })

  it('starts on the all filter', () => {
    expect(initialDeckState(CARDS).filter).toBe('all')
  })
})
