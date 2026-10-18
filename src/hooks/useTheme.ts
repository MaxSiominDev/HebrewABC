import { useCallback, useEffect, useState } from 'react'
import type { Theme } from '../lib/theme'
import { browserStorage, readStoredTheme, storeTheme, toggleTheme } from '../lib/theme'

const THEME_COLORS: Record<Theme, string> = {
  light: '#ffffff',
  dark: '#000000',
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => readStoredTheme(browserStorage()))

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLORS[theme])
    storeTheme(browserStorage(), theme)
  }, [theme])

  const toggle = useCallback(() => setTheme((current) => toggleTheme(current)), [])

  return { theme, toggle }
}
