import type { Product } from '../data'
import { Icon } from '../Icons'
import { ImageFrame } from './ImageFrame'

type Props = { product: Product; onSelect: (product: Product) => void; onInquire: (product: Product) => void }

export function ProductCard({ product, onSelect, onInquire }: Props) {
  return (
    <article className="product-card">
      <button className="product-visual" type="button" onClick={() => onSelect(product)} aria-label={`View details for ${product.name}`}>
        <ImageFrame src={product.image} alt={product.imageAlt} />
        <span className="product-index">{product.label}</span>
        <span className="quick-view">Quick view <Icon name="arrow" size={16} /></span>
      </button>
      <div className="product-card-copy">
        <div className="product-category">{product.category}</div>
        <button className="product-name" type="button" onClick={() => onSelect(product)}>{product.name}</button>
        <p>{product.summary}</p>
        <button className="text-link product-inquire" type="button" onClick={() => onInquire(product)}>
          Ask about this item <Icon name="arrow" size={16} />
        </button>
      </div>
    </article>
  )
}
