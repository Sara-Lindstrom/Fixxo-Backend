import IProduct from "../IProduct"
import IAddedProduct from "./IAddedProduct"

export default interface IProductContext {
    editProduct: IProduct
    setEditProduct : React.Dispatch<React.SetStateAction<IProduct>>
    editableProducts: IProduct[]
    addedProduct:IAddedProduct
    setAddedProduct:React.Dispatch<React.SetStateAction<IAddedProduct>>

    create: (e: React.FormEvent) => void
    get: (id:number) => void
    getAll: () => void
    update: (id:number, e: React.FormEvent) => void
    remove: (id:number) => void
}