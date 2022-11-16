import React from 'react'
import ProductGrid from '../../../components/ProductGrid'
import UseGetFeaturedProducts from '../../../Hooks/UseGetFeaturedProducts'


const RelatedProducts = () => {
  const feauredProduct2 = UseGetFeaturedProducts(2)
  const feauredProduct4 = UseGetFeaturedProducts(4)
  return (
    <div className='container carousel-box'>
        <h4 className='container carousel-title'>Related Products</h4> 
        <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
            {/* works but need to update page if breakpoint i changed */}
            { window.innerWidth < 960 ?
                <div className="carousel-inner carousel-design">        
                    <div className="carousel-item active">
                        <ProductGrid col={"2"} items={feauredProduct2}/>
                    </div>
                    <div className="carousel-item ">
                        <ProductGrid col={"2"} items={feauredProduct2}/>
                    </div>
                    <div className="carousel-item ">
                        <ProductGrid col={"2"} items={feauredProduct2}/>
                    </div>
                </div>  
                :
                <div className="carousel-inner carousel-design">        
                    <div className="carousel-item active ">
                        <ProductGrid col={"4"} items={feauredProduct4}/>
                    </div>
                    <div className="carousel-item ">
                        <ProductGrid col={"4"} items={feauredProduct4}/>
                    </div>
                    <div className="carousel-item ">
                        <ProductGrid col={"4"} items={feauredProduct4}/>
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