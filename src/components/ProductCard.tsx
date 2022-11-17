import React from 'react'
import RoundButtonImg from './RoundButtonImg';
import cartIcon from '../assets/img/cart-icon.svg';
import compareIcon from '../assets/img/compare-icon.svg';
import wishlistIcon from '../assets/img/wishlist-icon.svg';
import { NavLink } from 'react-router-dom';
import { UseShoppingCart } from './shoppingcart/ShoppingCartContext';
import { currencyFormatter } from '../assets/utilities/currencyFormatter';
import ICartItem from '../assets/models/useShoppingContextModels/ICartItem';

const ProductCard:React.FC<{product:ICartItem, isFlexed:boolean, key:string}> = ({product, isFlexed, key}) => {

    const incrementQuantity = UseShoppingCart()?.incrementQuantity

    
    // https://stackoverflow.com/questions/47287177/how-to-loop-over-a-number-in-react-inside-jsx
    const rating = (starRating:number) => {
        let stars = []
        for (let i = 0; i<starRating; i++){
        stars.push(<i className="fa-solid fa-star" key={i}></i>)
        }
        if (stars.length<5){
        for (let i = stars.length; i<5; i++){
            stars.push(<i className="fa-regular fa-star" key={i}></i>)
        }
        }
        return stars
    }
    

  return (
    // card core
    <div className={isFlexed ? "card card-side" : "card"}>
        <div className="card-background">
            <img src={product.product.imageName} alt={product.product.name}/> 
            
                            
            {/* options and availability */}
            <div className="card-options">
                <ul>
                    <li><RoundButtonImg  image={wishlistIcon} link=""></RoundButtonImg></li>
                    <li><RoundButtonImg  image={compareIcon} link=""></RoundButtonImg></li>
                    <li><RoundButtonImg link="" onClickEvent={() => incrementQuantity !== undefined ? incrementQuantity(product) : {}} image={cartIcon}></RoundButtonImg></li>
                </ul>

                {/* button to relocate to productdetails */}
                <button className="button theme-button"><NavLink className="theme-button-link" to={`/product/id/${product.product.articleNumber}`}>QUICK&nbsp;VIEW</NavLink></button>
            </div>
        </div>

        {/* product information */}
        <div className="product-info">
            <p className="category">{product.product.category}</p>
            <h4 className="product-name">{product.product.name}</h4>
            <div className='star-rating'>{rating(product.product.rating)}</div>
            <span className="original-price">{currencyFormatter(product.product.price)}</span>
        </div> 
    </div>   
  )
}

export default ProductCard