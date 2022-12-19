import React, { useContext, useEffect, useState } from "react"
import AdminProductCard from "./AdminProductCard"
import ICartItem from "../../../assets/models/useShoppingContextModels/ICartItem"
import { gql, useQuery } from "@apollo/client"
import IProductContext from "../../../assets/models/AdminModels/IProductContext"
import { ProductContext } from "../../../components/Admin/ProductContext"


const getProductsQuery = gql`{products{_id, name, tag, description, category, price, rating, imageName}}`

const ShowAllProducts:React.FC= () => {
  const { hasChanged, setHasChanged } = useContext(ProductContext) as IProductContext

  const [apiProducts, setApiProducts] = useState([])
  const [displayProducts, setDisplayProducts] = useState<ICartItem[]>([])
  const {loading, error, data, refetch} = useQuery(getProductsQuery, {fetchPolicy:"cache-and-network"})


  const populateProducts = async () => {

    await fetch(data)
    
    if (error){
      console.log('error...')
    }
    
    if(loading === false && error === undefined){
      setApiProducts(await (data.products))
    }
  }

  populateProducts();

  useEffect(() => {
    refetch()
    setHasChanged(false)
  }, [hasChanged])


  useEffect(()=>{
    let cartItems = apiProducts.map(p => {
        let cartitem:ICartItem = {
            quantity:0,
            product:p
        }
        return cartitem;
    })

    setDisplayProducts(cartItems)
  }, [apiProducts])

  return (
    <div className="container">
        <h4 className="headline">All Products</h4>
        <div>
          {displayProducts.map((item:ICartItem) => <AdminProductCard product={item} key={item.product._id}/>)}
        </div>
    </div>
  )
}

export default ShowAllProducts
