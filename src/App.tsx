import './css/App.min.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './views/Home/Home';
import Contacts from './views/Contact/Contacts';
import ProductSpec from './views/ProductDetails/ProductSpec';
import NotFound from './views/NotFound';

import Categories from './views/inaktive/Categories';
import Products from './views/Products';
import Search from './views/inaktive/Search';
import Share from './views/inaktive/Share';
import Whishlist from './views/inaktive/Whishlist';
import Admin from './views/Admin/Admin';
import { ShoppingCartProvider } from './components/shoppingcart/ShoppingCartContext';

function App() {

  return (
    <BrowserRouter>
      <ShoppingCartProvider>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/contacts" element={<Contacts/>}/>
          <Route path="/product/id/:id" element={<ProductSpec/>}/>
          
          <Route path="/categories" element={<Categories/>}/>
          <Route path="/products" element={<Products/>}/>
          <Route path="/search" element={<Search/>}/>
          <Route path="/share" element={<Share/>}/>
          <Route path="/whishlist" element={<Whishlist/>}/>

          <Route path="*" element={<NotFound/>}/>
          <Route path="/admin" element={<Admin/>}/>
        </Routes>
      </ShoppingCartProvider>
    </BrowserRouter>
  );
}

export default App;
