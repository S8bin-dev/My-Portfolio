import { useTheme } from '../../theme/ThemeProvider'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label="Toggle dark mode"
      aria-pressed={isDark}
    >
      <span className="theme-toggle-icon theme-toggle-icon--sun" aria-hidden={!isDark ? 'true' : undefined}>
        ☼
      </span>
      <span className="theme-toggle-icon theme-toggle-icon--moon" aria-hidden={isDark ? 'true' : undefined}>
        ☾
      </span>
    </button>
  )
}

