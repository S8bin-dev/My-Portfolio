import { useState, useCallback } from 'react'
import { useScrollPosition } from '../../hooks/useScrollPosition'
import { ThemeToggle } from './ThemeToggle'
import { Container } from './Container'

const SECTIONS: { id: string; label: string }[] = [
  { id: 'hero', label: 'Overview' },
  { id: 'projects', label: 'Projects' },
  { id: 'publications', label: 'Publications' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
]

export function Header() {
  const { headerElevated } = useScrollPosition()
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = useCallback(() => setMenuOpen(false), [])

  return (
    <header className={['site-header', headerElevated && 'site-header--elevated'].filter(Boolean).join(' ')}>
      <Container>
        <div className="site-header-inner">
          <a href="#hero" className="brand">
            <span className="brand-mark" aria-hidden="true" />
            <span className="brand-text">
              <span className="brand-name">Sabin Baral</span>
              <span className="brand-tagline">
                Materials · Automation · 3D Printing
              </span>
            </span>
          </a>

          <nav className="primary-nav" aria-label="Primary navigation">
            {SECTIONS.map((section) => (
              <a key={section.id} href={`#${section.id}`}>
                {section.label}
              </a>
            ))}
          </nav>

          <div className="header-actions">
            <ThemeToggle />
            <button
              type="button"
              className="mobile-menu-btn"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              <span className={`hamburger ${menuOpen ? 'hamburger--open' : ''}`} aria-hidden="true" />
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav className="mobile-nav" aria-label="Mobile navigation">
            {SECTIONS.map((section) => (
              <a key={section.id} href={`#${section.id}`} onClick={closeMenu}>
                {section.label}
              </a>
            ))}
          </nav>
        )}
      </Container>
    </header>
  )
}

