export type GestureAction = 'tap' | 'swipe-up' | 'swipe-down' | 'ignored'

export const TAP_MAX_PX = 12
export const SWIPE_MIN_PX = 48

export function classifyGesture(
  dx: number,
  dy: number,
  tapMax: number,
  swipeMin: number,
): GestureAction {
  const vertical = Math.abs(dy)
  if (vertical < swipeMin) {
    return vertical <= tapMax && Math.abs(dx) <= tapMax ? 'tap' : 'ignored'
  }
  if (Math.abs(dx) >= vertical) {
    return 'ignored'
  }
  return dy < 0 ? 'swipe-up' : 'swipe-down'
}

export const WHEEL_THRESHOLD_PX = 60
export const WHEEL_GESTURE_GAP_MS = 300

export type WheelStep = 1 | -1 | 0

// Accumulates wheel deltas until one gesture passes the threshold, then locks
// until the wheel goes quiet, so inertial scrolling cannot skip many cards
export function createWheelGate(now: () => number): (deltaY: number) => WheelStep {
  let lastEventAt = -Infinity
  let accumulated = 0
  let locked = false

  return (deltaY) => {
    if (now() - lastEventAt > WHEEL_GESTURE_GAP_MS) {
      accumulated = 0
      locked = false
    }
    lastEventAt = now()
    if (locked) return 0

    accumulated += deltaY
    if (Math.abs(accumulated) < WHEEL_THRESHOLD_PX) return 0

    const step: WheelStep = accumulated > 0 ? 1 : -1
    accumulated = 0
    locked = true
    return step
  }
}

// Line-mode wheels report lines instead of pixels; obsolete page-mode (2) is treated as pixels
export const PX_PER_WHEEL_LINE = 33

export function wheelPixelDelta(deltaMode: number, deltaY: number): number {
  return deltaMode === 1 ? deltaY * PX_PER_WHEEL_LINE : deltaY
}
