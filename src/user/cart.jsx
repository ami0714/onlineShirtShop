import React, { useState, useEffect } from 'react';
import '../css/cart.css';
import { useUserCart, useUpdateCart } from "../controller/userController";
import Navbar from '../components/navbar.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';



const CartItemRow = ({ item, deleteItem, UpdateQuantity }) => { 
  //buat komponen untuk cart supaya bole dapat quantity betul dan bole update quantiti kerana komponen menerima data item yang sedang dimapping
  const [localQuantity, setLocalQuantity] = useState(item.quantity);

  useEffect(() => {
    setLocalQuantity(item.quantity);
  }, [item.quantity]);

  const handleBlur = (e) => {
    const newQty = parseInt(e.target.value);
    
    if (isNaN(newQty) || newQty < 1) {
      setLocalQuantity(item.quantity);
      return;
    }

    if (newQty !== item.quantity) {
      UpdateQuantity(item.id, newQty);
    }
    
  };

  return (
    <div className="cart-item">
      <div className="item-img-wrapper">
        <img src={item.image} alt={item.name} />
      </div>
      
      <div className="item-info">
        <div className="item-name">{item.name}</div>
        <div className="item-price">RM {item.price}</div>
        
        <div className="item-variants">
          <div className="variants-pill">
            <span className="label">size</span>
            <span className="value-circle">{item.size}</span>
          </div>

          <div className="variants-pill">
            <span className="label-upper">COLOR</span>
            <p className="color-Value">{item.color}</p>
          </div>

          <div className="quantity-controls">
            <input 
              type='number' 
              min="1"
              value={localQuantity} 
              onChange={(e) => setLocalQuantity(e.target.value)} 
              onBlur={handleBlur}
            />
          </div>
        </div>
      </div>

      <div className="trash-icon" onClick={() => deleteItem(item.id)}>
        <svg viewBox="0 0 24 24">
          <polyline points="3 6 5 6 21 6"></polyline>
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          <line x1="10" y1="11" x2="10" y2="17"></line>
          <line x1="14" y1="11" x2="14" y2="17"></line>
        </svg>
      </div>
    </div>
  );
};


const CartPage = () => {

  if(!localStorage.getItem('user_token')){
  return (
    <p>sila log in</p>
  )
}
  const { cartData, cartLength, loading, fetchUserCart } = useUserCart();
  const { handleDeleteCart, handleCartQuantity } = useUpdateCart();
  console.log(cartData)
  const navigate = useNavigate();
    const BASE_URL = import.meta.env.VITE_BASE_URL;
  
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    if (cartData && cartData.length > 0) {
      setCartItems(cartData.map(item => ({
        id: item.cart_id,
        name: item.product_name,
        price: item.product_price,
        image: BASE_URL+item.image,
        size: item.size,
        color: item.color,
        quantity: item.quantity,
        stock: item.stock
      })));
    } else {
      setCartItems([]);
    }
  }, [cartData, cartLength]);

  const total = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const deleteItem = async (id) => {
    const success = await handleDeleteCart(id);
    if (success) {
      fetchUserCart();
    }
  };

  const UpdateQuantity = async (id, Qvalue) => {
    const success = await handleCartQuantity(id, Qvalue);
    if (success) {
      fetchUserCart();
    }
  };

  return (
    <>
      <Navbar />
      <div className="cart-wrapper">
        <div className="cart-header-row">
                <FontAwesomeIcon onClick={()=> navigate('/HomeUser')} className='back-arrow' icon={faArrowLeft} ></FontAwesomeIcon>
                <h1 className="cart-title">Checkout</h1>
              </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '50px' }}>Loading...</div>
        ) : cartItems.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '50px' }}>Cart is empty</div>
        ) : (
          <div className="cart-list">
            {cartItems.map((item) => (
              <CartItemRow 
                key={item.id} 
                item={item} 
                deleteItem={deleteItem} 
                UpdateQuantity={UpdateQuantity} 
              />
            ))}
          </div>
        )}

        <div className="bottom-checkout-bar">
          <div className="total-text">TOTAL:RM{total.toFixed(2)}</div>
          <button onClick={() => navigate('/checkout')} className="checkout-btn">CHECK OUT</button>
        </div>
      </div>
    </>
  );
};

export default CartPage;