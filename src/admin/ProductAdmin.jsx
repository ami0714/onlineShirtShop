// ProductAdmin.jsx
import React from 'react';
import '../admin/ProductAdmin.css';
import AdminNavbar from '../components/AdminNavbar';
import {useNavigate} from 'react-router-dom'
import {useProduct} from '../controller/adminController'

const ProductAdmin = () => {
  if(!localStorage.getItem('admin_token')){
  return (
    <p>anda bukan admin</p>
  )
}

  
  const handleDelete = (id) => console.log(`Delete product ${id}`);
  const handleViewDetail = (id) => console.log(`View detail for product ${id}`);
  const navigate = useNavigate()
  const { product, loading, error } = useProduct();
    const BASE_URL = import.meta.env.VITE_BASE_URL;

  const handleEdit = (idProduct) =>{
    navigate('/Admin/EditProduct/'+idProduct)
  }
  
  
  if(error){

    return ( <p>erroor</p>)
  }

  if(loading){
    return (
      <p> loadingg</p>
    )
  }

  return (
    <>
    <AdminNavbar />
    <div className="admin-product-wrapper">
      
      {/* Header Row (Title + Add Product Button) */}
      <div className="product-header-row">
        <h1 className="product-title">Product</h1>
        <button className="btn-add-product" onClick={()=>navigate('/Admin/AddProduct')} >
          <svg viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          Add Product
        </button>
      </div>

      {/* Table Container */}
      <div className="table-container">
        <table>
          
          {/* Table Header */}
          <thead>
            <tr className="table-header">
              <th>image</th>
              <th>Product name</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Status</th>
              <th>Sales</th>
              <th>Action</th>
            </tr>
          </thead>

          {/* Table Body (Loop menggunakan map) */}
          <tbody className="table-body">
            {product.map((product) => (
              <tr key={product.product_id} className="table-row">
                
                {/* Column 1: Image + Name */}
                <td className="col-product">
                  <img src={BASE_URL+product.product_image} alt={product.product_name} className="product-img" />
                  <span>{product.name}</span>
                </td>
                <td className="col-name">
                  {product.product_name}
                </td>

                {/* Column 2: Price */}
                <td className="col-center">{product.product_price}</td>

                {/* Column 3: Stock + View Detail Button */}
                <td className="col-stock-wrapper">
                  <span>{product.total_stock}</span>
                  <button 
                    className="btn-detail-stock" 
                    onClick={() => handleViewDetail(product.product_id)}
                  >
                    View detail
                  </button>
                </td>

                {/* Column 4: Status */}
                <td className="col-center">{product.stock_status}</td>

                {/* Column 5: Sales */}
                <td className="col-center">{product.total_sales}</td>

                {/* Column 6: Action (Edit + Trash) */}
                <td className="col-action">
                  <button 
                    className="btn-edit" 
                    onClick={() => handleEdit(product.product_id)}
                  >
                    Edit Order
                  </button>
                  
                  {/* Trash Icon SVG */}
                  <div 
                    className="trash-icon" 
                    onClick={() => handleDelete(product.iproduct_idd)}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                      <line x1="10" y1="11" x2="10" y2="17"></line>
                      <line x1="14" y1="11" x2="14" y2="17"></line>
                    </svg>
                  </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
};

export default ProductAdmin;