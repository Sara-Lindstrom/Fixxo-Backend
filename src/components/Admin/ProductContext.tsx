import React from 'react'
import { useState, useContext, createContext } from 'react'
import IProviderProps from '../../assets/models/IProviderProps'
import IProduct from '../../assets/models/IProduct'
import IProductContext from '../../assets/models/AdminModels/IProductContext'

// access
export const ProductContext = createContext<IProductContext | null>(null)

export const UseUserContext = () => {
return useContext (ProductContext)
}

const defaultProduct = {
    articleNumber: "",
    name: "",
    description: "",
    category: "",
    price: 0,
    rating: 0,
    imageName: ""
}

// context functions
const ProductContextProvider = ({children}:IProviderProps) => {

    // variables and Hooks
    const [editProduct, setEditProduct] = useState<IProduct>(defaultProduct)
    const [editableProducts, setEditableProducts] = useState<IProduct[]|[]>([])

    const baseUrl:string = ""

    // functions
    const create = async (e:React.FormEvent) =>{
        e.preventDefault()

        const result = await fetch(`${baseUrl}` ,{
            method:'post',
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify(editProduct)           
        })

        if(result.status === 201){
            setEditProduct(defaultProduct)
        }
        else {
            console.log('error' + result.status)
        }
    }

    const get = async (id:number) => {
        const result = await fetch (`${baseUrl}/${id}`)

        if (result.status === 200){
            setEditProduct(await result.json())
        }
        else{
            console.log("error" + result.status)
        }
    }

    const getAll = async () => {
        const result = await fetch (`${baseUrl}`)

        if (result.status===200){
            setEditableProducts(await result.json())
        }
        else{
            console.log('error' + result.status)
        }
    }

    const update = async (id:number, e:React.FormEvent) => {
        e.preventDefault()

        const result = await fetch (`${baseUrl}/${id}`,{
            method:'put',
            headers: {
                'Content-Type':'application/json'
            },
            body:JSON.stringify(editProduct)
        })

        if (result.status === 200){
            setEditProduct(await result.json())
        }
        else{
            console.log('error' + result.status)           
        }
    }

    const remove = async (id:number) => {
        
        const result = await fetch (`${baseUrl}/${id}`, {
            method:'delete'
        })

        if (result.status === 204){
            setEditProduct(defaultProduct)
        }
        else{
            console.log('error' + result.status)
        }
    }

  // returning values of functions
  return (
    <ProductContext.Provider value={{editProduct, setEditProduct, editableProducts, create, get, getAll, update, remove}}>
        {children}
    </ProductContext.Provider>
  )
}

export default ProductContextProvider