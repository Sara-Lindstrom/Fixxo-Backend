import React from 'react'
import Navigationbar from '../components/Navigationbar'; 
import Footer from '../components/Footer';

const NotFound = () => {
  return (
    <>
      <div className='footer-wrapper'>
      <div className='wrapper'>
        <Navigationbar/>
        <div className="not-found">
          <img className='error-img' src='https://media.istockphoto.com/id/1149316411/vector/concept-404-error-page-flat-cartoon-style-vector-illustration.jpg?s=612x612&w=0&k=20&c=dLlOE7s6GuI4a5so_ipUFHeW9kaFWZVf-JTrFu5rAIk=' alt="404"></img>           
        </div>
      </div>
      <Footer/>
    </div>
  </>

  )
}

export default NotFound