import { useEffect, useRef, useState } from 'react'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

type Options = {
  rootMargin?: string
  threshold?: number | number[]
}

export function useIntersectionFadeIn<T extends HTMLElement>(
  { rootMargin = '0px 0px -10% 0px', threshold = 0.2 }: Options = {},
) {
  const prefersReducedMotion = usePrefersReducedMotion()
  const ref = useRef<T | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsVisible(true)
      return
    }

    const element = ref.current
    if (!element || typeof IntersectionObserver === 'undefined') {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            observer.unobserve(entry.target)
          }
        })
      },
      { rootMargin, threshold },
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [prefersReducedMotion, rootMargin, threshold])

  return { ref, isVisible }
}

