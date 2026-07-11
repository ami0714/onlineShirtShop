// MyOrder.jsx
import React from 'react';
import '../css/MyOrder.css';
import Navbar from '../components/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";
import { useUserOrder } from "../controller/userController";
// --- Dummy Data (Anda boleh ganti dengan API/data sebenar nanti) ---


// Fungsi untuk memilih kelas CSS berdasarkan status
const getStatusClass = (status) => {
  if (status === 'paid') return 'status-waiting';
  if (status === 'shipped') return 'status-shipped';
  if (status === 'delivered') return 'status-complete';
  return '';
};

const MyOrder = () => {

if(!localStorage.getItem('user_token')){
  return (
    <p>sila log in</p>
  )
}


  const navigate = useNavigate()

     
    const {orderData,handleReceiveOrder,fetchUserOrder} = useUserOrder()

    const handleReceive = async (orderId) => {

      const success = await handleReceiveOrder(orderId);

      if(success){
        fetchUserOrder()
      }

    }
  return (
    <>
    <Navbar />
    <div className="my-order-wrapper">
      {/* Header Row */}
      <div className="order-header-row">
        <FontAwesomeIcon onClick={()=> navigate('/HomeUser')} className='back-arrow' icon={faArrowLeft} ></FontAwesomeIcon>
        <h1 className="order-page-title">My Order</h1>
      </div>

      <div className="order-list">
        {/* Looping menggunakan map untuk setiap pesanan */}
        {orderData.map((order, index) => (
          <div key={index} className="order-card">
            
            {/* Bahagian Atas (Status, Tarikh, Tracking) */}
            <div className="order-top-row">
              <span className={`status-badge ${getStatusClass(order.status)}`}>
                {order.status == 'paid' ? 'waiting to shipped':order.status }
              </span>
              <span className="separator-vertical">|</span>
              <span className="date-text">{order.orderDate}</span>

              {/* Tracking Number (Hanya jika wujud) */}
              {order.trackingNumber && (
                <>
                  <span className="separator-vertical">|</span>
                  <div className="tracking-text">
                    No Tracking: {order.trackingNumber}
                    
                    <span className="copy-icon" title="Copy tracking number">&#9670;</span>
                  </div>
                </>
              )}
              {order.courier && (
                <>
                  <span className="separator-vertical">|</span>
                  <div className="tracking-text">
                    courier: {order.courier}
                    
                    <span className="copy-icon" title="Copy tracking number">&#9670;</span>
                  </div>
                </>
              )}
            </div>

            {/* Order ID */}
            <div className="order-id">Order Id: {order.orderRef}</div>

            {/* Senarai Item (Loop inner) */}
            <div className="order-items-row">
              {order.items.map((item, idx) => (
                <React.Fragment key={idx}>
                  <span>
                    {item.name} &nbsp; {item.size} &nbsp; x{item.quantity}
                  </span>
                  {/* Tambah pemisah | jika bukan item terakhir */}
                  {idx < order.items.length - 1 && (
                    <span className="item-separator">|</span>
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Footer (Harga & Butang Aksi) */}
            <div className="order-footer">
              <div className="total-price">{order.total}</div>
              {order.status === 'shipped'? (
                <button onClick={()=>handleReceive(order.orderId)} className="action-btn">Receive</button>
              ) : ''}
            </div>

          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default MyOrder;