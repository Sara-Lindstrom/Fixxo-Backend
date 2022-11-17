import React from 'react'
import ProductCard from './ProductCard'
import IPrductCardItem from '../assets/models/IproductCardItem'
import ICartItem from '../assets/models/useShoppingContextModels/ICartItem'

const ProductGrid:React.FC<{title:string, col:number,cardIsFlexed:boolean, item:ICartItem[]}> = ({title, col, cardIsFlexed, item=[]}) => {
  
  const productInfo:IPrductCardItem = {title:title, col:col, cardIsFlexed:cardIsFlexed}

  return (
    <div className="container">
        <h4 className="headline">{productInfo.title}</h4>
        <div className={`d-grid-${productInfo.col}`}>

          {item.map(product => <ProductCard product={product} isFlexed={productInfo.cardIsFlexed} key={product.product.articleNumber}/>)}

        </div>
    </div>
  )
}

export default ProductGrid