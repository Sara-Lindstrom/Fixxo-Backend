import IProduct from "../IProduct"
import ICartItem from "../useShoppingContextModels/ICartItem"
import INewProduct from "./INewProduct"

export default interface IProductContext {
    editProduct: IProduct
    setEditProduct : React.Dispatch<React.SetStateAction<IProduct>>
    editableProducts: IProduct[]
    allEditableItems:ICartItem[]
    submitted:Boolean|null

    create: (newProduct:INewProduct, e: React.FormEvent) => void
    get: (id:number) => void
    getAll: () => void
    update: (id:number, e: React.FormEvent) => void
    remove: (id:number) => void
}