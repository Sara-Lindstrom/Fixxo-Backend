import { useEffect, useState} from 'react';
import IProduct from '../assets/models/IProduct';
import ICartItem from '../assets/models/useShoppingContextModels/ICartItem';


export const UseGetAllProducts = () => {

    const [isReady, setIsReady] = useState<boolean>(false);
    const [allProducts, setAllProducts] = useState<IProduct[]>([])

        useEffect (() => {
        const fetchAllData = async () => {
            let result = await fetch('https://win22-webapi.azurewebsites.net/api/products')
            setAllProducts(await result.json())
            setIsReady(true)
        }
        fetchAllData()

    }, [])
    
    const [allCartItems, setAllCartItems] = useState<ICartItem[]>([])

    // useEffect to create ICartItems from Api result
    useEffect (()=> {
        if (isReady === false){
            return;
        }

        let cartItems = allProducts.map(p => {
            let cartitem: ICartItem = {
                quantity:0,
                product:p
            }
            return cartitem;
        })

        setAllCartItems(cartItems)

    },[isReady])

  return allCartItems
}

export default UseGetAllProducts