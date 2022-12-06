import React from 'react'
import cartIcon from '../../assets/img/cart-icon.svg';
import { UseShoppingCart } from './ShoppingCartContext';
import ShoppingCartItem from './ShoppingCartItem';

const ShoppingCart = () => {

  const cartItem = UseShoppingCart()?.cartItem ?? []

  return (
    <div className="shoppingcart offcanvas offcanvas-end" tabIndex={-1} id="shoppingCart" aria-labelledby="shoppingCartLabel">
      <div className="offcanvas-header">
        <h5 className="offcanvas-title shoppingcart-title" id="shoppingCartLabel"><img className="cart-img" src={cartIcon} alt="shoppingcart"></img>Shopping Cart</h5>
        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div className="offcanvas-body">
        {
        cartItem.map(item => (<ShoppingCartItem key={item.product._id} item={item}/>)) 
        }
      </div>
    </div>
  )
}

export default ShoppingCart