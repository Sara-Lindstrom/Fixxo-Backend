import React, { useEffect } from 'react'
import { useContext, useState } from 'react'
import IProductContext from '../../../assets/models/AdminModels/IProductContext';
import { ProductContext } from '../../../components/Admin/ProductContext';
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css';
import UseGetProduct from '../../../Hooks/productHooks/UseGetProduct';

const PopUpUpdateProduct:React.FC<{_id:string, show:Boolean, setShow:React.Dispatch<React.SetStateAction<Boolean>>}> = ({_id, show, setShow}) => {

    const chosenproduct = UseGetProduct(_id)

    useEffect(() => {
        setApiProduct({
            _id:chosenproduct._id,
            name: chosenproduct.name,
            tag: chosenproduct.tag,
            description: chosenproduct.description,
            category: chosenproduct.category,
            price: chosenproduct.price,
            imageName: chosenproduct.imageName,
            rating:chosenproduct.rating,
        })
    }, [chosenproduct])

    const categoryDropdownOptions = [
        'Tops','Dresses','Accessories','Jackets','Shirts','Hats','Child'
    ]

    const tagDropdownOptions = [
        'featured', 'specials', 'specialExtended', 'best', 'latest', 'reacted'
    ]    

    // Hooks
    const {update, setApiProduct, apiProduct} = useContext(ProductContext) as IProductContext

    const [nameError, setNameError] = useState('');
    const [tagError, setTagError] = useState('');
    const [priceError, setPriceError] = useState('');
    const [categoryError, setCategoryError] = useState('');
    const [imageError, setImageError] = useState('');
    const [descriptionError, setDescriptionError] = useState('');


    // validate name and set errors
    const ValidateName = () => {
        let error = '';
        const regExName = /^[a-zA-ZäöåÄÖÅ ]+$/;

        if (apiProduct.name === ''){
            error = "You need to enter a name"
        }
        else if (apiProduct.name.length < 2){
            error ="Name must be at least two characters long"
        }
        else if (!regExName.test(apiProduct.name)){
            error = "The name can only contain letters"
        }

        setNameError(error);

        return error === '' ? true : false;
    }

    // validate price and set errors
    const ValidatePrice = () => {
        let error = '';

        if (apiProduct.price == 0 ){
            error = "You need to enter a price"
        }
        else if (apiProduct.price < 0){
            error ="Price can not be negative"
        }

        setPriceError(error);

        return error === '' ? true : false;
    }

    // validate img and set errors
    const ValidateImg = () => {
        let error = '';
        const regExName = /^(?:(?:https?:)\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/;

        if (!regExName.test(apiProduct.imageName)){
            error = "The Image Url is not valid"
        }

        setImageError(error);

        return error === '' ? true : false;
    }

    // validate comment and set errors
    const ValidateDescription = () => {
        let error = '';

        if (apiProduct.description === ''){
            error = "You need to enter a Description"
        }
        else if (apiProduct.description.length < 10){
            error = "Your Description must be at least ten characters long"
        }

        setDescriptionError(error);

        return error === '' ? true : false;
    }
        
    // handle change for writing out inputs
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {id, value} = e.currentTarget

        // setUpdateProduct ({...updateProduct, [id]: value})  
        setApiProduct (state => ({...state, [id]: value}))
    }  

    const changeCategoryOption = (option: any) => {
        // setUpdateProduct ({...updateProduct, category: option.value})
        setApiProduct (state => ({...state,  category: option.value}))
    } 
    
    const changeTagOption = (option: any) => {
        // setNewProduct ({...newProduct, tag: option.value})
        setApiProduct (state => ({...state,  tag: option.value}))
    } 

    // handle change for writing out textArea
    const handleChangeTextArea = async(e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const {id, value} = e.currentTarget
        // setUpdateProduct ({...updateProduct, [id]: value})
        setApiProduct (state => ({...state, [id]: value}))
    }  

    // validate if input is error free
    const ValidateOnSubmit = (e: React.FormEvent) => {
        let validName = ValidateName();
        let validPrice = ValidatePrice();
        // let validCategory =  ValidateCategory();
        let validImg = ValidateImg(); 
        let validDescription =  ValidateDescription();
        // let validateTag = ValidateTag();
        
        e.preventDefault()

        if(validName === true && validPrice === true &&  validImg === true && validDescription === true){

            // reset and commit product
            setNameError('');
            setPriceError('');
            setCategoryError('');
            setImageError('');
            setDescriptionError('');

            update(_id, e)

            setShow(false)
        }
    };

  return (
    <>
        {
            show &&
            <div  className="pop-up-container">
                <div  className="pop-up-background"></div>
                    <div className='pop-up container'>
                        <div className='pop-up-inner'>
                            <button className='round-button' onClick={()=> setShow(!show)}><i className="fa-regular fa-xmark"></i></button>
                            <form onSubmit={ValidateOnSubmit} noValidate className='new-product-form'>

                                <div className='new-product-title'>
                                    <h2 className="admin-title">Update Product</h2>    
                                </div>

                                <div className='new-product-name'>
                                    <input className={`${nameError === "" ? "input-padding" : "input-padding error"}`} value={apiProduct.name} id="name" type="text" placeholder='Product Name' onKeyUp={ValidateName} onChange={handleChange}/>
                                    <div className="error-message">{nameError}</div>
                                </div>

                                <div className='new-product-tag'>
                                    <Dropdown className={`${tagError === "" ? "" : "error"}`} options={tagDropdownOptions} onChange={(option) => changeTagOption(option) } value={apiProduct.tag} placeholder="Tag"/>
                                    <div className="error-message">{tagError}</div>
                                </div>

                                <div className='new-product-price'>
                                    <input className={`${priceError === "" ? "input-padding" : "input-padding error"}`} value={apiProduct.price} id="price" type="number" placeholder='Price' onKeyUp={ValidatePrice} onChange={handleChange}/>
                                    <div className="error-message">{priceError}</div>
                                </div>

                                <div className='new-product-category'>
                                    <Dropdown className={`${categoryError === "" ? "" : "error"}`} options={categoryDropdownOptions} onChange={(option) => changeCategoryOption(option)} value={apiProduct.category} placeholder="Category"/>
                                    <div className="error-message">{categoryError}</div>
                                </div>

                                <div className='new-product-image'>
                                    <input className={`${imageError === "" ? "input-padding" : "input-padding error"}`} value={apiProduct.imageName} id="imageName" type="text" placeholder='Image Link' onChange={handleChange}  onKeyUp={ValidateImg}/>
                                    <div className="error-message">{imageError}</div>
                                    <img className={`${apiProduct.imageName==="" ? "" : "image-show" }`} src={apiProduct.imageName} alt={apiProduct.name}/>
                                </div>

                                <div className='new-product-description'>
                                    <textarea className={`${descriptionError === "" ? "input-padding" : "input-padding error"}`} value={apiProduct.description} id="description" placeholder='Description' onChange={handleChangeTextArea} onKeyUp={ValidateDescription}/>
                                    <div className="error-message">{descriptionError}</div>
                                </div>

                                <div className='new-product-submit'>
                                    <button type="submit" className="button theme-button">Update Product</button>
                                </div>
                            </form>
                        </div> 
                    </div>
                <div  className="pop-up-background"></div>
            </div> 
        }
    </>
  )
}

export default PopUpUpdateProduct