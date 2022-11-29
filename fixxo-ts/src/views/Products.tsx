import React, { useContext, useEffect } from 'react'
import Footer from '../components/Footer';
import Navigationbar from '../components/Navigationbar'; 
import BreadCrumb from '../components/BreadCrumb';
import ProductGrid from '../components/ProductGrid';
import { NavLink } from 'react-router-dom';
import { ProductContext } from '../components/Admin/ProductContext';
import IProductContext from '../assets/models/AdminModels/IProductContext';

const ProductBrowse = () => {
    
    const {allEditableItems} = useContext(ProductContext) as IProductContext

    

    return (
        <>
            <div className='footer-wrapper'>
            <div className='wrapper'>
                <Navigationbar/>
                <BreadCrumb currentPage="Products" advertising={""}/>
                <div className='container temporary-admin-button'>
                    <NavLink className="round-button px-2 p-1" to="/admin"><i className="fa-light fa-pen-to-square"></i></NavLink>          
                </div>
                <ProductGrid title="Products" col={4} items={allEditableItems} cardIsFlexed={false}/>  
            </div>
                <Footer/>
            </div>
        </>
    )
}

export default ProductBrowse