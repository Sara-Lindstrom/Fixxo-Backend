import React, { useContext, useState } from 'react'
import { ProductContext } from '../../../components/Admin/ProductContext'
import IProductContext from '../../../assets/models/AdminModels/IProductContext'
import INewProduct from '../../../assets/models/AdminModels/INewProduct'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css';
import AddedProductMessage from './AddedProductMessage'


// variables
const defaultCategory:string = 'Category'
const defaultTag:string = 'Tag'

const defaultAddedProduct:INewProduct = {
    name: "",
    description: "",
    category: defaultCategory,
    tag: defaultTag,
    price: 0,
    imageName: "",
}

const categoryDropdownOptions = [
    'Tops','Dresses','Accessories','Jackets','Shirts','Hats','Child'
]

const tagDropdownOptions = [
    'featured', 'specials', 'specialExtended', 'best', 'latest', 'reacted'
]

const AddNewProduct:React.FC = () => {
    // Hooks
    const {create} = useContext(ProductContext) as IProductContext

    const [newProduct, setNewProduct] = useState<INewProduct>(defaultAddedProduct)

    const [nameError, setNameError] = useState('');
    const [priceError, setPriceError] = useState('');
    const [categoryError, setCategoryError] = useState('');
    const [tagError, setTagError] = useState('');
    const [imageError, setImageError] = useState('');
    const [descriptionError, setDescriptionError] = useState('');

    // validate name and set errors
    const ValidateName = () => {
        let error = '';
        const regExName = /^[a-zA-ZäöåÄÖÅ ]+$/;

        if (newProduct.name === ''){
            error = "You need to enter a name"
        }
        else if (newProduct.name.length < 2){
            error ="Name must be at least two characters long"
        }
        else if (!regExName.test(newProduct.name)){
            error = "The name can only contain letters"
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
            error ="Price can not be negative"
        }

        setPriceError(error);

        return error === '' ? true : false;
    }

    // validate category and set errors
    const ValidateCategory = () => {
        let error = '';

        if (newProduct.category === defaultCategory){
            error = "Choose a Category"
        }

        setCategoryError(error);

        return error === '' ? true : false;
    }

    // validate category and set errors
    const ValidateTag = () => {
        let error = '';

        if (newProduct.category === defaultCategory){
            error = "Choose a Tag"
        }

        setTagError(error);

        return error === '' ? true : false;
    }

    // validate img and set errors
    const ValidateImg = () => {
        let error = '';
        const regExName = /^(?:(?:https?:)\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/;

        if (!regExName.test(newProduct.imageName)){
            error = "The Image Url is not valid"
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
            error = "Your Description must be at least ten characters long"
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
    } 

    const changeTagOption = (option: any) => {
        setNewProduct ({...newProduct, tag: option.value})
    } 

    // handle change for writing out textArea
    const handleChangeTextArea = async(e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const {id, value} = e.currentTarget
        setNewProduct ({...newProduct, [id]: value})
    }  

    // validate if input is error free
    const ValidateOnSubmit = (e: React.FormEvent) => {
        let validName = ValidateName();
        let validPrice = ValidatePrice();
        let validCategory =  ValidateCategory();
        let validImg = ValidateImg();
        let validDescription =  ValidateDescription();
        let validateTag = ValidateTag();
        
        e.preventDefault()

        if(validName === true && validPrice === true && validCategory === true && validImg === true && validDescription === true && validateTag == true){

            // reset and commit product

            setNameError('');
            setPriceError('');
            setCategoryError('');
            setImageError('');
            setDescriptionError('');

            create(newProduct, e)
            setNewProduct (defaultAddedProduct)
        }
    };


  return (
    <div className='container'>
        <AddedProductMessage message="Added"/>
        <form onSubmit={ValidateOnSubmit} noValidate className='new-product-form'>
            <div className='new-product-title'>
                <h2 className="admin-title">Add New Product</h2>    
            </div>

            <div className='new-product-name'>
                <input className={`${nameError === "" ? "input-padding" : "input-padding error"}`} value={newProduct.name} id="name" type="text" placeholder='Product Name' onKeyUp={ValidateName} onChange={handleChange}/>
                <div className="error-message">{nameError}</div>
            </div>

            <div className='new-product-tag'>
                <Dropdown className={`${tagError === "" ? "" : "error"}`} options={tagDropdownOptions} onChange={(option) => changeTagOption(option) } value={newProduct.tag} placeholder="Tag"/>
                <div className="error-message">{tagError}</div>
            </div>

            <div className='new-product-price'>
                <input className={`${priceError === "" ? "input-padding input-image" : "input-padding input-image error"}`} value={newProduct.price} id="price" type="number" placeholder='Price' onKeyUp={ValidatePrice} onChange={handleChange}/>
                <div className="error-message">{priceError}</div>
            </div>

            <div className='new-product-category'>
                <Dropdown className={`${categoryError === "" ? "" : "error"}`} options={categoryDropdownOptions} onChange={(option) => changeCategoryOption(option) } value={newProduct.category} placeholder="Category"/>
                <div className="error-message">{categoryError}</div>
            </div>

            <div className='new-product-image'>
                <input className={`${imageError === "" ? "input-padding" : "input-padding error"}`} value={newProduct.imageName} id="imageName" type="text" placeholder='Image Link' onChange={handleChange}  onKeyUp={ValidateImg}/>
                <div className="error-message">{imageError}</div>
                <img className="image-show" src={newProduct.imageName} alt={newProduct.name}/>
            </div>

            <div className='new-product-description'>
                <textarea className={`${descriptionError === "" ? "input-padding" : "input-padding error"}`} value={newProduct.description} id="description" placeholder='Description' onChange={handleChangeTextArea} onKeyUp={ValidateDescription}/>
                <div className="error-message">{descriptionError}</div>
            </div>

            <div className='new-product-submit'>
                <button type="submit" className="button theme-button">Add New Product</button>
            </div>
        </form>
        <hr className="my-5"/>
    </div>
    
  )
}




export default AddNewProduct