// ProductDetail.jsx
import React, { useState } from 'react';
import '../css/ProductDetail.css';
import Navbar from '../components/Navbar.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useParams } from "react-router-dom";
import {useGetDetailproduct} from '../controller/ProductController'
import { useUpdateCart } from "../controller/userController";
import { useNavigate } from "react-router-dom";

const ProductDetail = () => {

if(!localStorage.getItem('user_token')){
  return (
    <p>sila log in</p>
  )
}

    const navigate = useNavigate()
    const {id} = useParams()
    console.log(id)


 const {productData,size,color} = useGetDetailproduct(id)
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  // --- State untuk Pemilihan ---
  const [selectedSize, setSelectedSize] = useState('L');
  const [selectedColor, setSelectedColor] = useState('Black');

 const {handleAddCart} = useUpdateCart()


  return (
    <>
    <Navbar />
    <div className="product-page-wrapper">
      <div className="product-detail-container">
        
        {/* Back Arrow Button */}
        <div onClick={() => navigate('/HomeUser')} className="back-btn"><FontAwesomeIcon icon={faArrowLeft} /></div>

        {/* Main Product Card */}
        <div className="product-card">
          
          {/* Left: Image */}
          <div className="product-image-wrapper">
            <img src={BASE_URL+productData?.image_url} alt="Product" />
          </div>

          {/* Right: Details */}
          <div className="product-details">
            <h1 className="product-title">{productData?.name}</h1>
            <div className="product-price">RM {productData?.price}</div>
            <div className="product-description">
              {productData?.description}
            </div>

            {/* Size Selection - Map Loop */}
            <div>
              <div className="option-label">Size</div>
              <div className="options-container">
                {size.map((sizeOption) => (
                  <button
                    key={sizeOption}
                    className={`option-btn ${selectedSize === sizeOption ? 'active' : ''}`}
                    onClick={() => setSelectedSize(sizeOption)}
                  >
                    {sizeOption}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection - Map Loop */}
            <div>
              <div className="option-label">Color</div>
              <div className="options-container">
                {color.map((colorOption) => (
                  <button
                    key={colorOption}
                    className={`option-btn ${selectedColor === colorOption ? 'active' : ''}`}
                    onClick={() => setSelectedColor(colorOption)}
                  >
                    {colorOption}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Add To Cart Button (Absolute position) */}
          <button className="btn-add-cart" onClick={() => handleAddCart(id,selectedSize,selectedColor)}>
            ADD TO CART
          </button>

        </div>
      </div>
    </div>
    </>
  );
};

export default ProductDetail;