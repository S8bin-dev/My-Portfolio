import { PropsWithChildren } from 'react'
import { Header } from './Header'
import { Footer } from './Footer'
import { useScrollPosition } from '../../hooks/useScrollPosition'
import { Button } from '../ui/Button'

export function Layout({ children }: PropsWithChildren) {
  const { showBackToTop, scrollToTop } = useScrollPosition()

  return (
    <div className="app-root">
      <Header />
      <main className="page">{children}</main>
      <Footer />

      {showBackToTop && (
        <div className="back-to-top-wrapper">
          <Button
            variant="subtle"
            size="sm"
            className="back-to-top"
            aria-label="Back to top"
            onClick={scrollToTop}
          >
            ↑
          </Button>
        </div>
      )}
    </div>
  )
}

