import React from 'react'
import ProductGrid from '../../../components/ProductGrid'
import UseGetFeatured from '../../../Hooks/UseGetFeatured'


const RelatedProducts = () => {

  const feauredProduct2 = UseGetFeatured(2)
  const feauredProduct4 = UseGetFeatured(4)

  return (
    <div className='container carousel-box'>
        <h4 className='container carousel-title'>Related Products</h4> 
        <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
            {/* works but need to update page if breakpoint i changed */}
            { window.innerWidth < 960 ?
                <div className="carousel-inner carousel-design">        
                    <div className="carousel-item active">
                        <ProductGrid title={""} col={2} items={feauredProduct2} cardIsFlexed={false}/>
                    </div>
                    <div className="carousel-item ">
                        <ProductGrid title={""} col={2} items={feauredProduct2} cardIsFlexed={false}/>
                    </div>
                    <div className="carousel-item ">
                        <ProductGrid title={""} col={2} items={feauredProduct2} cardIsFlexed={false}/>
                    </div>
                </div>  
                :
                <div className="carousel-inner carousel-design">        
                    <div className="carousel-item active ">
                        <ProductGrid title={""} col={4} items={feauredProduct4} cardIsFlexed={false}/>
                    </div>
                    <div className="carousel-item ">
                        <ProductGrid title={""} col={4} items={feauredProduct4} cardIsFlexed={false}/>
                    </div>
                    <div className="carousel-item ">
                        <ProductGrid title={""} col={4} items={feauredProduct4} cardIsFlexed={false}/>
                    </div>
                </div>  
            }

            
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                <span className="carousel-control-prev-icon arrow-design"></span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                <span className="carousel-control-next-icon arrow-design"></span>
            </button>
        </div>
    </div>
  )
}

export default RelatedProducts