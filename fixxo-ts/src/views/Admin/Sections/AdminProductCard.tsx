import React, { useContext, useState } from 'react'
import { currencyFormatter } from '../../../assets/utilities/currencyFormatter';
import PopUpUpdateProduct from './PopUpUpdateProduct';
import ICartItem from '../../../assets/models/useShoppingContextModels/ICartItem';
import { ProductContext } from '../../../components/Admin/ProductContext';
import IProductContext from '../../../assets/models/AdminModels/IProductContext';

const AdminProductCard:React.FC<{product:ICartItem}> = ({product}) => {

  const {remove} = useContext(ProductContext) as IProductContext

  const [show, setShow] = useState<Boolean>(false)
  return (
    // card core
    
    <div className="admin-card container">
        <div className="admin-product-image">
            <img src={product.product.imageName} alt={product.product.name}/> 
        </div>

        {/* product information */}
        <div className="admin-product-info">
            <h4 className="product-name">{product.product.name}</h4>
            <p className="category">{product.product.category}</p>
            <span className="original-price">{currencyFormatter(product.product.price)}</span>
        </div> 

        <div className='delete-or-edit-buttons'>
            <button className='round-button admin-buttons' onClick={() => setShow(!show)}><i className="fa-light fa-pen-to-square"></i></button>
            {
              show &&
              <PopUpUpdateProduct _id={product.product._id} show={show} setShow={setShow}/>              
            }

            <button className='round-button admin-buttons' onClick={()=>remove(product.product._id)}><i className="fa-regular fa-trash"></i></button>
        </div>
    </div>   
  )
}

export default AdminProductCard