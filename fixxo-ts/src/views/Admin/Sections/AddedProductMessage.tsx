import React, { useContext, useEffect, useState } from 'react'
import IProductContext from '../../../assets/models/AdminModels/IProductContext'
import { ProductContext } from '../../../components/Admin/ProductContext'



const AddedProductMessage = () => {
    // Hooks
    const {submitted} = useContext(ProductContext) as IProductContext
    const [canSubmit, setCanSubmit] = useState<Boolean>(false)

    useEffect(()=>{
        if(submitted!==null){
            setCanSubmit(submitted)
        }
        console.log("woo")
    }, [submitted])

    return (
        <>
            {
            // message when submittion success
            submitted!== null && canSubmit &&
                <div className="alert alert-success text-center submitted-comment" role="alert">
                <h2>Product Added!</h2>
                </div>
            }

            {
            // message when submittion failed
            submitted!== null && canSubmit === false &&
                <div className="alert alert-danger text-center submitted-comment-fail" role="alert">
                <h2>Oops!</h2>
                <p>Something went Wrong. We couldn't Add The Product Right Now</p>
                </div>
            }
        </>
    )
}

export default AddedProductMessage