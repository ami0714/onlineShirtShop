// UpdateProfile.jsx
import React, { useState,useEffect } from 'react';
import '../css/UpdateProfile.css';
import Navbar from '../components/Navbar.jsx';
import {useUserData} from '../controller/userController'
import{useNavigate} from 'react-router-dom'


const UpdateProfile = () => {
if(!localStorage.getItem('user_token')){
  return (
    <p>sila log in</p>
  )
}

 const navigate = useNavigate();
   const { username, email,phone, role, isLoggedIn,updateProfile,fetchUserData } = useUserData()


   const [formData, setFormData] = useState({
    name: '',
    phone: '', // Boleh masukkan kolum phone yang kita bincang tadi
    email: ''
  });

  // 3. Guna useEffect untuk tangkap data bila ia tiba!
  useEffect(() => {
    // Semak kalau userData tu dah ada isi
    if (username) {
      setFormData({
        name: username || '',
        phone:phone || '',
        email:email || ''
      });
    }
  }, [username])
   
   

  // --- Handler untuk Kemaskini Input ---
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // --- Handler Submit ---
  const handleUpdate = async () => {
    try {
      const result = await updateProfile(formData.name, formData.email, formData.phone);
      
      if (result.status === 'success') {
        console.log('Profil berjaya dikemaskini!');
        fetchUserData(); // <
      } else {
        console.log(result.message || 'Gagal mengemaskini profil');
      }
    } catch (error) {
      alert('Ralat sistem berlaku');
    }
  };

  // --- Handler Cancel (Kembali ke halaman sebelumnya) ---
  const handleCancel = () => {
    navigate('/HomeUser')
    // Contoh: history.back() atau navigasi ke halaman lain
  };

  return (
    <>
    <Navbar />
    
    
    <div className="update-profile-wrapper">
      <div className="profile-card">
        
        <h1 className="profile-title">My Profile</h1>

        {/* --- Form Fields --- */}
        <div className="input-group">
          <label>Username</label>
          <input 
            type="text" 
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div className="input-group">
          <label>Email</label>
          <input 
            type="email" 
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="input-group">
          <label>Phone</label>
          <input 
            type="tel" 
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>

        {/* --- Action Buttons --- */}
        <div className="action-buttons">
          <button className="btn-cancel" onClick={handleCancel}>
            Cancel
          </button>
          <button className="btn-update" onClick={handleUpdate}>
            Update
          </button>
        </div>

      </div>
    </div>
     </>
  );
};

export default UpdateProfile;