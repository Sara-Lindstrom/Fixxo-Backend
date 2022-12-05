import IProduct from "../IProduct"
import INewProduct from "./INewProduct"

export default interface IProductContext {
    apiProduct: IProduct
    setApiProduct : React.Dispatch<React.SetStateAction<IProduct>>
    defaultProduct:IProduct 
    submitted:Boolean|null
    baseUrl:string
    hasChanged:boolean
    setHasChanged : React.Dispatch<React.SetStateAction<boolean>>


    create: (newProduct:INewProduct, e: React.FormEvent) => void
    update: (id:string, e: React.FormEvent) => void
    remove: (id:string) => void
}
