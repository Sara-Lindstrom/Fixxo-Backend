import React from 'react'
import showcaseLeft from '../../../assets/img/showcase-left.svg'
import showcaseRight from '../../../assets/img/showcase-right.svg'
import underLefttImg from '../../../assets/img/winter-clearans-placeholder.svg'
import underRightImg from '../../../assets/img/new-arrivals-placeholder.svg'

const Showcase = () => {
  return (
    <>
      <div className="showcase">
          <img className='showcase-img' src={showcaseLeft} alt="showcase"/>
          <div className="group"> 
              <h2>SALE UP<br/>To 50% off</h2>
              <p>online shopping free home delivery over $100</p>
              <button className="button theme-button">SHOP&nbsp;NOW</button>
          </div>
          <img className='showcase-img' src={showcaseRight} alt="showcase"/>
      </div>

    {/* winter clearance and new arrivals */}
    <div className="clearance-arrivals container-fluid">
        {/* <!-- clearence --> */}
        <div className="clearance background"> 
            <div className="info">
                <h2>Winter&nbsp;Clearance <br/> Up to 70% off!</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni mollitia quod necessitatibus maiores aspernatur aperiam optio repellendus, quas nesciunt illo repellat sunt aliquam autem, consectetur minus quos nobis velit. Exercitationem.</p>
                <button className="button dark-button">SHOP&nbsp;NOW</button>       
            </div>
            <img className='clearence-arrival-img' src={underLefttImg} alt="winter clearance"/>
        </div>
        {/* <!-- new arrivals --> */}
        <div className="arrivals background">  
            <div className="info">
                <h2>New<br/>Arivals</h2>
                <button className="button dark-button">SHOP&nbsp;NOW</button>                         
            </div>  
            <img className='clearence-arrival-img' src={underRightImg} alt="new arrivals"/>
        </div>
    </div>
    </>
    
  )
}

export default Showcase;