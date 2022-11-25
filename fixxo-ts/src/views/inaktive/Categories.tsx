import React from 'react'
import Footer from '../../components/Footer';
import Navigationbar from '../../components/Navigationbar'; 

const Categories = () => {
    return (
        <>
            <div className='footer-wrapper'>
                <div className='wrapper'>
                    <Navigationbar/>
                </div>
                <Footer/>
            </div>
        </>
    )
}

export default Categories