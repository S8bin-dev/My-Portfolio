import { useEffect, useState } from 'react'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

export function useScrollPosition() {
  const prefersReducedMotion = usePrefersReducedMotion()
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (prefersReducedMotion) {
        setScrollY(window.scrollY)
        return
      }

      window.requestAnimationFrame(() => {
        setScrollY(window.scrollY)
      })
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [prefersReducedMotion])

  const showBackToTop = scrollY > 320
  const headerElevated = scrollY > 8

  const scrollToTop = () => {
    if (prefersReducedMotion) {
      window.scrollTo(0, 0)
      return
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return { scrollY, showBackToTop, headerElevated, scrollToTop }
}

