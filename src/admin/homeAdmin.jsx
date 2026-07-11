// AdminDashboard.jsx
import React from 'react';
import AdminNavbar from '../components/AdminNavbar';
import '../css/AdminDashBoard.css';
import {  useAdminDashBoard } from '../controller/adminController';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck,faChartLine,faBoxesStacked,faTruckFast } from '@fortawesome/free-solid-svg-icons';

const AdminDashboard = () => {
//--object untuk stats dan diubah dan mengandungi nilai yang di fetch di adminController.jsx,mengandungi juga nama class untuk warna dan icon,so akan senang dipanggil menggunakan map()

if(!localStorage.getItem('admin_token')){
  return (
    <p>anda bukan admin</p>
  )
}

const { dashboardData,recentOrders, error, message} = useAdminDashBoard();
const navigate = useNavigate();

const stats = [
  { id: 1, title: 'Total sales', value: `RM ${parseFloat(dashboardData?.total_sales || 0).toFixed(2)}`, icon: 'trend', colorClass: 'stat-blue' },
  { id: 2, title: 'Waiting to Shipped', value:dashboardData?.total_paid_orders , icon: 'box', colorClass: 'stat-orange' },
  { id: 3, title: 'Shipped', value:dashboardData?.total_shipped_orders , icon: 'truck', colorClass: 'stat-cyan' },
  { id: 4, title: 'Complete', value: dashboardData?.total_delivered_orders, icon: 'check', colorClass: 'stat-green' },
];

const handleActionClick = (action, orderId) => {
  // Handle the action based on the order status
  if (action === 'ship') { 
    navigate(`/Admin/OrderShip/${orderId}`); 
}else if (action === 'detail') {
    // Redirect to order detail page or show modal
navigate(`/Admin/OrderSummary/${orderId}`);
}

  }

  
  
  return (
    <div>
      <AdminNavbar />
      
      <div className="admin-wrapper">
        <h1 className="dashboard-title">Dashboard</h1>

        {/* --- Statistik Grid --- */}
        <div className="stats-container">
          {stats.map((stat) => (
            <div key={stat.id} className={`stat-card ${stat.colorClass}`}>
              <h4>{stat.title}</h4>
              <div className="number">{stat.value}</div>
              <div className="stat-icon">
                {stat.icon === 'trend' && (
                   <FontAwesomeIcon icon={faChartLine} style={{ color: '#ffffff', fontSize: '24px' }} />
                )}
                {stat.icon === 'box' && (
                   <FontAwesomeIcon icon={faBoxesStacked} style={{ color: '#ffffff', fontSize: '28px' }} />
        
                )}
                {stat.icon === 'truck' && (
                  <FontAwesomeIcon icon={faTruckFast}  style={{ color: '#ffffff', fontSize: '28px' }} />
                )}
                {stat.icon === 'check' && (
                   <FontAwesomeIcon icon={faCircleCheck} style={{ color: '#ffffff', fontSize: '24px' }} />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* --- Recent Order Section --- */}
        <h2 className="order-section-title">RECENT ORDER</h2>
        <div className="table-container">
          <table>
            
            {/* Header Table */}
            <thead>
              <tr className="table-header">
                <th>REF</th>
                <th>CUSTOMER NAME</th>
                <th>ORDER DATE</th>
                <th>PHONE</th>
                <th>STATUS</th>
                <th>ACTION</th>
              </tr>
            </thead>

            {/* Body Table (Loop menggunakan map) */}
            <tbody className="table-body">
              {recentOrders.map((order, index) => (
                <tr key={index} className="table-row">
                  <td className="row-cell"><strong>{order.order_ref}</strong></td>
                  <td className="row-cell cust-name bold">{order.customer_name}</td>
                  <td className="row-cell">{order.order_date}</td>
                  <td className="row-cell">{order.customer_phone}</td>
                  <td className="row-cell bold">{order.status_order}</td>
                  <td className="row-cell">
                    {order.status_order === 'paid' && (
                    <button 
                      className="action-btn btn-toShip"
                      onClick={() => handleActionClick(order.status_order === 'paid' ? 'ship' : 'detail',order.order_id)}
                    >
                      Ship order
                    </button>)}
                    {order.status_order === 'shipped' && (
                    <button 
                      className="action-btn btn-detail"
                      onClick={() => handleActionClick(order.status_order === 'paid' ? 'ship' : 'detail',order.order_id)}
                    >
                       View order
                    </button>)}
                    {order.status_order === 'delivered' && (
                    <button 
                      className="action-btn btn-detail"
                      onClick={() => handleActionClick(order.status_order === 'paid' ? 'ship' : 'detail',order.order_id)}
                    >
                       View order
                    </button>)}

                    {order.status_order === 'pending' && (
                    <p className="pending-text">Pending</p>)}
                    
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;