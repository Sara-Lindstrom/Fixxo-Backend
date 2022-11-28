import React from 'react'
import { currencyFormatter } from '../../../assets/utilities/currencyFormatter';
import ICartItem from '../../../assets/models/useShoppingContextModels/ICartItem';

const ProductCard:React.FC<{product:ICartItem}> = ({product}) => {
    

  return (
    // card core
    <div className="admin-card container">
        <div className="admin-product-image">
            <img src={product.product.imageName} alt={product.product.name}/> 
        </div>

        {/* product information */}
        <div className="admin-product-info">
            <h4 className="product-name">{product.product.name}</h4>
            <p className="category">{product.product.category}</p>
            <span className="original-price">{currencyFormatter(product.product.price)}</span>
        </div> 

        <div className='delete-or-edit-buttons'>
            <button className='round-button admin-buttons'><i className="fa-light fa-pen-to-square"></i></button>
            <button className='round-button admin-buttons'><i className="fa-regular fa-trash"></i></button>
        </div>
    </div>   
  )
}

export default ProductCard