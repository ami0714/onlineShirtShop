// AddProduct.jsx
import React, { useState, useEffect } from 'react';
import '../css/AddProduct.css';
import {  useUpdateProduct } from '../controller/adminController';
import { useParams } from 'react-router-dom';

const AddProduct = () => {

  if(!localStorage.getItem('admin_token')){
  return (
    <p>anda bukan admin</p>
  )
}

  const { id, idProduct } = useParams();
  const targetId = idProduct || id;
  const { UpdateProduct } = useUpdateProduct();
  const BASE_URL = import.meta.env.VITE_BASE_URL;



  const [productData, setProductData] = useState({
    id: "",
    name: "",
    price: "",
    description: "",
    image: ""
  });

  const [variants, setVariants] = useState([]);
  const [imageFile, setImageFile] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setProductData(prev => ({ ...prev, image: URL.createObjectURL(file) }));
    }
  };

  

 

  const handleInputChange = (field, value) => {
    setProductData(prev => ({ ...prev, [field]: value }));
  };

  const handleVariantChange = (id, field, value) => {
    setVariants(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, [field]: value }
          : item
      )
    );
  };

  const handleAddVariant = () => {
    setVariants(prev => [
      ...prev,
      {
        id: "",
        size: "",
        color: "",
        stock: ""
      }
    ]);
  };

  const handleDeleteVariant = (indexToRead) => {
  setVariants(prev => prev.filter((_, index) => index !== indexToRead));
};

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('token', localStorage.getItem('admin_token'));
    formData.append('productId', targetId);
    formData.append('name', productData.name);
    formData.append('price', productData.price);
    formData.append('description', productData.description);
    formData.append('action', 'add');

    if (imageFile) {
      formData.append('image', imageFile);
    }
    formData.append('variants', JSON.stringify(variants));

    const success = await UpdateProduct(formData);
    if (success) {
      alert('Produk berjaya ditambah!');
    }
  };

  

  return (
    <div className="admin-add-product-wrapper">
      <h1 className="add-product-title">Add Product</h1>

      <div className="add-product-card">
        
        {/* --- LEFT COLUMN --- */}
        <div className="left-col">
          {/* Upload Image Box */}
          <input 
            className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-lg file:border-0
            file:text-sm file:font-semibold
            file:bg-amber-50 file:text-amber-700
            hover:file:bg-amber-100
            file:cursor-pointer cursor-pointer
            border border-gray-300 rounded-lg bg-gray-50 focus:outline-none"
            type="file" 
            accept="image/*" 
            style={{ display: 'block' }} 
            onChange={handleImageChange} 
          />
          <div 
            className="product-img-box" 
            onClick={() => document.getElementById('fileInput').click()} 
            style={{ cursor: 'pointer' }}
          >
            <img src={productData.image} alt="Product" />
          </div>

          {/* Add Variant Container */}
          <div className="variants-container">
            <div className="variant-header">
              <span>Add variant</span>
              <button className="btn-add-variant" onClick={handleAddVariant}>
                + Add variant
              </button>
            </div>

            {/* Looping Variant Pill menggunakan .map() */}
            {variants.map((variant) => (
              <div key={variant.id} className="variant-pill">
                <input
                  type="text"
                  className="pill-input size"
                  placeholder="S"
                  value={variant.size}
                  onChange={(e) => handleVariantChange(variant.id, 'size', e.target.value)}
                />
                <input
                  type="text"
                  className="pill-input color"
                  placeholder="Color"
                  value={variant.color}
                  onChange={(e) => handleVariantChange(variant.id, 'color', e.target.value)}
                />
                <input
                  type="text"
                  className="pill-input stock"
                  placeholder="Stock"
                  value={variant.stock}
                  onChange={(e) => handleVariantChange(variant.id, 'stock', e.target.value)}
                />
                <button 
                  className="pill-delete" 
                  onClick={() => handleDeleteVariant(variant.id)}
                >
                  &#10005;
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* --- RIGHT COLUMN --- */}
        <div className="right-col">
          <div className="input-group">
            <label>Product Name</label>
            <input 
              type="text" 
              value={productData.name}
               onChange={(e) => handleInputChange('name', e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Price</label>
            <input 
              type="text" 
              className="price-input"
              value={productData.price}
               onChange={(e) => handleInputChange('price', e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>description</label>
            <textarea 
              value={productData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
            />
          </div>

          {/* Button Add di hujung kanan bawah */}
          <div className="btn-submit-container">
            <button className="btn-submit-add" onClick={handleSubmit}>
              Add
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AddProduct;