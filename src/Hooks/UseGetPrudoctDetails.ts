import { useEffect, useState} from 'react';


export const UseGetProduct = (id) => {
    const [product, setProduct] = useState({})

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