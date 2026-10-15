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
    expect(classifyGesture(-30, 0, 12, 48)).toBe('ignored')
  })

  it('maps swipe up to next and swipe down to prev', () => {
    expect(classifyGesture(0, -60, 12, 48)).toBe('swipe-up')
    expect(classifyGesture(5, -120, 12, 48)).toBe('swipe-up')
    expect(classifyGesture(0, 60, 12, 48)).toBe('swipe-down')
  })

  it('maps swipe left and swipe right to flip', () => {
    expect(classifyGesture(-80, 0, 12, 48)).toBe('swipe-left')
    expect(classifyGesture(80, 0, 12, 48)).toBe('swipe-right')
    expect(classifyGesture(120, -10, 12, 48)).toBe('swipe-right')
  })

  it('gives a diagonal swipe to the dominant axis', () => {
    expect(classifyGesture(90, -60, 12, 48)).toBe('swipe-right')
    expect(classifyGesture(-60, 90, 12, 48)).toBe('swipe-down')
  })

  it('ignores a diagonal with no dominant axis', () => {
    expect(classifyGesture(60, 60, 12, 48)).toBe('ignored')
    expect(classifyGesture(-60, 60, 12, 48)).toBe('ignored')
  })
})

describe('createWheelGate', () => {
  it('accumulates small deltas until the threshold, then steps once', () => {
    const gate = createWheelGate(() => 0)
    expect(gate(0, 20)).toBeNull()
    expect(gate(0, 20)).toBeNull()
    expect(gate(0, 25)).toBe('next')
  })

  it('locks after a step until the wheel goes quiet', () => {
    let now = 0
    const gate = createWheelGate(() => now)
    expect(gate(0, 100)).toBe('next')
    expect(gate(0, 100)).toBeNull()
    now = 200
    expect(gate(0, -100)).toBeNull()
    now = 600
    expect(gate(0, -100)).toBe('prev')
  })

  it('forgets unfinished accumulation between distant gestures', () => {
    let now = 0
    const gate = createWheelGate(() => now)
    expect(gate(0, 40)).toBeNull()
    now = 1000
    expect(gate(0, 40)).toBeNull()
  })

  it('flips on a horizontal gesture', () => {
    expect(createWheelGate(() => 0)(70, 0)).toBe('flip')
    expect(createWheelGate(() => 0)(-70, 0)).toBe('flip')
  })

  it('gives a gesture carrying both axes to the dominant one', () => {
    expect(createWheelGate(() => 0)(80, 30)).toBe('flip')
    expect(createWheelGate(() => 0)(30, 80)).toBe('next')
    expect(createWheelGate(() => 0)(30, -80)).toBe('prev')
  })
})

describe('wheelPixelDelta', () => {
  it('passes pixel-mode deltas through and scales line-mode ones', () => {
    expect(wheelPixelDelta(0, 120)).toBe(120)
    expect(wheelPixelDelta(1, 3)).toBe(99)
  })
})
