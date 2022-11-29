import IProduct from "../IProduct"
import ICartItem from "../useShoppingContextModels/ICartItem"
import INewProduct from "./INewProduct"

export default interface IProductContext {
    editProduct: IProduct
    setEditProduct : React.Dispatch<React.SetStateAction<IProduct>>
    editableProducts: IProduct[]
    allEditableItems:ICartItem[]
    chosenproduct:IProduct
    amountProducts:ICartItem[]
    submitted:Boolean|null
    baseUrl:string
    hasChanged:boolean
    setHasChanged : React.Dispatch<React.SetStateAction<boolean>>


    create: (newProduct:INewProduct, e: React.FormEvent) => void
    get: (id:number) => void
    getAmount:(amount:number) => void
    update: (id:number, e: React.FormEvent) => void
    remove: (id:number) => void
}