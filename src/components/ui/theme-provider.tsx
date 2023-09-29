import { createContext, ReactNode, useContext, useEffect, useState } from 'react'

const MEDIA = '(prefers-color-scheme: dark)'

type Theme = 'dark' | 'light' | 'system'

type ResolvedTheme = Exclude<Theme, 'system'>

type ThemeProviderProps = {
  children: ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
  resolvedTheme?: ResolvedTheme
}

const initialState: ThemeProviderState = {
  theme: 'system',
  resolvedTheme: window.matchMedia(MEDIA).matches ? 'dark' : 'light',
  setTheme: () => null
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'vite-ui-theme',
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem(storageKey) as Theme) || defaultTheme)
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>()

  useEffect(() => {
    const root = window.document.documentElement

    root.classList.remove('light', 'dark')

    if (theme === 'system') {
      const systemTheme = window.matchMedia(MEDIA).matches ? 'dark' : 'light'

      root.classList.add(systemTheme)

      return
    }

    root.classList.add(theme)
  }, [theme])

  useEffect(() => {
    if (theme === 'system') {
      const systemTheme = window.matchMedia(MEDIA).matches ? 'dark' : 'light'

      setResolvedTheme(systemTheme)
    } else {
      setResolvedTheme(theme)
    }
  }, [theme])

  const value = {
    theme,
    resolvedTheme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme)
      setTheme(theme)
    }
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined) throw new Error('useTheme must be used within a ThemeProvider')

  return context
}
