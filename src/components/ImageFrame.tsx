import { useState } from 'react'
import { Icon } from '../Icons'

type Props = { src: string; alt: string; className?: string; eager?: boolean }

export function ImageFrame({ src, alt, className = '', eager = false }: Props) {
  const [failed, setFailed] = useState(false)
  return (
    <div className={`image-frame ${className}${failed ? ' image-failed' : ''}`}>
      {!failed && <img src={src} alt={alt} loading={eager ? 'eager' : 'lazy'} decoding="async" fetchPriority={eager ? 'high' : 'auto'} onError={() => setFailed(true)} />}
      {failed && <div className="image-fallback" aria-label={alt}><Icon name="leaf" size={34} /></div>}
    </div>
  )
}
