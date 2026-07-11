// HomePage.jsx
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar.jsx';
import '../components/UserHomePage.css'
import {useProductHomeUser} from '../controller/ProductController'
import { motion } from 'framer-motion';
import Footer from '../components/footer';
import { useNavigate } from "react-router-dom";

const HomePage = () => {

if(!localStorage.getItem('user_token')){
  return (
    <p>sila log in</p>
  )
}

  const navigate = useNavigate()
  // --- Logik Slider Auto & Manual ---
  const heroImages = [
    'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=1200', // Hoodie display (matches design)
    'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&q=80&w=1200', // Clothing store rack
    'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1200', // Modern clothing store
  ];
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    currentIndex < heroImages.length - 1 ? setCurrentIndex(currentIndex + 1):setCurrentIndex(0);
  };

  const prevSlide = () => {
   currentIndex > 0 ?  setCurrentIndex(currentIndex - 1):setCurrentIndex(heroImages.length - 1);
  };

  // Fungsi Auto Play (Next dipanggil secara automatik setiap 3 saat)
  useEffect(() => {
    const intervalId = setInterval(() => {
      nextSlide();
    }, 3000);

    // Cleanup function untuk mengelakkan memory leak
    return () => clearInterval(intervalId);
  }, [currentIndex]); // Kosongkan dependency supaya berjalan sekali semasa mount

    //testing dengan dummy data 
  const { productDataHome } = useProductHomeUser();
;

 




  



 
  
  return (
    <div className="home-page">
      <Navbar  />

      {/* --- Hero Section (Slider) --- */}
      <motion.section
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              // whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }} 
              transition={{ delay: 0.5, duration: 0.4 }}className="hero-section">
        <div 
          className="slider-track" 
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {heroImages.map((imgUrl, index) => (
            <div key={index} className="slide-item">
              <img src={imgUrl} alt={`Slide ${index + 1}`} />
            </div>
          ))}
        </div>

        {/* Butang Next & Prev (Mengikut permintaan) */}
        <button className="slider-btn slider-btn-prev" onClick={prevSlide}>
          &#10094;
        </button>
        <button className="slider-btn slider-btn-next" onClick={nextSlide}>
          &#10095;
        </button>
      </motion.section>

      {/* --- Product Section --- */}
      <section className="home-product-container">
        <h2 className="home-product-title">Product</h2>
        
        <div  className="home-product-grid">
          {productDataHome.map((product, index) => (
            
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }} 
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className="home-product-card"
              onClick={() => navigate(`/detail/${product.id}`)}
            >
              <img src={BASE_URL+product.image_url} alt={product.name} />
              <div className="home-product-info">
                <h3>{product.name}</h3>
                <p>RM {product.price}</p>
              </div>
            </motion.div>
            
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default HomePage;