import ICartItem from "./ICartItem";
import IProduct from "../IProduct";

export default interface IShoppingCartProviderReturn{
    cartItem: ICartItem[];
    cartQuantity: number;
    getItemQuantity: (clickedProduct: IProduct) => number;
    incrementQuantity:(clickedProduct: ICartItem) => void;
    decrementQuantity:(clickedProduct: ICartItem) => void;
    removeItem:(clickedProduct: ICartItem) => void;
}

