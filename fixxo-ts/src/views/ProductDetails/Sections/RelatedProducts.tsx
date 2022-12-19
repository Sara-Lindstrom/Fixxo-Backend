import React, { useEffect, useState } from 'react'
import ProductGrid from '../../../components/ProductGrid'
import UseGetFeatured from '../../../Hooks/productHooks/UseGetFeatured'


const RelatedProducts = () => {

  const relatedExtended = UseGetFeatured("featured", 8)
  
  const firstCarouselDisplay = relatedExtended.slice(0, 4)
  const secondCarouselDisplay = relatedExtended.slice(4, 8)

  

  return (
    <div className='container-fluid carousel-box'>
        <h4 className='container carousel-title'>Related Products</h4> 
        <div id="carouselExampleControls" className="carousel slide carouselbox" data-bs-ride="carousel">
            <div className="carousel-inner carousel-design">        
                <div className="carousel-item active ">
                    <ProductGrid title={""} col={4} items={firstCarouselDisplay} cardIsFlexed={false}/>
                </div>
                <div className="carousel-item ">
                    <ProductGrid title={""} col={4} items={secondCarouselDisplay} cardIsFlexed={false}/>
                </div>
            </div> 

            
            <button className="carousel-control-prev prev-design" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                <span className="carousel-control-prev-icon arrow-design"></span>
            </button>
            <button className="carousel-control-next next-design" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                <span className="carousel-control-next-icon arrow-design"></span>
            </button>
        </div>
    </div>
  )
}

export default RelatedProducts