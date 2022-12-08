import React from 'react'
import BreadCrumb from '../../components/BreadCrumb'
import Footer from '../../components/Footer'
import Navigationbar from '../../components/Navigationbar'
import SignUp from './Sections/SignUp'

const Register = () => {
  return (
    <>
        <div className='footer-wrapper'>
            <div className='wrapper'>
                <Navigationbar/>
                <BreadCrumb currentPage="Sign Up" advertising={""}/>
                <SignUp/> 
            </div>
            <Footer/>
        </div>
    </>
  )
}

export default Register