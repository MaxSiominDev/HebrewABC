import { describe, expect, it } from 'vitest'
import { classifyGesture, createWheelGate, wheelPixelDelta } from './gestures'

describe('classifyGesture', () => {
  it('treats a still press and a small drift as tap', () => {
    expect(classifyGesture(0, 0, 12, 48)).toBe('tap')
    expect(classifyGesture(3, -6, 12, 48)).toBe('tap')
  })

  it('treats a small diagonal drag as neither tap nor swipe', () => {
    expect(classifyGesture(30, 10, 12, 48)).toBe('ignored')
  })

  it('keeps the dead zone between tap and swipe silent', () => {
    expect(classifyGesture(0, -30, 12, 48)).toBe('ignored')
  })

  it('maps swipe up to next and swipe down to prev', () => {
    expect(classifyGesture(0, -60, 12, 48)).toBe('swipe-up')
    expect(classifyGesture(5, -120, 12, 48)).toBe('swipe-up')
    expect(classifyGesture(0, 60, 12, 48)).toBe('swipe-down')
  })

  it('ignores horizontal and diagonal swipes', () => {
    expect(classifyGesture(80, 0, 12, 48)).toBe('ignored')
    expect(classifyGesture(90, -60, 12, 48)).toBe('ignored')
  })
})

describe('createWheelGate', () => {
  it('accumulates small deltas until the threshold, then steps once', () => {
    const now = 0
    const gate = createWheelGate(() => now)
    expect(gate(20)).toBe(0)
    expect(gate(20)).toBe(0)
    expect(gate(25)).toBe(1)
  })

  it('locks after a step until the wheel goes quiet', () => {
    let now = 0
    const gate = createWheelGate(() => now)
    expect(gate(100)).toBe(1)
    expect(gate(100)).toBe(0)
    now = 200
    expect(gate(-100)).toBe(0)
    now = 600
    expect(gate(-100)).toBe(-1)
  })

  it('forgets unfinished accumulation between distant gestures', () => {
    let now = 0
    const gate = createWheelGate(() => now)
    expect(gate(40)).toBe(0)
    now = 1000
    expect(gate(40)).toBe(0)
  })
})

describe('wheelPixelDelta', () => {
  it('passes pixel-mode deltas through and scales line-mode ones', () => {
    expect(wheelPixelDelta(0, 120)).toBe(120)
    expect(wheelPixelDelta(1, 3)).toBe(99)
  })
})
