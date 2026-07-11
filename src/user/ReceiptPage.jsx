// ReceiptPage.jsx
import React, { useEffect } from 'react';
import '../css/ReceiptPage.css';
import { useSearchParams,Link } from "react-router-dom";
import {useUserOrder} from '../controller/userController'

const ReceiptPage = () => {

if(!localStorage.getItem('user_token')){
  return (
    <p>sila log in</p>
  )
}

  // --- Ambil Parameter URL (Query String) ---
//   const queryParams = new URLSearchParams(window.location.search);
  const[queryParams] = useSearchParams();
  const statusId = queryParams.get('status_id');
  const billcode = queryParams.get('billcode');
  const orderId = queryParams.get('order_id');
  const msg = queryParams.get('msg');
  const transactionId = queryParams.get('transaction_id');
  

  // --- Tentukan Status Pembayaran ---
  // Jika msg = 'ok' ATAU status_id = '1', anggap berjaya.
  const isSuccessful =  statusId === '1' ? true : false;


  
  const {handleCancelOrder} = useUserOrder();

useEffect(() => {
  if (isSuccessful == false && statusId === '3') {
   
    handleCancelOrder(billcode);
  }
}, [ billcode, orderId]);



if (!statusId || !billcode || !orderId) {
    return (
      <div className="error-state" style={{ padding: '20px', color: 'red' }}>
        Ralat: Parameter URL tidak lengkap. Sila semak pautan yang diberikan.
      </div>
    );
  }
 
  return (
    <div className="receipt-wrapper">
      <div className="receipt-card">
        
        <h1 className="receipt-title">Payment Receipt</h1>

        {/* Status Badge */}
        <div className="status-container">
          <div className={`status-badge ${isSuccessful ? 'status-success' : 'status-failed'}`}>
            {isSuccessful == true ? 'Payment Successful' : 'Payment Failed'}
          </div>
        </div>

        {/* Detail Pesanan */}
        <div className="detail-container">
          <div className="detail-row order-row">
            <span className="detail-label">Order ID</span>
            <span className="detail-value">{orderId || '-'}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Bill Code</span>
            <span className="detail-value">{billcode || '-'}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Transaction ID</span>
            <span className="detail-value">{transactionId || '-'}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Status ID</span>
            <span className="detail-value">{statusId || '-'}</span>
          </div>
        </div>

        {/* Footer / Mesej */}
        <div className="receipt-footer">
          {isSuccessful == true
            ? 'Thank you for your purchase! '
            : 'Please try again or contact support. '}

            {isSuccessful == true
            ? <Link to={'/myorder'}><strong>Go to Myorder</strong></Link>
            : <Link to={'/cart'}><strong>Unsuccessful</strong></Link>}
        </div>


      </div>
    </div>
  );
};

export default ReceiptPage;