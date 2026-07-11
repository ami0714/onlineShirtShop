// AdminOrderSummary.jsx
import React from 'react';
import '../css/AdminOrderSummary.css';
import { useParams } from 'react-router-dom';
import { useOrderDetail } from '../controller/adminController';

const AdminOrderSummary = () => {

if(!localStorage.getItem('admin_token')){
  return (
    <p>anda bukan admin</p>
  )
}

  const { orderId } = useParams(); 


  const { orderDetail, loading, error } = useOrderDetail(orderId);

  
  const handleCopy = (text) => {
    if (!text) return;
    navigator.clipboard.writeText(text).then(() => {
      alert(`Copied: "${text}"`);
    });
  };

  
  if (loading) {
    return <div className="loading-state" style={{ padding: '20px', text_align: 'center' }}>Memuatkan ringkasan order...</div>;
  }


  if (error) {
    return <div className="error-state" style={{ padding: '20px', color: 'red' }}>Ralat: {error}</div>;
  }

  if (!orderDetail || !orderDetail.orderDetails) {
    return <div className="error-state" style={{ padding: '20px' }}>Data order tidak ditemui.</div>;
  }

  return (
    <div className="admin-summary-wrapper">
      <div className="main-card">
        
        {/* 1. Order ID Title */}
        <h1 className="order-id-title">Order-Id: {orderDetail.orderDetails?.orderId}</h1>
        <h3>order date:{orderDetail.orderDetails.order_date}</h3>
        {/* 2. Recipient Details */}
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

          <div className="recipient-detail" style={{ marginTop: '10px' }}>
            Tracking Number: <span>{orderDetail.orderDetails?.tracking_number}</span>
            <span className="copy-icon" onClick={() => handleCopy(orderDetail.orderDetails?.tracking_number)}>
              <svg viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
            </span>
          </div>
          <div className="recipient-detail" style={{ marginTop: '10px' }}>
            Courier: <span>{orderDetail.orderDetails?.recipient_courier}</span>
          </div>
        </div>

        {/* 3. Items Table (Loop .map data sebenar) */}
        <div className="items-table-wrapper">
          <table>
            <thead>
              <tr className="items-header">
                <th>Product name</th>
                <th>Variant</th>
                <th>Qty</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody className="items-body">
              {orderDetail.orderItems?.map((item, index) => (
                <tr key={index} className="item-row">
                  <td className="item-name">{item.name || item.product_name}</td>
                  <td>{`${item.product_color}/ ${item.product_size}`}</td>
                  <td>x{item.product_quantity}</td>
                  <td>RM{ item.product_price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 4. Summary Section (Paparan Kos & Pengiraan SQL) */}
        <div className="summary-section">
          <div className="summary-row">
            <span>Subtotal: RM{orderDetail.orderDetails?.total_amount}</span>
          </div>
          <div className="summary-row">
            <span>Shipping Fee ({orderDetail.orderDetails?.courier || 'Standard'}): RM{orderDetail.orderDetails?.shipping_fee}</span>
          </div>
          
          <div className="thick-line"></div>
          
          <div className="grand-total">
            <span>GRAND TOTAL: RM{orderDetail.orderDetails?.grand_total}</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminOrderSummary;