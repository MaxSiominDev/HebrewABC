export type Theme = 'light' | 'dark'

export const THEME_STORAGE_KEY = 'theme'

type ThemeReader = Pick<Storage, 'getItem'>
type ThemeWriter = Pick<Storage, 'setItem'>

export function isTheme(value: unknown): value is Theme {
  return value === 'light' || value === 'dark'
}

export function browserStorage(): Storage | null {
  try {
    return localStorage
  } catch {
    return null
  }
}

export function readStoredTheme(storage: ThemeReader | null): Theme {
  if (!storage) return 'light'
  try {
    const stored = storage.getItem(THEME_STORAGE_KEY)
    return isTheme(stored) ? stored : 'light'
  } catch {
    return 'light'
  }
}

export function storeTheme(storage: ThemeWriter | null, theme: Theme) {
  if (!storage) return
  try {
    storage.setItem(THEME_STORAGE_KEY, theme)
  } catch {
    // The chosen theme still applies for the current session
  }
}

export function toggleTheme(theme: Theme): Theme {
  return theme === 'dark' ? 'light' : 'dark'
}
