import { useEffect, useState} from 'react';


export const UseGetAllProducts = () => {

    const [allProducts, setAllProducts] = useState ([])

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