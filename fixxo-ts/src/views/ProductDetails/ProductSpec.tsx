import React, { useEffect, useState } from 'react'
import Footer from '../../components/Footer';
import Navigationbar from '../../components/Navigationbar'; 
import BreadCrumb from '../../components/BreadCrumb';
import ProductDetails from './Sections/ProductDetails';
import { useParams } from 'react-router-dom';
import ProductInformation from './Sections/ProductInformation';
import RelatedProducts from './Sections/RelatedProducts';
import UseGetProduct from "../../Hooks/UseGetProduct";
import IProduct from '../../assets/models/IProduct';


const ProductSpec = () => {
  const id = useParams().id

  let parseId = ""

  if(id!== undefined){
  parseId = id
  }

  const chosenProduct = UseGetProduct(parseId)

  const defaultUpdateProduct:IProduct = {
    _id:chosenProduct._id,
    name: chosenProduct.name,
    description: chosenProduct.description,
    category: chosenProduct.category,
    price: chosenProduct.price,
    rating:chosenProduct.rating,
    imageName: chosenProduct.imageName,
  }

  const [product, setProduct] = useState(defaultUpdateProduct)

  useEffect(() => {
    setProduct({
          _id:chosenProduct._id,
          name: chosenProduct.name,
          description: chosenProduct.description,
          category: chosenProduct.category,
          price: chosenProduct.price,
          rating:chosenProduct.rating,
          imageName: chosenProduct.imageName,
      })
  }, [chosenProduct])
  

  if (chosenProduct == null){
    return <></>
  }


  return (
    <>
      <Navigationbar/>
      <BreadCrumb currentPage="Product Details" advertising="Get 25% OFF at the Fixxo Selection - Shop Now!"/>
      <ProductDetails item={product}/>
      <ProductInformation/>
      <RelatedProducts/>
      <Footer/>
    </> 
  )
}

export default ProductSpec
