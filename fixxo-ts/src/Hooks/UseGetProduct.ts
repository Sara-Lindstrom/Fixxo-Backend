import React, { useContext, useEffect, useState } from 'react'
import IProductContext from '../assets/models/AdminModels/IProductContext'
import IProduct from '../assets/models/IProduct'
import { ProductContext } from '../components/Admin/ProductContext'

const UseGetProduct = (articleNumber:string) => {
    
    const { defaultProduct} = useContext(ProductContext) as IProductContext

    
    const [chosenProduct, setChosenProduct] = useState<IProduct>(defaultProduct)

    useEffect(() => {
        // get
        const get = async () => {
            const result = await fetch (`http://localhost:5000/api/products/${articleNumber}`)
    
            if (result.status === 200){
                setChosenProduct(await result.json())
            }
            else{
                console.log("error" + result.status)
            }
        }
        get()

    }, [articleNumber])

    return chosenProduct
}

export default UseGetProduct