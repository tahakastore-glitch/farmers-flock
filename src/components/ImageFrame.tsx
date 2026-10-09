import { useState } from 'react'
import { Icon } from '../Icons'

type Props = { src: string; alt: string; className?: string; eager?: boolean; sizes?: string }

function getResponsiveSources(src: string) {
  if (!src.startsWith('https://images.unsplash.com/')) return undefined
  if (!/[?&]w=\d+/.test(src)) return undefined
  return [480, 768, 1100, 1500]
    .map((width) => `${src.replace(/([?&]w=)\d+/, (_match, prefix: string) => `${prefix}${width}`)} ${width}w`)
    .join(', ')
}

export function ImageFrame({ src, alt, className = '', eager = false, sizes = '(max-width: 760px) 50vw, (max-width: 1200px) 33vw, 25vw' }: Props) {
  const [failed, setFailed] = useState(false)
  return (
    <div className={`image-frame ${className}${failed ? ' image-failed' : ''}`}>
      {!failed && <img src={src} srcSet={getResponsiveSources(src)} sizes={sizes} width="1200" height="900" alt={alt} loading={eager ? 'eager' : 'lazy'} decoding="async" fetchPriority={eager ? 'high' : 'auto'} onError={() => setFailed(true)} />}
      {failed && <div className="image-fallback" aria-hidden="true"><Icon name="leaf" size={34} /></div>}
    </div>
  )
}
