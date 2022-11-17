import { useEffect, useState} from 'react';
import IProduct from '../assets/models/IProduct';
import ICartItem from '../assets/models/useShoppingContextModels/ICartItem';

// If this site would have been to a customer. 
// I would have made different methods for each fetch to get different cards corresponding to each section.
export const UseGetFeaturedProducts = (cardAmount:number) => {

    const [isReady, setIsReady] = useState<boolean>(false);
    const [featuredProducts, setFeaturedProducts] = useState<IProduct[]>([])

    //useEffect to fetch from api
    useEffect (() => {
        const fetchFeaturedData = async () => {
            let result = await fetch(`https://win22-webapi.azurewebsites.net/api/products?take=${cardAmount}`)
            setFeaturedProducts(await result.json());
            setIsReady(true)
        }
        fetchFeaturedData();
        
    },[cardAmount])

    const [featuredCartItems, setFeaturedCartItems] = useState<ICartItem[]>([])

    //useEffect to create ICartItems from result from api 
    useEffect(() => {
        if(isReady === false){
            return;
        }

        let cartItems = featuredProducts.map(p =>  {
            let cartItem: ICartItem = {
                quantity: 0,
                product: p
            } 

            return cartItem;
        })

        setFeaturedCartItems(cartItems)

    }, [isReady])

  return featuredCartItems
}

export default UseGetFeaturedProducts