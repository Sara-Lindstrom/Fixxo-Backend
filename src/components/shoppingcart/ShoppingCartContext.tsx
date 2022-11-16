import { createContext , useContext , useState } from "react";
import ShoppingCart from "./ShoppingCart";
import IShoppingCartProviderProps from "../../assets/models/useShoppingContextModels/IShoppingCartProviderProps"
import ICartItem from "../../assets/models/useShoppingContextModels/ICartItem";
import IProduct from "../../assets/models/IProduct";
import IShoppingCartProviderReturn from "../../assets/models/useShoppingContextModels/IShoppingCartProviderReturn";

const ShoppingCartContext = createContext<IShoppingCartProviderReturn | null>(null)

export const UseShoppingCart = () => {
    return useContext (ShoppingCartContext)
}

export const ShoppingCartProvider = ({children}: IShoppingCartProviderProps) => {

    const [cartItem, setCartItem] = useState<ICartItem[]>([])

    const cartQuantity = cartItem.reduce(
        (quantity, item) => item.quantity + quantity, 0 
    )

    const getItemQuantity = (clickedProduct:IProduct) => {
        return cartItem.find(item => item.product.articleNumber === clickedProduct.articleNumber)?.quantity || 0 
    }

    const incrementQuantity = (clickedProduct: ICartItem) => {

        setCartItem (items => {
            if (items.find(item => item.product.articleNumber === clickedProduct.product.articleNumber) == null){
                return [...items, { product: clickedProduct.product, quantity: 1 }]
            }
            else{
                return items.map(item => {
                    if (item.product.articleNumber === clickedProduct.product.articleNumber) {
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
            if (items.find(item => item.product.articleNumber === clickedProduct.product.articleNumber)?.quantity === 1){
                return items.filter (item => item.product.articleNumber !== clickedProduct.product.articleNumber)
            }
            else {
                return items.map (item => {
                    if (item.product.articleNumber === clickedProduct.product.articleNumber) {
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
            return items.filter (item => item.product.articleNumber !== clickedProduct.product.articleNumber)
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