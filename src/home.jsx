import React,{useRef} from 'react';
import { motion } from 'framer-motion';
import './css/home.css';
import Footer from './components/footer';
import {useProductHomeUser} from './controller/ProductController'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import {Link,useNavigate} from 'react-router-dom'


const HomeContent = () => {
  const { productDataHome  } = useProductHomeUser();
   const navigate = useNavigate()
  // Animasi fade-in untuk elemen
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };
  const sectiongRef = useRef([])
 const scrollTo = (index) =>{
  
  sectiongRef.current[index].scrollIntoView({
    behavior:"smooth",
    block:"start",
  })
 }
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const name = import.meta.env.VITE_SHOP_NAME;

   return (
    <>
    <header className="header">
      <div className="header-container">
        <div className="logo">{name}</div>
        <nav className="nav-links">
          <a style={{ cursor: 'pointer'}} onClick={()=> scrollTo(0)} >Home</a>
          <a style={{ cursor: 'pointer'}} onClick={()=> scrollTo(1)}  >About us</a>
          <a style={{ cursor: 'pointer'}} onClick={()=> scrollTo(3)} >Location</a>
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
    <div>
      

      {/* Hero Section */}
      <section ref={(el)=>(sectiongRef.current[0] = el)} id="home" className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            WELCOME TO THREAD STUDIO
          </motion.h1>
          <motion.div
            className="hero-buttons"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <button onClick={()=> scrollTo(2)} className="hero-btn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.59 13.41l-8.18 8.18a2 2 0 0 1-2.83 0L2.12 14.12a2 2 0 0 1 0-2.83l8.18-8.18a2 2 0 0 1 2.83 0l7.46 7.46"/>
                <path d="M9 15l6-6"/>
              </svg>
              VIEW KATALOG
            </button>
            <button onClick={() => navigate('/login')} className="hero-btn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              BUY
            </button>
          </motion.div>
        </div>
      </section>

      {/* Our Story Section */}
      <section ref={(el)=>(sectiongRef.current[1] = el)} id="about" className="container">
        <h2 className="section-title">OUR STORY</h2>
        <div className="story-grid">
          <motion.div className="story-card" variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <div className="story-img">
              <img src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=600" alt="Clothes rack" />
            </div>
            <div className="story-text">
              <h3>Curated Threads for the Modern Soul</h3>
              <p>Carefully designed and responsibly made. We believe that what you wear is an extension of your identity. Our apparel collection brings together minimalist aesthetics, premium fabrics, and effortless comfort—tailored for those who appreciate the beauty of clean, timeless style.</p>
            </div>
          </motion.div>

          <motion.div className="story-card" variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <div className="story-text">
              <h3>Crafting More Than Just Caffeine</h3>
              <p>We don't just serve coffee; we craft experiences. Sourcing the finest beans, our baristas brew every cup to ignite your senses and fuel your focus. Whether you are here to hustle, create, or unwind, our space is designed to be your daily creative sanctuary.</p>
            </div>
            <div className="story-img">
              <img src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=600" alt="Cafe interior" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Catalog Section */}
      <section ref={(el)=>(sectiongRef.current[2] = el)} className="catalog-section">
        <h2 className="section-title">CATALOG</h2>
        <div className="catalog-grid">
          {productDataHome.map((product, index) => (
            <motion.div
              key={product.id}
              className="catalog-item"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
            >
                
              <img  src={BASE_URL+product.image_url} alt={product.name} />
              
              
              <h4>{product.name}</h4>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Location & Operating Hours */}
      <section ref={(el)=>(sectiongRef.current[3] = el)} id="location" className="location-section">
        <h2 className="section-title">Location &amp; Operating Hours</h2>
        <div className="location-grid">
          <div className="location-info">
            <div className="location-detail">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <div>
                <h5>Shop Address</h5>
                <p>No. 36,, Taman Segar perdana, 43200</p>
                <button className="location-btn">Direction</button>
              </div>
            </div>

            <div className="location-detail">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              <div>
                <h5>Opening Hours</h5>
                <p>Monday - Thursday: 12:00 PM - 10:00 PM</p>
                <p>Friday - Sunday: 12:00 PM - 11:00 PM</p>
              </div>
            </div>

            <div className="location-detail">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              <div>
                <h5>Contact Us</h5>
                <p>+60 12-345 6789</p>
                <p>hello@threadstudio.com</p>
                <button className="location-btn">call</button>
              </div>
            </div>
          </div>

          <motion.iframe 
        src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBVizdQeh3udy11xDc5Ao2YStR2gLc-rfc&amp;q=pangsapuri%20segar%20perdana%20block%20d&amp;maptype=roadmap&amp;zoom=14"
            className="map-container"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            MAP
          </motion.iframe>
        </div>
      </section>

      {/* Footer */}
      <Footer />
     
    </div>
    </>
  );
};



export default HomeContent;

