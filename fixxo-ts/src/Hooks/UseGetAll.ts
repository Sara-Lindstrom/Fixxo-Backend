import { useContext, useEffect, useState } from 'react'
import IProductContext from '../assets/models/AdminModels/IProductContext'
import IProduct from '../assets/models/IProduct'
import ICartItem from '../assets/models/useShoppingContextModels/ICartItem'
import { ProductContext } from '../components/Admin/ProductContext'

export const UseGetAll = () => {
    const {baseUrl, hasChanged, setHasChanged} = useContext(ProductContext) as IProductContext
    
    const [allEditableItems, setAllEditableItems] = useState<ICartItem[]>([])
    const [editableProducts, setEditableProducts] = useState<IProduct[]>([])

    useEffect(() => {
        
        // get all
        const getAll = async () => {
            const result = await fetch (`${baseUrl}`)

            if (result.status===200){
                setEditableProducts(await result.json())
            }
            else{
                console.log('error' + result.status)
            }
        }
        getAll()

        setHasChanged(false)

    }, [hasChanged])

    useEffect(()=>{

        let cartItems = editableProducts.map(p => {
            let cartitem: ICartItem = {
                quantity:0,
                product:p
            }
            return cartitem;
        })

        setAllEditableItems(cartItems)

    },[editableProducts])

    return allEditableItems

}

export default UseGetAll
