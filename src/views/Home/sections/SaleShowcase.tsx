import React from 'react'
import salePlaceholder from '../../../assets/img/sale.svg'

const SaleShowcase = () => {
  return (
    <div className="container sale">
        <img src={salePlaceholder} alt="70% off!"/>

        <div className="info">
            <h4>Up to 70% off*</h4>
            <p>Women's, men's & kids' Winter fashion</p>
            <button className="button light-button">FLASH SALE</button>
        </div>
    </div>
  )
}

export default SaleShowcase