import { describe, expect, it } from 'vitest'
import { isTheme, readStoredTheme, storeTheme, THEME_STORAGE_KEY, toggleTheme } from './theme'

function memoryStorage(initial: Record<string, string> = {}) {
  const values = new Map(Object.entries(initial))
  return {
    getItem: (key: string) => values.get(key) ?? null,
    setItem: (key: string, value: string) => {
      values.set(key, value)
    },
  }
}

describe('isTheme', () => {
  it('accepts only the two known themes', () => {
    expect(isTheme('light')).toBe(true)
    expect(isTheme('dark')).toBe(true)
    expect(isTheme('darkk')).toBe(false)
    expect(isTheme('')).toBe(false)
    expect(isTheme(null)).toBe(false)
    expect(isTheme(undefined)).toBe(false)
  })
})

describe('readStoredTheme', () => {
  it('reads a stored theme', () => {
    expect(readStoredTheme(memoryStorage({ [THEME_STORAGE_KEY]: 'dark' }))).toBe('dark')
  })

  it('defaults to light when nothing is stored', () => {
    expect(readStoredTheme(memoryStorage())).toBe('light')
  })

  it('defaults to light when the stored value is unknown', () => {
    expect(readStoredTheme(memoryStorage({ [THEME_STORAGE_KEY]: 'sepia' }))).toBe('light')
  })

  it('defaults to light when storage is unavailable', () => {
    expect(readStoredTheme(null)).toBe('light')
  })

  it('defaults to light when storage throws', () => {
    const throwing = {
      getItem: () => {
        throw new Error('blocked')
      },
    }
    expect(readStoredTheme(throwing)).toBe('light')
  })
})

describe('storeTheme', () => {
  it('writes the theme under the storage key', () => {
    const storage = memoryStorage()
    storeTheme(storage, 'dark')
    expect(storage.getItem(THEME_STORAGE_KEY)).toBe('dark')
    storeTheme(storage, 'light')
    expect(storage.getItem(THEME_STORAGE_KEY)).toBe('light')
  })

  it('does not throw when storage is unavailable', () => {
    expect(() => storeTheme(null, 'dark')).not.toThrow()
  })

  it('does not throw when storage is blocked', () => {
    const throwing = {
      setItem: () => {
        throw new Error('blocked')
      },
    }
    expect(() => storeTheme(throwing, 'dark')).not.toThrow()
  })
})

describe('toggleTheme', () => {
  it('switches both ways', () => {
    expect(toggleTheme('light')).toBe('dark')
    expect(toggleTheme('dark')).toBe('light')
  })
})
