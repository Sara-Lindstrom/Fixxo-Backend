import React, { useContext, useState } from 'react'
import { ProductContext } from '../../../components/Admin/ProductContext'
import IProductContext from '../../../assets/models/AdminModels/IProductContext'
import IAddedProduct from '../../../assets/models/AdminModels/IAddedProduct'
import INewProduct from '../../../assets/models/AdminModels/INewProduct'


const defaultAddedProduct:IAddedProduct = {
    name: "",
    description: "",
    category: "",
    price: 0,
    imageName: ""
}


const AddNewProduct = () => {
    const {addedProduct, setAddedProduct, create} = useContext(ProductContext) as IProductContext

    const [newProduct, setNewProduct] = useState<INewProduct>(defaultAddedProduct)
    const [canSubmit, setCanSubmit] = useState (false)
    const [categoryPlacehoderOption, setCategoryPlacehoderOption] = useState('Category')

    const [nameError, setNameError] = useState('');
    const [priceError, setPriceError] = useState('');
    const [categoryError, setCategoryError] = useState('');
    const [imageError, setImageError] = useState('');
    const [descriptionError, setDescriptionError] = useState('');


    // validate name and set errors
    const ValidateName = () => {
        let error = '';
        const regExName = /^[a-zA-ZäöåÄÖÅ]+$/;

        if (newProduct.name === ''){
            error = "You need to enter a name"
        }
        else if (newProduct.name.length < 2){
            error ="your name must be at least two characters long"
        }
        else if (!regExName.test(newProduct.name)){
            error = "your name can only contain letters"
        }

        setNameError(error);

        return error === '' ? true : false;
    }

    // validate price and set errors
    const ValidatePrice = () => {
        let error = '';

        if (newProduct.price == 0 ){
            error = "You need to enter a price"
        }
        else if (newProduct.price < 0){
            error ="Your Price can not be a negative number"
        }

        setPriceError(error);

        return error === '' ? true : false;
    }

        
    // handle change for writing out inputs
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {id, value} = e.currentTarget
        setNewProduct ({...newProduct, [id]: value})
    }  

    const handleChangecategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const {id, value} = e.currentTarget
        setNewProduct ({...newProduct, [id]: value})
    }  

    const changeCategoryOption = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        let category:string = e.currentTarget.name
        setCategoryPlacehoderOption(category)
        return categoryPlacehoderOption
      } 

    // handle change for writing out textArea
    const handleChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const {id, value} = e.currentTarget
        setNewProduct ({...newProduct, [id]: value})
    }  


  return (
    <form onSubmit={create} noValidate className='new-product-form'>
        <div className='new-product-title'>
            <h2>Add New Product</h2>    
        </div>

        <div className='new-product-name'>
            <input className={`${nameError === "" ? "" : "error"}`} value={newProduct.name} id="name" type="text" placeholder='Product Name' onKeyUp={ValidateName} onChange={handleChange}/>
            <div className="error-message">{nameError}</div>
        </div>
        <div className='new-product-price'>
            <input className={`${priceError === "" ? "" : "error"}`} value={newProduct.price} id="price" type="number" placeholder='Price' onKeyUp={ValidatePrice} onChange={handleChange}/>
            <div className="error-message">{priceError}</div>
        </div>
        <div className='new-product-category'>
        <button className="dropdown-toggle color-dropdown" type="button" data-bs-toggle="dropdown" aria-expanded="false" >{categoryPlacehoderOption}</button>
                <ul className="dropdown-menu">
                  <li key="Tops"><button className="dropdown-item" onClick={changeCategoryOption} name="Tops">Tops</button></li>
                  <li key="Pants"><button className="dropdown-item" onClick={changeCategoryOption} name="Pants">Pants</button></li>
                  <li key="Dresses"><button className="dropdown-item" onClick={changeCategoryOption} name="Dresses">Dresses</button></li>
                  <li key="Shoes"><button className="dropdown-item" onClick={changeCategoryOption} name="Shoes">Shoes</button></li>
                  <li key="Accessories"><button className="dropdown-item" onClick={changeCategoryOption} name="Accessories">Accessories</button></li>
                </ul>
            <div className="error-message">{categoryError}</div>
        </div>
        <div>
            <input className={`${imageError === "" ? "" : "error"}`} value={newProduct.imageName} type="text" placeholder='Image Link' onChange={handleChange} />
            <div className="error-message">{imageError}</div>
        </div>
        <div>
            <input className={`${descriptionError === "" ? "" : "error"}`} value={newProduct.description}  type="textarea" placeholder='Description' onChange={handleChange}/>
            <div className="error-message">{descriptionError}</div>
        </div>
        <div className='new-product-submit'>
            <button type="submit" className="button theme-button">Add New Product</button>
        </div>
    </form>

    // name: onChange={(e) => setAddedProduct?.({...addedProduct, name:e.target.value})} 
    // price: onChange={(e) => setAddedProduct?.({...addedProduct, price:e.target.valueAsNumber})} 
    // category: onChange={(e) => setAddedProduct?.({...addedProduct, category:e.target.value})}
    // imageName: onChange={(e) => setAddedProduct?.({...addedProduct, imageName:e.target.value})}
    // description: onChange={(e) => setAddedProduct?.({...addedProduct, description:e.target.value})}
  )
}




export default AddNewProduct