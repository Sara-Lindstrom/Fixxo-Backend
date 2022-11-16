import { useEffect, useState} from 'react';

// If this site would have been to a customer. 
// I would have made different methods for each fetch to get different cards corresponding to each section.
export const UseGetFeaturedProducts = (cardAmount) => {

    const [featuredProducts, setFeaturedProducts] = useState ([])

    useEffect (() => {
        const fetchFeaturedData = async () => {
            let result = await fetch(`https://win22-webapi.azurewebsites.net/api/products?take=${cardAmount}`)
            setFeaturedProducts(await result.json())
        }
        fetchFeaturedData()
    },[cardAmount])

  return featuredProducts
}

export default UseGetFeaturedProducts