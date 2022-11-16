import React from 'react'
import ICartItem from '../../assets/models/useShoppingContextModels/ICartItem'
import { currencyFormatter } from '../../assets/utilities/currencyFormatter'
import { UseShoppingCart } from './ShoppingCartContext'


const ShoppingCartItem = (item: ICartItem) => {

  const context =  UseShoppingCart();
  const incrementQuantity = context?.incrementQuantity;
  const decrementQuantity = context?.decrementQuantity;
  const removeItem = context?.removeItem;

  return (
    <div className='shoppin-cart-item'>
        <div className='item-image'>
            <img src={item.product.imageName} alt={item.product.name}/>
        </div>
        <div className='item-title'>
            {item.product.name}
        </div>
        <div className='item-quantity'>
            <button onClick={() => decrementQuantity !== undefined ? decrementQuantity(item) : {}} className='cart-button'>-</button>
            <span>{item.quantity}</span>
            <button onClick={() => incrementQuantity !== undefined ? incrementQuantity(item) : {}} className='cart-button'>+</button>
        </div>        
        <div className='item-price'>
            <div>{currencyFormatter(item.product.price * item.quantity)}</div>
        </div>        
        <div className='cart-trash'>
        <button className='cart-button' onClick={() => removeItem !== undefined ? removeItem(item) : {}}><i className="fa-regular fa-trash"></i></button>             
        </div>
           
    </div>
  )
}




export default ShoppingCartItem

