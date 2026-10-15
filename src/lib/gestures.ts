export type GestureAction =
  'tap' | 'swipe-up' | 'swipe-down' | 'swipe-left' | 'swipe-right' | 'ignored'

export const TAP_MAX_PX = 12
export const SWIPE_MIN_PX = 48

export function classifyGesture(
  dx: number,
  dy: number,
  tapMax: number,
  swipeMin: number,
): GestureAction {
  const horizontal = Math.abs(dx)
  const vertical = Math.abs(dy)

  if (horizontal <= tapMax && vertical <= tapMax) {
    return 'tap'
  }

  if (vertical >= swipeMin && vertical > horizontal) {
    return dy < 0 ? 'swipe-up' : 'swipe-down'
  }
  if (horizontal >= swipeMin && horizontal > vertical) {
    return dx < 0 ? 'swipe-left' : 'swipe-right'
  }
  return 'ignored'
}

export const WHEEL_THRESHOLD_PX = 60
export const WHEEL_GESTURE_GAP_MS = 300

export type WheelAction = 'next' | 'prev' | 'flip'

// Accumulates wheel deltas until one axis passes the threshold, then locks
// until the wheel goes quiet, so inertial scrolling cannot skip many cards
export function createWheelGate(now: () => number): (dx: number, dy: number) => WheelAction | null {
  let lastEventAt = -Infinity
  let accumulatedX = 0
  let accumulatedY = 0
  let locked = false

  return (dx, dy) => {
    if (now() - lastEventAt > WHEEL_GESTURE_GAP_MS) {
      accumulatedX = 0
      accumulatedY = 0
      locked = false
    }
    lastEventAt = now()
    if (locked) return null

    accumulatedX += dx
    accumulatedY += dy

    const horizontal = Math.abs(accumulatedX)
    const vertical = Math.abs(accumulatedY)
    if (horizontal < WHEEL_THRESHOLD_PX && vertical < WHEEL_THRESHOLD_PX) return null

    const verticalStep = accumulatedY > 0 ? 'next' : 'prev'
    accumulatedX = 0
    accumulatedY = 0
    locked = true

    // A trackpad gesture carries both axes at once, so one gesture stays one action
    return horizontal > vertical ? 'flip' : verticalStep
  }
}

// Line-mode wheels report lines instead of pixels; obsolete page-mode (2) is treated as pixels
export const PX_PER_WHEEL_LINE = 33

export function wheelPixelDelta(deltaMode: number, delta: number): number {
  return deltaMode === 1 ? delta * PX_PER_WHEEL_LINE : delta
}
