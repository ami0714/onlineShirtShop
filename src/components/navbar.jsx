// Navbar.jsx
import React from 'react';
import './navbar.css';
import {motion} from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import {useUserData, useUserCart} from '../controller/userController'
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  
  
  const { cartData, cartLength, loading } = useUserCart( )
  const { username, email, role, isLoggedIn } = useUserData()
  

  
  
 

  const navigate = useNavigate()
  const name = import.meta.env.VITE_SHOP_NAME;
  
  const handleLogOut = ()=>{
    localStorage.removeItem('user_token')
    navigate('/')


  }
  
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="navbar"
    >
      <div className="nav-logo">{name}</div>
      <div className="nav-actions">
        <button onClick={()=> navigate('/HomeUser')} className="nav-btn-home">HOME</button>
        
        <div onClick={() => navigate('/cart')} className="nav-cart-wrapper">
          <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          <span className="cart-badge">{cartLength}</span>
        </div>

        <button onClick={() => navigate('/myorder')} className="nav-btn-order">MY ORDER</button>
        
        <div className="nav-user-icon">
          <FontAwesomeIcon onClick={() => navigate('/Update')} icon={faUser} />
          
        </div>
      <p className="username">{username}</p>
      <FontAwesomeIcon onClick={handleLogOut}  className='logOut' icon={faArrowRightFromBracket} />
      </div>
    </motion.nav>
  );
};

export default Navbar;