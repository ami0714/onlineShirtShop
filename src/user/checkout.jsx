// Checkout.jsx
import React,{useState} from 'react';
import '../css/checkout.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";
import {useUserData, useUserCart,useCreateOrder } from "../controller/userController";





const Checkout = () => {

if(!localStorage.getItem('user_token')){
  return (
    <p>sila log in</p>
  )
}

  const navigate = useNavigate()
  // Pengiraan Harga
  const {username,email,phone} = useUserData()
  const [address,setAddress] = useState('')
const {cartData,shipingFee} = useUserCart()
  const subtotal = cartData.reduce((acc, item) => acc + (item.product_price * item.quantity), 0);
  const total = subtotal + Number(shipingFee);
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const {HandlePayment} = useCreateOrder()
  


  return (
    <div className="checkout-wrapper">
      
      {/* Header (Back Arrow + Checkout Title) */}
      <div className="checkout-header-row">
        <FontAwesomeIcon onClick={()=> navigate('/HomeUser')} className='back-arrow' icon={faArrowLeft} ></FontAwesomeIcon>
        <h1 className="checkout-title">Checkout</h1>
      </div>

      <div className="checkout-grid">
        
        {/* LEFT COLUMN: Ship Information */}
        <div className="ship-form-card">
          <h2>Ship Infomation</h2> {/* Dibiar "Infomation" seperti dalam design asal */}
          
         

          <div className="user-row">
            <div className="user-group">
              <h3>name:</h3><p>{username}</p>
              <br></br>
              <h3>Email</h3><p> {email}</p>
              <br></br>
              <h3>Phone:</h3><p>{phone}</p>
            </div>
            
          </div>

          <div className="form-row">
            <div className="input-group">
              <label>Address</label>
              <textarea onChange={(e) =>setAddress(e.target.value)} rows="5"></textarea>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Order Summary */}
        <div className="summary-card">
          
          {/* Loop Item menggunakan map */}
          {cartData.map((chart, index) => (
            <div key={index} className="summary-item">
              <img src={BASE_URL+chart.image} alt={chart.chart} />
              <div className="summary-item-details">
                <span className="summary-item-name">{chart.product_name}</span>
                <span className="summary-item-price">RM {chart.product_price}</span>
                <div className="summary-item-meta">
                  <span>{chart.size}</span>
                  <span>x{chart.quantity}</span>
                </div>
              </div>
            </div>
          ))}

          <div className="divider"></div>

          {/* Payment Summary Details */}
          <div className="summary-row">
            <span>Subtotal:</span>
            <span>RM{subtotal.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping:</span>
            <span>RM{shipingFee}</span>
          </div>
          
          <div className="divider"></div>

          <div className="summary-row total">
            <span>Total:</span>
            
            <span>RM{total.toFixed(2)}</span>
          </div>

          <button onClick={() => HandlePayment(address)} className="continue-btn">Continue to Payment</button>
        </div>

      </div>
    </div>
  );
};

export default Checkout;