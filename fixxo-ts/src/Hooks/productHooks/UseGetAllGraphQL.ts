import { useQuery, gql } from "@apollo/client"
import { useEffect, useState } from "react"
import IProduct from "../../assets/models/IProduct"
import ICartItem from "../../assets/models/useShoppingContextModels/ICartItem"

const getProductsQuery = gql`{products{_id, name, tag, description, category, price, rating, imageName}}`

export const UseGetAllGraphQL = () => {

  const [apiProducts, setApiProducts] = useState([])
  const [displayProducts, setDisplayProducts] = useState<ICartItem[]>([])
  const {loading, error, data} = useQuery(getProductsQuery)


  const populateProducts = async () => {

    await fetch(data)
      if (loading){
          console.log('loading...')
      }
      if (error){
          console.log('error...')
      }
  
      setApiProducts(await (data.products))
      console.log(apiProducts)
    }

  populateProducts()


  useEffect(()=>{

    let cartItems = apiProducts.map(p => {
        let cartitem:ICartItem = {
            quantity:0,
            product:p
        }
        return cartitem;
    })

    setDisplayProducts(cartItems)

  },[apiProducts])

  return displayProducts
 
}

export default UseGetAllGraphQL