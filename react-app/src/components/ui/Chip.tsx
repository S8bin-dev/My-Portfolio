type Props = {
  label: string
  className?: string
}

export function Chip({ label, className }: Props) {
  return (
    <span className={['chip', className].filter(Boolean).join(' ')}>
      {label}
    </span>
  )
}
