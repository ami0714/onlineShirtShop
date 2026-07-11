// Header.jsx
import React from 'react';
import { motion } from 'framer-motion';
import '../css/home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import {Link} from 'react-router-dom'


const Header = () => {
  const name = import.meta.env.VITE_SHOP_NAME;

 
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">{name}</div>
        <nav className="nav-links">
          <a href="#home">Home</a>
          <a href="#about">About us</a>
          <a href="#location">Location</a>
        </nav>
        <div className="header-actions">
          <button className="btn-buy">BUY</button>
          <Link to='/login'>
            <div className="user-icon">
           <FontAwesomeIcon icon={faUser} />
          </div>
          </Link>
          
        </div>
      </div>
    </header>
  );
};

export default Header;