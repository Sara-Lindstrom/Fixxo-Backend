import { useEffect, useState} from 'react';
import ICartItem from '../assets/models/useShoppingContextModels/ICartItem';


export const UseGetAllProducts = () => {

    const [allProducts, setAllProducts] = useState<ICartItem[]|null>(null)

        useEffect (() => {
        const fetchAllData = async () => {
            let result = await fetch('https://win22-webapi.azurewebsites.net/api/products')
            setAllProducts(await result.json())
        }
        fetchAllData()

        }, [])

  return allProducts
}

export default UseGetAllProducts