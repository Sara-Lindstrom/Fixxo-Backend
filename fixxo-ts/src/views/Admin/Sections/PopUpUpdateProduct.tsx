import React from 'react'
import { useContext, useEffect, useState } from 'react'
import INewProduct from '../../../assets/models/AdminModels/INewProduct';
import IProductContext from '../../../assets/models/AdminModels/IProductContext';
import { ProductContext } from '../../../components/Admin/ProductContext';
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css';
import AddedProductMessage from './AddedProductMessage';

const PopUpUpdateProduct:React.FC<{articleNumber:number, show:boolean}> = ({articleNumber, show}) => {

    const {get, chosenproduct} = useContext(ProductContext) as IProductContext
    
    useEffect(() => {
        if(show==true){
        get(articleNumber)
        }
        
    }, [show])

    const defaultCategory:string = 'Category'
    console.log(articleNumber)

    const defaultAddedProduct:INewProduct = {
        name: chosenproduct.name,
        description: chosenproduct.description,
        category: chosenproduct.category,
        price: chosenproduct.price,
        imageName: chosenproduct.imageName
    }

    const categoryDropdownOptions = [
        'Tops','Pants','Dresses','Shoes','Accessories'
    ]

    // Hooks
    const {create} = useContext(ProductContext) as IProductContext

    const [UpdateProduct, setUpdateProduct] = useState<INewProduct>(defaultAddedProduct)

    const [nameError, setNameError] = useState('');
    const [priceError, setPriceError] = useState('');
    const [categoryError, setCategoryError] = useState('');
    const [imageError, setImageError] = useState('');
    const [descriptionError, setDescriptionError] = useState('');


    // validate name and set errors
    const ValidateName = () => {
        let error = '';
        const regExName = /^[a-zA-ZäöåÄÖÅ ]+$/;

        if (UpdateProduct.name === ''){
            error = "You need to enter a name"
        }
        else if (UpdateProduct.name.length < 2){
            error ="Name must be at least two characters long"
        }
        else if (!regExName.test(UpdateProduct.name)){
            error = "The name can only contain letters"
        }

        setNameError(error);

        return error === '' ? true : false;
    }

    // validate price and set errors
    const ValidatePrice = () => {
        let error = '';

        if (UpdateProduct.price == 0 ){
            error = "You need to enter a price"
        }
        else if (UpdateProduct.price < 0){
            error ="Price can not be negative"
        }

        setPriceError(error);

        return error === '' ? true : false;
    }

    // validate category and set errors
    const ValidateCategory = () => {
        let error = '';

        if (UpdateProduct.category === defaultCategory){
            error = "Choose a Category"
        }

        setCategoryError(error);

        return error === '' ? true : false;
    }

    // validate img and set errors
    const ValidateImg = () => {
        let error = '';
        const regExName = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/;

        if (!regExName.test(UpdateProduct.imageName)){
            error = "You need a valid Url:adress to the Image"
        }

        setImageError(error);

        return error === '' ? true : false;
    }

    // validate comment and set errors
    const ValidateDescription = () => {
        let error = '';

        if (UpdateProduct.description === ''){
            error = "You need to enter a Description"
        }
        else if (UpdateProduct.description.length < 10){
            error = "Your Description must be at least ten characters long"
        }

        setDescriptionError(error);

        return error === '' ? true : false;
    }
        
    // handle change for writing out inputs
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {id, value} = e.currentTarget

        setUpdateProduct ({...UpdateProduct, [id]: value})  
    }  

    const changeCategoryOption = (option: any) => {
        setUpdateProduct ({...UpdateProduct, category: option.value})
    } 

    // handle change for writing out textArea
    const handleChangeTextArea = async(e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const {id, value} = e.currentTarget
        setUpdateProduct ({...UpdateProduct, [id]: value})
    }  

    // validate if input is error free
    const ValidateOnSubmit = (e: React.FormEvent) => {
        let validName = ValidateName();
        let validPrice = ValidatePrice();
        let validCategory =  ValidateCategory();
        let validImg = ValidateImg();
        let validDescription =  ValidateDescription();
        
        e.preventDefault()

        if(validName === true && validPrice === true && validCategory === true && validImg === true && validDescription === true){

            // reset and commit product

            setNameError('');
            setPriceError('');
            setCategoryError('');
            setImageError('');
            setDescriptionError('');

            create(UpdateProduct, e)
            setUpdateProduct (defaultAddedProduct)

        }
    };

  return (
    <>
        <div  className={`${show === true ? "pop-up-background" : "d-none"}`}></div>
        {
            show &&

            <div className='pop-up container'>
                <div className='pop-up-inner'>
                    <button className='round-button' onClick={()=>show=false}><i className="fa-regular fa-xmark"></i></button>
                    <AddedProductMessage/>
                    <form onSubmit={ValidateOnSubmit} noValidate className='new-product-form'>

                        <div className='new-product-title'>
                            <h2 className="admin-title">Update Product</h2>    
                        </div>

                        <div className='new-product-name'>
                            <input className={`${nameError === "" ? "input-padding" : "input-padding error"}`} value={UpdateProduct.name} id="name" type="text" placeholder='Product Name' onKeyUp={ValidateName} onChange={handleChange}/>
                            <div className="error-message">{nameError}</div>
                        </div>

                        <div className='new-product-price'>
                            <input className={`${priceError === "" ? "input-padding" : "input-padding error"}`} value={UpdateProduct.price} id="price" type="number" placeholder='Price' onKeyUp={ValidatePrice} onChange={handleChange}/>
                            <div className="error-message">{priceError}</div>
                        </div>

                        <div className='new-product-category'>
                            <Dropdown className={`${categoryError === "" ? "" : "error"}`} options={categoryDropdownOptions} onChange={(option) => changeCategoryOption(option)} value={UpdateProduct.category} placeholder="Category"/>
                            <div className="error-message">{categoryError}</div>
                        </div>

                        <div className='new-product-image'>
                            <input className={`${imageError === "" ? "input-padding" : "input-padding error"}`} value={UpdateProduct.imageName} id="imageName" type="text" placeholder='Image Link' onChange={handleChange}  onKeyUp={ValidateImg}/>
                            <div className="error-message">{imageError}</div>
                            <img className={`${UpdateProduct.imageName==="" ? "" : "image-show" }`} src={UpdateProduct.imageName} alt={UpdateProduct.name}/>
                        </div>

                        <div className='new-product-description'>
                            <textarea className={`${descriptionError === "" ? "input-padding" : "input-padding error"}`} value={UpdateProduct.description} id="description" placeholder='Description' onChange={handleChangeTextArea} onKeyUp={ValidateDescription}/>
                            <div className="error-message">{descriptionError}</div>
                        </div>

                        <div className='new-product-submit'>
                            <button type="submit" className="button theme-button">Add New Product</button>
                        </div>
                    </form>
                </div> 
            </div>
        }
        <div  className={`${show === true ? "pop-up-background-bottom" : "d-none"}`}></div>
    </> 
  )
}

export default PopUpUpdateProduct