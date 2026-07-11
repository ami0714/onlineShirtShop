import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './home'
import AuthPage from './user/authPage';
import HomePage from './user/UserHomePage';
import ProductDetail from './user/ProductDetail';
import CartPage from './user/cart';
import Checkout from './user/checkout';
import ReceiptPage from './user/ReceiptPage';
import MyOrder from './user/myorder';
import UpdateProfile from './user/updateForm';
import AdminDashboard from './admin/homeAdmin';
import ProductAdmin from './admin/ProductAdmin';    
import AddProduct from './admin/AddProduct';
import EditProduct from './admin/EditProduct';
import AdminOrderShip from './admin/AdminOrderShip'
import AdminOrderSummary from './admin/AdminOrderSummary';


function App() {
 

  return (
    <>
       <Router>
      
        
       

        {/* Sistem tukar halaman berdasarkan URL */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<AuthPage />} />
          {/*USER */}
          <Route path='/HomeUser' element={<HomePage />} />
          <Route path='/detail/:id' element={<ProductDetail />} />
          <Route path='/cart'  element={<CartPage />} />
          <Route path='/checkout' element={<Checkout/>} />
          <Route path='/Receipt' element={<ReceiptPage />} />
          <Route path='/myorder' element={<MyOrder />} />
          <Route path='/Update' element={<UpdateProfile />} />

          {/*ADMIN*/}
          <Route path='/Admin/HomeAdmin' element={<AdminDashboard />} />
          <Route path='/Admin/Product'   element={<ProductAdmin />} />
          <Route path='/Admin/AddProduct' element={<AddProduct />} />
          <Route path='/Admin/EditProduct/:idProduct' element={<EditProduct />} />
          <Route path='/Admin/OrderShip/:orderId' element={<AdminOrderShip />} />
          <Route path='/Admin/OrderSummary/:orderId' element={<AdminOrderSummary />} />


          
        
          
          
          
          
        </Routes>
     
    </Router>
    </>
  )
}

export default App
