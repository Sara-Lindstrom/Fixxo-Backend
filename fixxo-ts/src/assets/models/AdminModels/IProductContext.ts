import IProduct from "../IProduct"
import INewProduct from "./INewProduct"

export default interface IProductContext {
    editProduct: IProduct
    setEditProduct : React.Dispatch<React.SetStateAction<IProduct>>
    defaultProduct:IProduct 
    submitted:Boolean|null
    baseUrl:string
    hasChanged:boolean
    setHasChanged : React.Dispatch<React.SetStateAction<boolean>>


    create: (newProduct:INewProduct, e: React.FormEvent) => void
    update: (id:number, e: React.FormEvent) => void
    remove: (id:number) => void
}
