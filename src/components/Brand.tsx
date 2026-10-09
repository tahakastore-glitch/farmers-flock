import { Icon } from '../Icons'

export function Brand({ light = false }: { light?: boolean }) {
  return (
    <a className={`brand${light ? ' brand-light' : ''}`} href="#home" aria-label="FARMORA home">
      <span className="brand-mark"><Icon name="leaf" size={21} /></span>
      <span className="brand-copy">
        <strong>FARMORA</strong>
        <small>VETERINARY &amp; POULTRY</small>
      </span>
    </a>
  )
}
