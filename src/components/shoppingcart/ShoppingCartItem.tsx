import React from 'react'
import { currencyFormatter } from '../../assets/utilities/currencyFormatter'
import { UseShoppingCart } from './ShoppingCartContext'

const ShoppingCartItem = ({item}) => {

  const {incrementQuantity , decrementQuantity , removeItem} = UseShoppingCart()

  return (
    <div className='shoppin-cart-item'>
        <div className='item-image'>
            <img src={item.product.imageName} alt={item.product.name}/>
        </div>
        <div className='item-title'>
            {item.product.name}
        </div>
        <div className='item-quantity'>
            <button onClick={() => decrementQuantity(item)} className='cart-button'>-</button>
            <span>{item.quantity}</span>
            <button onClick={() => incrementQuantity(item)} className='cart-button'>+</button>
        </div>        
        <div className='item-price'>
            <div>{currencyFormatter(item.product.price * item.quantity)}</div>
        </div>        
        <div className='cart-trash'>
        <button className='cart-button' onClick={() => removeItem(item.articleNumber)}><i className="fa-regular fa-trash"></i></button>             
        </div>
           
    </div>
  )
}




export default ShoppingCartItem

