import React from 'react'
import { useState, useContext, createContext } from 'react'
import IProviderProps from '../../assets/models/IProviderProps'
import IProduct from '../../assets/models/IProduct'
import IProductContext from '../../assets/models/AdminModels/IProductContext'
import INewProduct from '../../assets/models/AdminModels/INewProduct'

// access
export const ProductContext = createContext<IProductContext | null>(null)

export const UseUserContext = () => {
return useContext (ProductContext)
}

// context functions
const ProductContextProvider = ({children}:IProviderProps) => {

    const defaultProduct:IProduct = {
        _id: "",
        name: "",
        tag:"",
        description: "",
        category: "",
        price: 0,
        rating: 0,
        imageName: ""
    } 

    // variables and Hooks
    const [apiProduct, setApiProduct] = useState<IProduct>(defaultProduct)
    const [submitted, setSubmitted] = useState<Boolean|null>(null)
    const [hasChanged, setHasChanged] = useState(false)

    const baseUrl:string = 'http://localhost:5000/api/products'

    // functions
    // create
    const create = async (newProduct:INewProduct, e: React.FormEvent) => {
        e.preventDefault()
        // let submitted:Boolean = false

        const result = await fetch(`${baseUrl}` ,{
            method:'post',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }, 
            body: JSON.stringify(newProduct)           
        })

        if(result.status === 201){
            setApiProduct(defaultProduct)
            setSubmitted(true)
            setHasChanged(true)
        }
        else {
            console.log('error' + result.status)
            setSubmitted(false)
        }
    }

    // uppdate
    const update = async (id:string, e:React.FormEvent) => {
        e.preventDefault()

        const result = await fetch (`${baseUrl}/${id}`,{
            method:'put',
            headers: {
                'Content-Type':'application/json',
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            body:JSON.stringify(apiProduct)
        })

        if (result.status === 200){
            setApiProduct(await result.json())
            setHasChanged(true)
        }
        else{
            console.log('error' + result.status)           
        }
    }

    // remove
    const remove = async (id:string) => {
        
        const result = await fetch (`${baseUrl}/${id}`, {
            method:'delete',
            headers: {
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        })

        if (result.status === 200){
            setApiProduct(defaultProduct)
            setHasChanged(true)
        }
        else{
            console.log('error' + result.status)
        }
    }

  // returning values of functions
  return (
    <ProductContext.Provider value={{apiProduct, setApiProduct, defaultProduct, create, update, remove, submitted, baseUrl, hasChanged, setHasChanged}}>
        {children}
    </ProductContext.Provider>
  )
}

export default ProductContextProvider