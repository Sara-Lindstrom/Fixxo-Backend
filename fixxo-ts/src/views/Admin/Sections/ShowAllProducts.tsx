import React from "react"
import AdminProductCard from "./AdminProductCard"
import UseGetAll from "../../../Hooks/UseGetAll"

const ShowAllProducts:React.FC= () => {
  const allProducts= UseGetAll()
  
    if(allProducts === null || allProducts.length === 0){
        return <></>
    }
    
  return (
    <div className="container">
        <h4 className="headline">All Products</h4>
        <div>

          {allProducts.map(item => <AdminProductCard product={item} key={item.product.articleNumber}/>)}

        </div>
    </div>
  )
}

export default ShowAllProducts
    