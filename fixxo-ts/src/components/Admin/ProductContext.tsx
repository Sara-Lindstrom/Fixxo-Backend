import React from 'react'
import { useState, useContext, createContext } from 'react'
import IProviderProps from '../../assets/models/IProviderProps'
import IProduct from '../../assets/models/IProduct'
import IProductContext from '../../assets/models/AdminModels/IProductContext'
import ICartItem from '../../assets/models/useShoppingContextModels/ICartItem'
import INewProduct from '../../assets/models/AdminModels/INewProduct'

// access
export const ProductContext = createContext<IProductContext | null>(null)

export const UseUserContext = () => {
return useContext (ProductContext)
}

const defaultProduct:IProduct = {
    articleNumber: 0,
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
    const [chosenproduct, setChosenproduct] = useState<IProduct>(defaultProduct)
    const [amountItems, setAmountItems] = useState<IProduct[]>([])
    const [allEditableItems, setAllEditableItems] = useState<ICartItem[]>([])
    const [amountProducts, setAmountProducts] = useState<ICartItem[]>([])
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
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify(newProduct)           
        })

        if(result.status === 201){
            setEditProduct(defaultProduct)
            setSubmitted(true)
            setHasChanged(true)
        }
        else {
            console.log('error' + result.status)
            setSubmitted(false)
        }
    }

    // get
    const get = async (id:number) => {
        const result = await fetch (`${baseUrl}/${id}`)

        if (result.status === 200){
            setChosenproduct(await result.json())
        }
        else{
            console.log("error" + result.status)
        }
    }


    // get amount
    const getAmount = async (amount:number) => {
        const result = await fetch (`${baseUrl}/take=${amount}`)

        if (result.status===200){
            setAmountItems(await result.json())

            let cartItems = amountItems.map(p => {
                let cartitem: ICartItem = {
                    quantity:0,
                    product:p
                }
                return cartitem;
            })
    
            setAmountProducts(cartItems)
        }
        else{
            console.log('error' + result.status)
        }
    }

    // uppdate
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
            setHasChanged(true)
        }
        else{
            console.log('error' + result.status)           
        }
    }

    // remove
    const remove = async (id:number) => {
        
        const result = await fetch (`${baseUrl}/${id}`, {
            method:'delete'
        })

        if (result.status === 204){
            setEditProduct(defaultProduct)
            setHasChanged(true)
        }
        else{
            console.log('error' + result.status)
        }
    }

  // returning values of functions
  return (
    <ProductContext.Provider value={{editProduct, setEditProduct, editableProducts, allEditableItems, chosenproduct, amountProducts, create, get, getAmount, update, remove, submitted, baseUrl, hasChanged, setHasChanged}}>
        {children}
    </ProductContext.Provider>
  )
}

export default ProductContextProvider