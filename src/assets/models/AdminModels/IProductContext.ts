import IProduct from "../IProduct"

export default interface IUserContext {
    editProduct: IProduct
    setEditProduct : React.Dispatch<React.SetStateAction<IProduct>>
    editableProducts: IProduct[]

    create: (e: React.FormEvent) => void
    get: (id:number) => void
    getAll: () => void
    update: (id:number, e: React.FormEvent) => void
    remove: (id:number) => void
}