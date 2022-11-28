import React, { useContext, useEffect } from "react"
import { ProductContext } from "../../../components/Admin/ProductContext"
import IProductContext from "../../../assets/models/AdminModels/IProductContext"
import AdminProductCard from "./AdminProductCard"

const ShowAllProducts:React.FC= () => {
    const {allEditableItems, getAll} = useContext(ProductContext) as IProductContext

    useEffect(()=>{
        getAll()
    }, [getAll])

    if(allEditableItems === null || allEditableItems.length === 0){
        return <></>
      }
    
  return (
    <div className="container">
        <h4 className="headline">All Products</h4>
        <div className="">

          {allEditableItems.map(item => <AdminProductCard product={item} key={item.product.articleNumber}/>)}

        </div>
    </div>
  )
}

export default ShowAllProducts
    