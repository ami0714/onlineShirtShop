// AdminOrderDetail.jsx
import React, { useState } from 'react';
import '../css/AdminOrderShip.css';
import { useParams } from 'react-router-dom';
import {useOrderDetail} from '../controller/adminController'

const AdminOrderShip = () => {

  if(!localStorage.getItem('admin_token')){
  return (
    <p>anda bukan admin</p>
  )
}
 

  const { orderId } = useParams(); // Ambil orderId dari URL

   //fetch detail 
  const { orderDetail,courierList, shipOrder,updating, loading, error } = useOrderDetail(orderId);

 
 


  

  // --- State ---
  const [trackingNo, setTrackingNo] = useState('');
  const [selectedCourier, setSelectedCourier] = useState('J&T Express');

  //---handle ship order button click---
  const handleShipOrder = async (orderId) => {
    if (!selectedCourier || !trackingNo) {
      alert("Sila pilih kurier dan isi no tracking terlebih dahulu!");
      return;
    }

    await shipOrder(selectedCourier, trackingNo, orderId);

  };

  // --- Fungsi Penambahbaikan: Copy to Clipboard ---
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert(`Copied: "${text}"`);
    });
  };


 if (loading) {
    return <div className="loading-state" style={{ padding: '20px', text_align: 'center' }}>Memuatkan maklumat order...</div>;
  }

  
  if (error) {
    return <div className="error-state" style={{ padding: '20px', color: 'red' }}>Ralat: {error}</div>;
  }

  
  if (!orderDetail || !orderDetail.orderDetails) {
    return <div className="error-state" style={{ padding: '20px' }}>Data order tidak ditemui.</div>;
  }


  return (
    <div className="admin-order-wrapper">
      <div className="main-card">
        
        {/* Order ID Title */}
        <h1 className="order-id-title">Order-Ref: {orderDetail.orderDetails?.order_ref}</h1> 
        <h3>order date:{orderDetail.orderDetails.order_date}</h3>

        {/* 1. Recipient Details */}
        <div className="recipient-section">
          <h3>Recipient Details</h3>
          <div className="recipient-detail">
            name: <span>{orderDetail.orderDetails?.recipient_name}</span>
          </div>
          <div className="recipient-detail">
            Phone: <span>{orderDetail.orderDetails?.recipient_phone}</span>
            <span className="copy-icon" onClick={() => handleCopy(orderDetail.orderDetails?.recipient_phone)}>
              <svg viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
            </span>
          </div>
          <div className="recipient-detail">
            Address: <span>{orderDetail.orderDetails?.recipient_address}</span>
            <span className="copy-icon" onClick={() => handleCopy(orderDetail.orderDetails?.recipient_address)}>
              <svg viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
            </span>
          </div>
          <div className="recipient-detail" style={{ marginTop: '10px' }}>
            Status: <span>{orderDetail.orderDetails?.recipient_status}</span>
          </div>
        </div>

        {/* 2. Items Table (Loop .map) */}
        <div className="items-table-wrapper">
          <div className="items-header">
            <div>Product name</div>
            <div>Variant</div>
            <div>Qty</div>
            <div>price</div> 
          </div>
          <div className="items-body">
            {orderDetail.orderItems.map((item, index) => (
              <div key={index} className="item-row">
                <div>{item?.product_name}</div>
                <div>{item?.product_color}/ {item.product_size}</div>
                <div>x{item?.product_quantity}</div>
                <div>{item?.product_price}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Shipping Section */}
        <div className="shipping-section-wrapper">
          <h3>Shipping</h3>
          
          <div className="shipping-input-group">
            <label>No. Tracking</label>
            <input 
              type="text" 
              value={trackingNo} 
              onChange={(e) => setTrackingNo(e.target.value)} 
            />
          </div>

          <div className="shipping-input-group">
            <label>Select Courier</label>
            <div className="courier-options">
              {courierList.map((courier, index) => (
                <button 
                  key={index}
                  className={`courier-btn ${selectedCourier === courier ? 'active' : ''}`}
                  onClick={() => setSelectedCourier(courier)}
                >
                  {courier}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 4. Summary & Actions */}
        <div className="summary-section">
          <div className="summary-row">
            <span>Subtotal:{orderDetail.orderDetails.total_amount}</span>
          </div>
          <div className="summary-row">
            <span>Shipping Fee ({orderDetail.orderDetails.recipient_courier}):{orderDetail.orderDetails.shipping_fee}</span>
          </div>
          
          <div className="thick-line"></div>
          
          <div className="grand-total">
            <span>GRAND TOTAL:{orderDetail.orderDetails.grand_total}</span>
          </div>

          <div className="action-buttons">
            <button className="btn-cancel" onClick={() => console.log('Cancelled')}>
              Cancel
            </button>
            <button className="btn-ship" onClick={() => handleShipOrder(orderDetail.orderDetails?.orderId)}>
              {updating ? 'Updating...' : 'Ship Order'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminOrderShip;