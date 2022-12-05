import React, { useEffect, useState } from 'react'
import ProductGrid from '../../../components/ProductGrid'
import UseGetFeatured from '../../../Hooks/UseGetFeatured'


const RelatedProducts = () => {

  const relatedExtended = UseGetFeatured("featured", 8)
  const firstSmallCarouselDisplay = relatedExtended.slice(0, 2)
  const secondSmallCarouselDisplay = relatedExtended.slice(2, 4)
  
  const firstBigCarouselDisplay = relatedExtended.slice(0, 4)
  const secondBigCarouselDisplay = relatedExtended.slice(4, 8)

  const [showSmallCarousel, setShowSmallCarousel] = useState(false)

  useEffect(() => {
    if (window.innerWidth <= 960){
        setShowSmallCarousel(true)
    }
    else{
        setShowSmallCarousel(false)
    }
    console.log(window.innerWidth)

  }, [window.innerWidth])
  

  return (
    <div className='container-fluid carousel-box'>
        <h4 className='container carousel-title'>Related Products</h4> 
        <div id="carouselExampleControls" className="carousel slide carouselbox" data-bs-ride="carousel">
            {/* works but need to update page if breakpoint i changed */}
            {/* { showSmallCarousel ?
                <div className="carousel-inner carousel-design">        
                    <div className="carousel-item active">
                        <ProductGrid title={""} col={2} items={firstSmallCarouselDisplay} cardIsFlexed={false}/>
                    </div>
                    <div className="carousel-item ">
                        <ProductGrid title={""} col={2} items={secondSmallCarouselDisplay} cardIsFlexed={false}/>
                    </div>
                </div>  
                : */}
                <div className="carousel-inner carousel-design">        
                    <div className="carousel-item active ">
                        <ProductGrid title={""} col={4} items={firstBigCarouselDisplay} cardIsFlexed={false}/>
                    </div>
                    <div className="carousel-item ">
                        <ProductGrid title={""} col={4} items={secondBigCarouselDisplay} cardIsFlexed={false}/>
                    </div>
                </div>  
            {/* } */}

            
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