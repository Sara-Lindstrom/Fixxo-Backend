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
import ProductContextProvider from './components/Admin/ProductContext';
import LogIn from './views/LogIn/LogIn';
import Register from './views/Register/Register';
import {ApolloProvider, ApolloClient, InMemoryCache} from '@apollo/client'

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache: new InMemoryCache()
})

function App() {

  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <ShoppingCartProvider>
          <ProductContextProvider>
            <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/contacts" element={<Contacts/>}/>
              <Route path="/product/id/:id" element={<ProductSpec/>}/>
              
              <Route path="/categories" element={<Categories/>}/>
              <Route path="/products" element={<Products/>}/>
              <Route path="/search" element={<Search/>}/>
              <Route path="/share" element={<Share/>}/>
              <Route path="/whishlist" element={<Whishlist/>}/>
              <Route path="/signin" element={<LogIn/>}/>
              <Route path='/signup' element={<Register/>}/>

              <Route path="*" element={<NotFound/>}/>
              <Route path="/admin" element={<Admin/>}/>
            </Routes>          
          </ProductContextProvider>
        </ShoppingCartProvider>
      </BrowserRouter>      
    </ApolloProvider>

  );
}

export default App;
