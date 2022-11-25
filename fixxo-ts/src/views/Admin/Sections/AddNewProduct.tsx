import React, { useContext, useState } from 'react'
import { ProductContext } from '../../../components/Admin/ProductContext'
import IProductContext from '../../../assets/models/AdminModels/IProductContext'
import IAddedProduct from '../../../assets/models/AdminModels/IAddedProduct'
import INewProduct from '../../../assets/models/AdminModels/INewProduct'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css';


// variables
const defaultCategory:string = 'Category'

const defaultAddedProduct:IAddedProduct = {
    name: "",
    description: "",
    category: defaultCategory,
    price: 0,
    imageName: ""
}

const categoryDropdownOptions = [
    'Tops','Pants','Dresses','Shoes','Accessories'
]



const AddNewProduct = () => {
    // Hooks
    const {setAddedProduct, create} = useContext(ProductContext) as IProductContext

    const [newProduct, setNewProduct] = useState<INewProduct>(defaultAddedProduct)
    const [canSubmit, setCanSubmit] = useState (false)

    const [nameError, setNameError] = useState('');
    const [priceError, setPriceError] = useState('');
    const [categoryError, setCategoryError] = useState('');
    const [imageError, setImageError] = useState('');
    const [descriptionError, setDescriptionError] = useState('');

    const [failedSubmit, setFailedSubmit] = useState (false);


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

    // validate category and set errors
    const ValidateCategory = () => {
        let error = '';

        if (newProduct.category === defaultCategory){
            error = "You need to choose a Category"
        }

        setCategoryError(error);

        return error === '' ? true : false;
    }

    // validate img and set errors
    const ValidateImg = () => {
        let error = '';
        const regExName = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/;

        if (!regExName.test(newProduct.imageName)){
            error = "You need a valid Url:adress to the Image"
        }

        setImageError(error);

        return error === '' ? true : false;
    }

    // validate comment and set errors
    const ValidateDescription = () => {
        let error = '';

        if (newProduct.description === ''){
            error = "You need to enter a Description"
        }
        else if (newProduct.description.length < 10){
            error = "Your Description need to be at least ten characters long"
        }

        setDescriptionError(error);

        return error === '' ? true : false;
    }



        
    // handle change for writing out inputs
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {id, value} = e.currentTarget

        setNewProduct ({...newProduct, [id]: value})  
    }  

    const changeCategoryOption = (option: any) => {
        setNewProduct ({...newProduct, category: option.value})

        ValidateCategory()
    } 

    // handle change for writing out textArea
    const handleChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const {id, value} = e.currentTarget
        setNewProduct ({...newProduct, [id]: value})
    }  

    // validate if input is error free
    const ValidateOnSubmit = async (e: React.FormEvent) => {
        let validName = ValidateName();
        let validPrice = ValidatePrice();
        let validCategory =  ValidateCategory();
        let validImg = ValidateImg();
        let validDescription =  ValidateDescription();

        setFailedSubmit (false)
        
        e.preventDefault()

        if(validName === true && validPrice === true && validCategory === true && validImg === true && validDescription === true){

            // reset and commit product
            setAddedProduct(newProduct)

            setNewProduct (defaultAddedProduct)

            setNameError('');
            setPriceError('');
            setCategoryError('');
            setImageError('');
            setDescriptionError('');

            create(e)

            // commmit to api return message
            // if (create(e)) {
            //     setCanSubmit (true)
            //     setFailedSubmit (false)
            // }
            // else {
            //     setCanSubmit (false)
            //     setFailedSubmit (true)
            // }

        }

        else{
            setCanSubmit (false)
        }
    };


  return (
    <form onSubmit={ValidateOnSubmit} noValidate className='new-product-form container'>
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
            <Dropdown options={categoryDropdownOptions} onChange={(option) => changeCategoryOption(option) } value={newProduct.category} placeholder="Category"/>
            <div className="error-message">{categoryError}</div>
        </div>

        <div>
            <input className={`${imageError === "" ? "" : "error"}`} value={newProduct.imageName} id="imageName" type="text" placeholder='Image Link' onChange={handleChange}  onKeyUp={ValidateImg}/>
            <div className="error-message">{imageError}</div>
            <img src={newProduct.imageName} alt={newProduct.name}/>
        </div>

        <div>
            <textarea className={`${descriptionError === "" ? "" : "error"}`} value={newProduct.description} id="description" placeholder='Description' onChange={handleChangeTextArea} onKeyUp={ValidateDescription}/>
            <div className="error-message">{descriptionError}</div>
        </div>

        <div className='new-product-submit'>
            <button type="submit" className="button theme-button">Add New Product</button>
        </div>
    </form>
  )
}




export default AddNewProduct