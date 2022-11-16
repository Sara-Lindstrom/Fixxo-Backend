import React from 'react'
import ProductGrid from '../../../components/ProductGrid';

const ShowCaseGrid = ({leftImg, leftAlt, col, items = [], rightImg, rightAlt}) => {


  const leftShow = leftImg !== "" ? true : false;
  const rightShow = rightImg !== "" ? true : false;

  return (
    <div className="container-fluid showcasegrid-container">

      {/* if left image is active */}
      <div className={leftShow ? "group" : "d-none"}>
        <img src={leftImg} alt={leftAlt}/>

        <div className="info">
          <h4>2 FOR USD $29</h4>
          <button className="button light-button"> FLASH&nbsp;SALE</button>
        </div>        
      </div>

      {/* card grid */}
      <ProductGrid title={""} items={items} col={col}/>

      {/* if right image is active */}
      <div className={rightShow ? "group" : "d-none"}>
        <img src={rightImg} alt={rightAlt}/>
        <div className="info">
          <h4>2 FOR USD $29</h4>
          <button className="button light-button"> FLASH&nbsp;SALE</button>
        </div>

      </div>  
  </div>

  )
}

export default ShowCaseGrid