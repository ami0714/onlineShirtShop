import React from 'react'
import '../css/home.css';

export default function Footer(){
   const name = import.meta.env.VITE_SHOP_NAME;
  return(
    <footer className="footer">
      <div className="footer-container">
        {/* Company Info */}
        <div className="footer-section">
          <h4>{name}</h4>
          <p>Your destination for premium coffee and quality apparel.</p>
          <p className="footer-contact">+60 12-345 6789</p>
          <p>hello@threadstudio.com</p>
        </div>

     

        {/* Hours */}
        <div className="footer-section">
          <h4>Opening Hours</h4>
          <p>Mon - Thu: 12:00 PM - 10:00 PM</p>
          <p>Fri - Sun: 12:00 PM - 11:00 PM</p>
        </div>

        {/* Social Media */}
        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="footer-links">
            <a href="#facebook">Facebook</a>
            <a href="#instagram">Instagram</a>
            <a href="#twitter">Twitter</a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <p>&copy; 2024 THREAD STUDIO All rights reserved.</p>
      </div>
    </footer>
  );
}