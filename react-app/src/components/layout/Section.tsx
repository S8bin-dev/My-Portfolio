import { PropsWithChildren } from 'react'
import { useIntersectionFadeIn } from '../../hooks/useIntersectionFadeIn'
import { Container } from './Container'

type Props = PropsWithChildren<{
  id?: string
  kind?: 'default' | 'hero'
  ariaLabel?: string
}>

export function Section({ id, kind = 'default', ariaLabel, children }: Props) {
  const { ref, isVisible } = useIntersectionFadeIn<HTMLDivElement>()

  return (
    <section
      id={id}
      className={['section', kind === 'hero' && 'section-hero'].filter(Boolean).join(' ')}
      aria-label={ariaLabel}
    >
      <Container>
        <div
          ref={ref}
          className={['section-inner', isVisible && 'section-inner--visible']
            .filter(Boolean)
            .join(' ')}
        >
          {children}
        </div>
      </Container>
    </section>
  )
}

