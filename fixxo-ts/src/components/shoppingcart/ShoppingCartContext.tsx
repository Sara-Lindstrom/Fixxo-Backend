import { createContext , useContext , useState } from "react";
import ShoppingCart from "./ShoppingCart";
import IProviderProps from "../../assets/models/IProviderProps"
import ICartItem from "../../assets/models/useShoppingContextModels/ICartItem";
import IProduct from "../../assets/models/IProduct";
import IShoppingCartProviderReturn from "../../assets/models/useShoppingContextModels/IShoppingCartProviderReturn";

const ShoppingCartContext = createContext<IShoppingCartProviderReturn | null>(null)

export const UseShoppingCart = () => {
    return useContext (ShoppingCartContext)
}

export const ShoppingCartProvider = ({children}: IProviderProps) => {

    const [cartItem, setCartItem] = useState<ICartItem[]>([])

    const cartQuantity = cartItem.reduce(
        (quantity, item) => item.quantity + quantity, 0 
    )

    const getItemQuantity = (clickedProduct:IProduct) => {
        return cartItem.find(item => item.product._id === clickedProduct._id)?.quantity || 0 
    }

    const incrementQuantity = (clickedProduct: ICartItem) => {

        setCartItem (items => {
            if (items.find(item => item.product._id === clickedProduct.product._id) == null){
                return [...items, { product: clickedProduct.product, quantity: 1 }]
            }
            else{
                return items.map(item => {
                    if (item.product._id === clickedProduct.product._id) {
                       return {...item, quantity: item.quantity +1} 
                    }
                    else {
                        return item
                    }
                    
                })
            }
        })
    }

    const decrementQuantity = (clickedProduct: ICartItem) => {

        setCartItem ( items => {
            if (items.find(item => item.product._id === clickedProduct.product._id)?.quantity === 1){
                return items.filter (item => item.product._id !== clickedProduct.product._id)
            }
            else {
                return items.map (item => {
                    if (item.product._id === clickedProduct.product._id) {
                       return {...item, quantity: item.quantity -1} 
                    }
                    else {
                        return item
                    }
                    
                })
            }
        })
    }

    const removeItem = (clickedProduct:ICartItem) => {
        setCartItem ( items => {
            return items.filter (item => item.product._id !== clickedProduct.product._id)
        })
    }


    const result: IShoppingCartProviderReturn = 
    {
        cartItem: cartItem,
        cartQuantity: cartQuantity,
        getItemQuantity: getItemQuantity,
        incrementQuantity:incrementQuantity,
        decrementQuantity:decrementQuantity,
        removeItem:removeItem
    };



    return <ShoppingCartContext.Provider value={result}>
        {children}
        <ShoppingCart/>
    </ShoppingCartContext.Provider>
}