import { useContext, useEffect, useState } from "react"
import IProductContext from "../assets/models/AdminModels/IProductContext"
import IProduct from "../assets/models/IProduct"
import ICartItem from "../assets/models/useShoppingContextModels/ICartItem"
import { ProductContext } from "../components/Admin/ProductContext"

export const UseGetFeatured = (tag:string, amount:number) => {
    const {baseUrl} = useContext(ProductContext) as IProductContext

    const [amountItems, setAmountItems] = useState<IProduct[]>([])
    const [amountProducts, setAmountProducts] = useState<ICartItem[]>([])

    useEffect(() => {
        // http://localhost:5000/api/products/take/:tag/:amount
        // getAmount
        const getAmount = async () => {
            const result = await fetch (`${baseUrl}/take/${tag}/${amount}`)
    
            if (result.status===201){
                setAmountItems(await result.json())
            }
            else{
                console.log('error' + result.status)
            }
        }
        getAmount()

    }, [amount])

    useEffect(() => {

        let cartItems = amountItems.map(p => {
            let cartitem: ICartItem = {
                quantity:0,
                product:p
            }
            return cartitem;
        })

        setAmountProducts(cartItems)
    
    }, [amountItems])


  return amountProducts
}

export default UseGetFeatured