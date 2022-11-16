import React from 'react'
import { NavLink } from 'react-router-dom';
import placeholderImg from '../../../assets/img/speciality-pic.svg'

const ShoppingInfo = () => {
  return (
    <div className="container our-speciality">
        <h3 className="headline">Our Speciality</h3>
        
        {/* info box 1 */}
        <div className="flexed-box">
            <div className="info-box">
                <div className="info">
                    <p>Track Your Order</p>
                    <NavLink className="get-started">Get&nbsp;Started&nbsp;{'>'}</NavLink>                
                </div>
                <img src={placeholderImg} alt="track your order"/>
            </div>
        
            {/* info box 2 */}
            <div className="info-box">
                <div className="info">
                    <p>Make a Return</p>
                    <NavLink className="get-started">Get&nbsp;Started&nbsp;{'>'}</NavLink>                
                </div>
                <img src={placeholderImg} alt="make a return"/>
            </div>            
            
            {/* info box 3 */}
            <div className="info-box">
                <div className="info">
                    <p>Request a Price Adjustment</p>
                    <NavLink className="get-started">Get&nbsp;Started&nbsp;{'>'}</NavLink>                
                </div>
                <img src={placeholderImg} alt="request a price adjustment"/>
            </div>    
        </div>
    </div>
  )
}

export default ShoppingInfo