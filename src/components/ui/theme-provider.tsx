import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from 'react'

const MEDIA = '(prefers-color-scheme: dark)'

type Theme = 'dark' | 'light' | 'system'

type ThemeProviderProps = {
  children: ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const initialState: ThemeProviderState = {
  theme: 'system',
  setTheme: () => null
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'vite-ui-theme',
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  )

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

  const value = {
    theme,
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

  if (context === undefined)
    throw new Error('useTheme must be used within a ThemeProvider')

  return context
}

export const useResolvedTheme = () => {
  const [resolvedTheme, setResolvedTheme] = useState<Exclude<Theme, 'system'>>()

  const handleMediaQuery = (e: MediaQueryList | MediaQueryListEvent) =>
    setResolvedTheme(e.matches ? 'dark' : 'light')

  useEffect(() => {
    const media = window.matchMedia(MEDIA)

    handleMediaQuery(media)

    media.addEventListener('change', handleMediaQuery)

    return () => media.removeEventListener('change', handleMediaQuery)
  }, [])

  return resolvedTheme
}
