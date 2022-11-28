import React from 'react'
import { useState, useContext, createContext } from 'react'
import IProviderProps from '../../assets/models/IProviderProps'
import IProduct from '../../assets/models/IProduct'
import IProductContext from '../../assets/models/AdminModels/IProductContext'
import IAddedProduct from '../../assets/models/AdminModels/IAddedProduct'
import ICartItem from '../../assets/models/useShoppingContextModels/ICartItem'
import INewProduct from '../../assets/models/AdminModels/INewProduct'

// access
export const ProductContext = createContext<IProductContext | null>(null)

export const UseUserContext = () => {
return useContext (ProductContext)
}

const defaultProduct:IProduct = {
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
    const [editableProducts, setEditableProducts] = useState<IProduct[]>([])
    const [allEditableItems, setAllEditableItems] = useState<ICartItem[]>([])

    const baseUrl:string = 'http://localhost:5000/api/products'

    // functions
    const create = async (newProduct:INewProduct, e: React.FormEvent) => {
        e.preventDefault()

        const result = await fetch(`${baseUrl}` ,{
            method:'post',
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify(newProduct)           
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

            let cartItems = editableProducts.map(p => {
                let cartitem: ICartItem = {
                    quantity:0,
                    product:p
                }
                return cartitem;
            })
    
            setAllEditableItems(cartItems)
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
    <ProductContext.Provider value={{editProduct, setEditProduct, editableProducts, allEditableItems, create, get, getAll, update, remove}}>
        {children}
    </ProductContext.Provider>
  )
}

export default ProductContextProvider