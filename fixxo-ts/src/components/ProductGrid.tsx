import React from 'react'
import ProductCard from './ProductCard'
import ICartItem from '../assets/models/useShoppingContextModels/ICartItem'

const ProductGrid:React.FC<{title:string, col:number, cardIsFlexed:boolean, items:ICartItem[] | null}> = ({title, col, cardIsFlexed, items=null}) => {
  
  if(items === null || items.length === 0){
    return <></>
  }

  return (
    <div className="container">
        <h4 className="headline">{title}</h4>
        <div className={`d-grid-${col}`}>

          {items.map(item => <ProductCard product={item} isFlexed={cardIsFlexed} key={item.product._id}/>)}

        </div>
    </div>
  )
}

export default ProductGrid