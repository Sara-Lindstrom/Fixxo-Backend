import Footer from '../components/Footer';
import Navigationbar from '../components/Navigationbar'; 
import BreadCrumb from '../components/BreadCrumb';
import ProductGrid from '../components/ProductGrid';
import { NavLink } from 'react-router-dom';
import React, { useContext, useEffect, useState } from "react"
import ICartItem from '../assets/models/useShoppingContextModels/ICartItem';
import { gql, useQuery } from "@apollo/client"
import IProductContext from '../assets/models/AdminModels/IProductContext';
import { ProductContext } from '../components/Admin/ProductContext';

const getProductsQuery = gql`{products{_id, name, tag, description, category, price, rating, imageName}}`

const ProductBrowse = () => {
    const { hasChanged, setHasChanged } = useContext(ProductContext) as IProductContext

    const [apiProducts, setApiProducts] = useState([])
    const [displayProducts, setDisplayProducts] = useState<ICartItem[]>([])
    const {loading, error, data, refetch} = useQuery(getProductsQuery, {fetchPolicy:"cache-and-network"})


    const populateProducts = async () => {

        await fetch(data)

        if (error){
            console.log('error...')
        }

        if(loading === false && error === undefined){
            setApiProducts(await (data.products))
        }
    }

    populateProducts();

    useEffect(() => {
        refetch()
        setHasChanged(false)
    }, [hasChanged])


    useEffect(()=>{
        let cartItems = apiProducts.map(p => {
            let cartitem:ICartItem = {
                quantity:0,
                product:p
            }
            return cartitem;
        })

        setDisplayProducts(cartItems)
        }, [apiProducts])

    return (
        <>
            <div className='footer-wrapper'>
            <div className='wrapper'>
                <Navigationbar/>
                <BreadCrumb currentPage="Products" advertising={""}/>
                <div className='container temporary-admin-button'>         
                </div>
                <ProductGrid title="Products" col={4} items={displayProducts} cardIsFlexed={false}/>  
            </div>
                <Footer/>
            </div>
        </>
    )
}

export default ProductBrowse