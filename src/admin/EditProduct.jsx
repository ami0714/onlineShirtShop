import React, { useState, useEffect } from 'react';
import '../css/EditProduct.css';
import { useGetDetailproduct, useUpdateProduct } from '../controller/adminController';
import { useParams } from 'react-router-dom';

const EditProduct = () => {
if(!localStorage.getItem('admin_token')){
  return (
    <p>anda bukan admin</p>
  )
}

  const { id, idProduct } = useParams();
  const targetId = idProduct || id;
  const { UpdateProduct } = useUpdateProduct();
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const {
    product,
    variants: fetchedVariants,
    loading,
    error
  } = useGetDetailproduct(targetId);

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

  useEffect(() => {
    if (!product) return;
    

    setProductData({
      id: product.product_id,
      name: product.product_name,
      price: product.product_price,
      description: product.product_description,
      image:BASE_URL+product.product_image
    });
  }, [product]);
  

  useEffect(() => {
    if (!Array.isArray(fetchedVariants)) return;

    setVariants(
      fetchedVariants.map((item) => ({
        id: item.variant_id,
        size: item.size || "",
        color: item.color || "",
        stock: item.stock ?? ""
      }))
    );
  }, [fetchedVariants]);

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
    formData.append('action', 'edit');

    if (imageFile) {
      formData.append('image', imageFile);
    }
    formData.append('variants', JSON.stringify(variants));

    const success = await UpdateProduct(formData);
    if (success) {
      alert('Produk berjaya dikemaskini!');
    }
  };

  if (loading) {
    return (
      <div className="loading-state">
        Memuatkan produk...
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-state">
        {error}
      </div>
    );
  }

  
  

  return (
    <div className="admin-edit-product-wrapper">
      <h1 className="edit-product-title">Edit Product</h1>

      <div className="edit-product-card">
        
        {/* --- KOLOM KIRI --- */}
        <div className="left-col">
          
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

          <div className="variants-container">
            <div className="variant-header">
              <span>Add variant</span>
              <button className="btn-add-variant" onClick={handleAddVariant}>
                ADD Variant
              </button>
            </div>

            {variants.map((variant, index) => (
              <div key={index} className="variant-pill">
                
                <div className="pill-input-group">
                  <span className="pill-input-label">size</span>
                  <input
                    type="text"
                    className="pill-input-white size"
                    value={variant.size || ''}
                    onChange={(e) => handleVariantChange(variant.id, 'size', e.target.value)}
                  />
                </div>

                <div className="pill-input-group">
                  <span className="pill-input-label">color</span>
                  <input
                    type="text"
                    className="pill-input-white color"
                    value={variant.color || ''}
                    onChange={(e) => handleVariantChange(variant.id, 'color', e.target.value)}
                  />
                </div>

                <div className="pill-input-group">
                  <span className="pill-input-label">stock</span>
                  <input
                    type="text"
                    className="pill-input-white stock"
                    value={variant.stock || ''}
                    onChange={(e) => handleVariantChange(variant.id, 'stock', e.target.value)}
                  />
                </div>

                <button 
                  className="pill-delete-btn" 
                  onClick={() => handleDeleteVariant(index)}
                >
                  &#10005;
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* --- KOLOM KANAN --- */}
        <div className="right-col">
          
          <div className="input-group">
            <label>Product Name</label>
            <input 
              type="text" 
              value={productData.name || ''}
              onChange={(e) => handleInputChange('name', e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Price</label>
            <input 
              type="text" 
              className="price-input"
              value={productData.price || ''}
              onChange={(e) => handleInputChange('price', e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Description</label>
            <textarea 
              value={productData.description || ''}
              onChange={(e) => handleInputChange('description', e.target.value)}
            />
          </div>

          <div className="btn-submit-wrapper">
            <button className="btn-edit-submit" onClick={handleSubmit}>
              Edit
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default EditProduct;