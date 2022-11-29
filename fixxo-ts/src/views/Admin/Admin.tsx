import React from 'react'
import BreadCrumb from '../../components/BreadCrumb'
import Footer from '../../components/Footer'
import Navigationbar from '../../components/Navigationbar'
import AddNewProduct from './Sections/AddNewProduct'
import ShowAllProducts from './Sections/ShowAllProducts'

const Admin = () => {
  
  return (
    <div className='footer-wrapper'>
      <div className='wrapper'>
        <Navigationbar/>
        <BreadCrumb currentPage="Admin" advertising={""}/>
        <AddNewProduct/>
        <ShowAllProducts/>
      </div>
      <Footer/>
    </div>
  )
}

export default Admin