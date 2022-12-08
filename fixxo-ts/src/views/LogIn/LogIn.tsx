import React from 'react'
import BreadCrumb from '../../components/BreadCrumb'
import Footer from '../../components/Footer'
import Navigationbar from '../../components/Navigationbar'
import Login from './Sections/SignIn'

const LogIn = () => {
  return (
    <div className='footer-wrapper'>
    <div className='wrapper'>
      <Navigationbar/>
      <BreadCrumb currentPage="Sign In" advertising={""}/>
      <Login/> 
    </div>
    <Footer/>
  </div>
  )
}

export default LogIn