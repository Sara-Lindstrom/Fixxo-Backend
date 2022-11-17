import React from 'react'
import ICartItem from '../../../assets/models/useShoppingContextModels/ICartItem';
import ProductGrid from '../../../components/ProductGrid';

const ShowCaseGrid:React.FC<{leftImg:string, leftAlt:string, col:number, item:ICartItem[], rightImg:string, rightAlt:string}> = ({leftImg, leftAlt, col, item = [], rightImg, rightAlt}) => {


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
      <ProductGrid title={""} item={item} col={col} cardIsFlexed={false}/>

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