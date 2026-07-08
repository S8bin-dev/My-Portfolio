import {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  PropsWithChildren,
} from 'react'

type Variant = 'primary' | 'ghost' | 'subtle'
type Size = 'md' | 'sm'

type SharedProps = PropsWithChildren<{
  variant?: Variant
  size?: Size
  className?: string
}>

type AsButton = SharedProps & { as?: 'button' } & Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  keyof SharedProps
>

type AsAnchor = SharedProps & { as: 'a' } & Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  keyof SharedProps
>

type Props = AsButton | AsAnchor

export function Button(props: Props) {
  const {
    variant = 'primary',
    size = 'md',
    as = 'button',
    children,
    className,
    ...rest
  } = props

  const classes = ['btn', `btn--${variant}`, `btn--${size}`, className]
    .filter(Boolean)
    .join(' ')

  if (as === 'a') {
    const { ...anchorRest } = rest as Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof SharedProps>
    return (
      <a className={classes} {...anchorRest}>
        {children}
      </a>
    )
  }

  const { ...buttonRest } = rest as Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof SharedProps>
  return (
    <button type="button" className={classes} {...buttonRest}>
      {children}
    </button>
  )
}

