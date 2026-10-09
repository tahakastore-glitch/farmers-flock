import { useCallback, useEffect, useRef, useState } from 'react'
import type { Product } from '../data'
import { Icon } from '../Icons'
import { ImageFrame } from './ImageFrame'

type Props = { product: Product | null; onClose: () => void; onInquire: (product: Product) => void }

export function ProductDialog({ product, onClose, onInquire }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const previousFocus = useRef<HTMLElement | null>(null)
  const closeTimer = useRef<number | null>(null)
  const closing = useRef(false)
  const restoreFocus = useRef(true)
  const [isClosing, setIsClosing] = useState(false)

  const requestClose = useCallback((afterClose?: () => void) => {
    if (closing.current) return
    closing.current = true
    setIsClosing(true)
    const duration = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 180
    closeTimer.current = window.setTimeout(() => {
      if (afterClose) {
        restoreFocus.current = false
        afterClose()
      }
      else onClose()
    }, duration)
  }, [onClose])

  useEffect(() => {
    if (!product) return
    closing.current = false
    restoreFocus.current = true
    setIsClosing(false)
    previousFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
    document.body.classList.add('dialog-open')
    closeRef.current?.focus()

    function handleKeys(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault()
        requestClose()
      } else if (event.key === 'Tab') {
        const dialog = document.querySelector<HTMLElement>('[data-product-dialog]')
        const focusable = Array.from(dialog?.querySelectorAll<HTMLElement>('button:not([disabled]), a[href], input:not([disabled]), [tabindex]:not([tabindex="-1"])') ?? [])
          .filter((element) => element.getClientRects().length > 0)
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
      if (closeTimer.current !== null) window.clearTimeout(closeTimer.current)
      document.body.classList.remove('dialog-open')
      if (restoreFocus.current) previousFocus.current?.focus()
    }
  }, [product, requestClose])

  if (!product) return null
  return (
    <div className={`dialog-backdrop${isClosing ? ' dialog-closing' : ''}`} role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) requestClose() }}>
      <section className={`product-dialog${isClosing ? ' dialog-closing' : ''}`} role="dialog" aria-modal="true" aria-labelledby="dialog-title" aria-describedby="dialog-summary" data-product-dialog>
        <button className="icon-button dialog-close" type="button" ref={closeRef} onClick={() => requestClose()} aria-label="Close product details"><Icon name="close" /></button>
        <div className="dialog-photo"><ImageFrame src={product.image} alt={product.imageAlt} eager sizes="(max-width: 760px) 100vw, 40vw" /></div>
        <div className="dialog-copy">
          <span className="eyebrow">{product.category} <span className="eyebrow-dot" /> Demo catalog entry</span>
          <h2 id="dialog-title">{product.name}</h2>
          <p className="dialog-summary" id="dialog-summary">{product.summary}</p>
          <p>{product.description}</p>
          <div className="format-note"><span>Listing format</span><strong>{product.format}</strong></div>
          <p className="disclaimer">Fictional example only. Product availability, composition and suitability are not verified.</p>
          <button className="button button-primary" type="button" onClick={() => requestClose(() => onInquire(product))}>Ask a supplier about this <Icon name="arrow" size={17} /></button>
        </div>
      </section>
    </div>
  )
}
