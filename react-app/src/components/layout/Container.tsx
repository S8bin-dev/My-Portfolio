import { PropsWithChildren } from 'react'

type Props = PropsWithChildren<{
  className?: string
}>

export function Container({ children, className }: Props) {
  return (
    <div className={['container', className].filter(Boolean).join(' ')}>
      {children}
    </div>
  )
}

