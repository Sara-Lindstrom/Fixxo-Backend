import React from 'react'
import ProductCard from './ProductCard'

const ProductGrid = ({title, col, cardIsFlexed, items =[] }) => {

  return (
    <div className="container">
        <h4 className="headline">{title}</h4>
        <div className={`d-grid-${col}`}>

          {items.map(product => <ProductCard cardIsFlexed={cardIsFlexed} key={product.articleNumber} item={product}/>)}

        </div>
    </div>
  )
}

export default ProductGrid