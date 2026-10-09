import { useEffect, useRef } from 'react'
import type { Product } from '../data'
import { Icon } from '../Icons'
import { ImageFrame } from './ImageFrame'

type Props = { product: Product | null; onClose: () => void; onInquire: (product: Product) => void }

export function ProductDialog({ product, onClose, onInquire }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const previousFocus = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!product) return
    previousFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
    document.body.classList.add('dialog-open')
    closeRef.current?.focus()

    function handleKeys(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose()
      } else if (event.key === 'Tab') {
        const dialog = document.querySelector<HTMLElement>('[data-product-dialog]')
        const focusable = dialog?.querySelectorAll<HTMLElement>('button:not([disabled]), a[href], input:not([disabled]), [tabindex]:not([tabindex="-1"])')
        if (!focusable?.length) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener('keydown', handleKeys)
    return () => {
      document.removeEventListener('keydown', handleKeys)
      document.body.classList.remove('dialog-open')
      previousFocus.current?.focus()
    }
  }, [product, onClose])

  if (!product) return null
  return (
    <div className="dialog-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
      <section className="product-dialog" role="dialog" aria-modal="true" aria-labelledby="dialog-title" data-product-dialog>
        <button className="icon-button dialog-close" type="button" ref={closeRef} onClick={onClose} aria-label="Close product details"><Icon name="close" /></button>
        <div className="dialog-photo"><ImageFrame src={product.image} alt={product.imageAlt} eager /></div>
        <div className="dialog-copy">
          <span className="eyebrow">{product.category} <span className="eyebrow-dot" /> Demo catalog entry</span>
          <h2 id="dialog-title">{product.name}</h2>
          <p className="dialog-summary">{product.summary}</p>
          <p>{product.description}</p>
          <div className="format-note"><span>Listing format</span><strong>{product.format}</strong></div>
          <p className="disclaimer">Fictional example only. Product availability, composition and suitability are not verified.</p>
          <button className="button button-primary" type="button" onClick={() => onInquire(product)}>Ask a supplier about this <Icon name="arrow" size={17} /></button>
        </div>
      </section>
    </div>
  )
}
