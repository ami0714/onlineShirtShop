// AdminNavbar.jsx
import React from 'react';
import '../css/AdminDashBoard.css';
import {Link, useNavigate} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';

const AdminNavbar = () => {
  const navigate = useNavigate()
  const name = import.meta.env.VITE_SHOP_NAME;

  
  const handleLogOut = ()=>{
    localStorage.removeItem('admin_token')
    navigate('/')


  }
  return (
    <>
      <nav className="admin-navbar">
        <div className="nav-logo">{name}</div>
        <div className="nav-right">
          <span>Admin Dashboard</span>
          <div className="nav-user-icon">
            <FontAwesomeIcon icon={faUser} />
          </div>
          <FontAwesomeIcon onClick={handleLogOut}  className='logOut' icon={faArrowRightFromBracket} />
        </div>
      </nav>
      <div className="admin-subnav">
          <Link className='Link' to={'/Admin/HomeAdmin'}>Dashboard</Link>
          <Link className='Link' to={'/Admin/Product'}>Product</Link>
        
      </div>
    </>
  );
};

export default AdminNavbar;