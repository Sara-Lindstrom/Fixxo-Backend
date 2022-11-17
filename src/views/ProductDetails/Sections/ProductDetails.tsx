import React, { useState } from 'react'
import IProduct from '../../../assets/models/IProduct'
import { currencyFormatter } from '../../../assets/utilities/currencyFormatter'


const ProductDetails:React.FC<{item:IProduct}> = ({item}) => {

  const [countAmount, setCountAmount] = useState(0)
  const [showMore, setShowMore] = useState(false)
  const [colorPlacehoderOption, setColorPlacehoderOption] = useState ('Choose An Option')

  const text = "Discovered had get considered projection who favourable. Necessary up knowledge it tolerably. Unwilling departure education is be dashwoods or an. Use off agreeable law unwilling sir deficient curiosity instantly. Discovered had get considered projection who favourable. Necessary up knowledge it tolerably. Unwilling departure education is be dashwoods or an. Use off agreeable law unwilling sir deficient curiosity instantly."

  const changeColorOption = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    let color:string = e.currentTarget.name
    setColorPlacehoderOption(color)
    return colorPlacehoderOption
  } 


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
    <>
      <div className='container product-detail-container'>
        <div className='img-grid'>
          <div className='big-image-box'>
            <img className='product-detail-img' src={item.imageName} alt={item.name}/>  
          </div>
          <div className='small-image-box'>
            <img className='product-detail-img' src={item.imageName} alt={item.name}/>             
          </div>
          <div className='small-image-box'>
            <img className='product-detail-img' src={item.imageName} alt={item.name}/>             
          </div>
          <div className='small-image-box'>
            <img className='product-detail-img' src={item.imageName} alt={item.name}/>             
          </div>
        </div>

        <div className='info-box'>
          <h2 className='title'>{item.name}</h2>
          <span className='rating'>{rating(item.rating)}</span>
          <p className='price'>{currencyFormatter(item.price)}</p>

          <div className='description' data-testid="show-more-text">
            {/* https://dev.to/muratcanyuksel/code-list-items-with-show-moreless-functionality-in-react-22k0 */}
            {showMore ? text : `${text.substring(0, 214)}`}
            <button className="Show-button" onClick={() => setShowMore(!showMore)}>
              {showMore ? " ( Show Less )" : " ( Show More )"}
            </button>
          </div>

          <form noValidate className='product-form'>
            <div className="size-box">
              <p className='label'>Size:</p>

              <div className='button-box'>
                <button type="button" className="size-option" name='size-button'>S</button>
                <button type="button" className="size-option" name='size-button'>M</button>
                <button type="button" className="size-option" name='size-button'>L</button>
                <button type="button" className="size-option" name='size-button'>X</button>                
              </div>
            </div>   

            <div className='color-option'>
              <p className='label'>Color:</p>
              <div className="dropdown">
                <button className="dropdown-toggle color-dropdown" type="button" data-bs-toggle="dropdown" aria-expanded="false" >{colorPlacehoderOption}</button>
                <ul className="dropdown-menu">
                  <li key="Olive"><button className="dropdown-item" onClick={changeColorOption} name="Olive">Olive</button></li>
                  <li key="Sand"><button className="dropdown-item" onClick={changeColorOption} name="Sand">Sand</button></li>
                  <li key="Blue"><button className="dropdown-item" onClick={changeColorOption} name="Blue">Blue</button></li>
                </ul>
              </div>
            </div>

            <div className='quantity-option'>
              <p className='label'>Quantity:</p>

              <div className='counter'>
                <button className='counter-button' type='button' onClick={()=>setCountAmount(countAmount +1)}>+</button>
                <p className='count-amount'>{countAmount}</p>
                <button  className='counter-button' type='button' onClick={()=> countAmount>0 ? setCountAmount(countAmount -1) : {}}>-</button>
              </div>
            </div>  

            <div className='product-submit-button-option'>
              <button type='button' className='theme-button button product-submit-button'>ADD TO CART</button>              
            </div>
            
          </form>

          <div className='share-options'>
            <p className='label'>Share:</p>
            <div className='social-media-options'>
              <button className='round-button social-media-button'><i className='fa-brands fa-facebook-f'></i></button>
              <button className='round-button social-media-button'><i className='fa-brands fa-instagram'></i></button>
              <button className='round-button social-media-button'><i className='fa-brands fa-twitter'></i></button>
              <button className='round-button social-media-button'><i className='fa-brands fa-google'></i></button>
              <button className='round-button social-media-button'><i className='fa-brands fa-linkedin'></i></button>      
            </div>

          </div>
        </div>
      </div>
      <div className='container'>

      </div>
    </>
  )
}

export default ProductDetails