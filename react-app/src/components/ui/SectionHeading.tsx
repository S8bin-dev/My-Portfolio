import { PropsWithChildren } from 'react'

type Props = PropsWithChildren<{
  eyebrow?: string
  title: string
}>

export function SectionHeading({ eyebrow, title, children }: Props) {
  return (
    <header className="section-header">
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2>{title}</h2>
      {children && <div className="section-header-body">{children}</div>}
    </header>
  )
}

