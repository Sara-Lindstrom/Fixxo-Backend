import React from 'react'
import leftImg from '../../../assets/img/pamela-reif-top-pick.svg';
import rightImg from '../../../assets/img/lets-be-conscios.svg'

const FeaturedShowcase = () => {
  return (
    // Pamela reif 
    <div className="container-fluid pamela-reif-lets-be-conscious">
        <div className="pamela-reif">
            <img src={leftImg} alt="pamela reif's top picks"/>

            <div className="info">
                <h4>Pamela Reif's<br/>Top Picks</h4>
                <button className="button dark-button">SHOP NOW</button>
            </div>
        </div>
        {/* and lets be conscious */}
        <div className="lets-be-conscious">
            <img src={rightImg} alt="Let's be conscious"/>

            <div className="info">
                <h4>Let's Be<br/>Conscious</h4>
                <button className="button light-button">FLASH SALE</button>
            </div>
        </div>
    </div>
  )
}

export default FeaturedShowcase