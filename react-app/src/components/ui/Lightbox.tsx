import { useEffect, useCallback } from 'react'

export type LightboxItem = {
  src: string
  alt: string
  caption: string
}

type Props = {
  items: LightboxItem[]
  currentIndex: number
  isOpen: boolean
  onClose: () => void
  onNavigate: (index: number) => void
}

export function Lightbox({ items, currentIndex, isOpen, onClose, onNavigate }: Props) {
  const safeLen = Math.max(items.length, 1)
  const clampedIndex = Math.min(Math.max(0, currentIndex), safeLen - 1)

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onNavigate((clampedIndex - 1 + items.length) % items.length)
      if (e.key === 'ArrowRight') onNavigate((clampedIndex + 1) % items.length)
    },
    [onClose, onNavigate, clampedIndex, items.length],
  )

  useEffect(() => {
    if (!isOpen) return
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, handleKeyDown])

  if (!isOpen || items.length === 0) return null

  const item = items[clampedIndex]

  return (
    <div
      className="lightbox-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Image lightbox"
    >
      <button
        type="button"
        className="lightbox-close"
        onClick={onClose}
        aria-label="Close lightbox"
      >
        &times;
      </button>

      <button
        type="button"
        className="lightbox-nav lightbox-nav--prev"
        onClick={(e) => {
          e.stopPropagation()
          onNavigate((clampedIndex - 1 + items.length) % items.length)
        }}
        aria-label="Previous image"
      >
        &#10094;
      </button>

      <img
        className="lightbox-img"
        src={item.src}
        alt={item.alt}
        onClick={(e) => e.stopPropagation()}
      />

      <button
        type="button"
        className="lightbox-nav lightbox-nav--next"
        onClick={(e) => {
          e.stopPropagation()
          onNavigate((clampedIndex + 1) % items.length)
        }}
        aria-label="Next image"
      >
        &#10095;
      </button>

      <div className="lightbox-footer" onClick={(e) => e.stopPropagation()}>
        <p className="lightbox-caption">{item.caption}</p>
        <p className="lightbox-counter">
          {clampedIndex + 1} / {items.length}
        </p>
      </div>
    </div>
  )
}
