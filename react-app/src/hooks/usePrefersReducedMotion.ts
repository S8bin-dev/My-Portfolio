import { useState, useEffect } from 'react'

const QUERY = '(prefers-reduced-motion: reduce)'

function getInitialValue(): boolean {
  if (typeof window === 'undefined') return false
  return Boolean(window.matchMedia?.(QUERY)?.matches)
}

export function usePrefersReducedMotion(): boolean {
  const [matches, setMatches] = useState(getInitialValue)

  useEffect(() => {
    const mq = window.matchMedia?.(QUERY)
    if (!mq) return

    const handler = (e: MediaQueryListEvent) => setMatches(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return matches
}

