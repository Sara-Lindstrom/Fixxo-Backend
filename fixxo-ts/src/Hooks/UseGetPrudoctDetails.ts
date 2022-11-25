import { useEffect, useState} from 'react';
import IProduct from '../assets/models/IProduct';


export const UseGetProduct = (id:string) => {
    const [product, setProduct] = useState<IProduct|null>(null)

    useEffect(() => {
        const fetchData = async () => {
            const result = await fetch(`https://win22-webapi.azurewebsites.net/api/products/${id}`)
            setProduct(await result.json())
        }
        fetchData()
    }, [id])

    return product
}

export default UseGetProduct