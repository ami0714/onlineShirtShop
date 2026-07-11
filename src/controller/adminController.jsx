import { useState, useEffect } from 'react';
import { apiRequest } from '../utils/apiHelper';
import { useNavigate } from 'react-router-dom';



export function useAdminDashBoard() {
  const [dashboardData, setDashboardData] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem("admin_token");

      const response = await apiRequest("Admin/getAdminDashboard.php", { token });
     
      setMessage(response.message);
      if (response.status === "success") {
        setDashboardData( response);
      } else {
        setMessage(response.message || 'Gagal mengambil data dashboard');
      }
    } catch (err) {
      console.error("Ralat fetching dashboard data: ", err);
      setError(err.message || 'Ralat sistem');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
    
  }, []);





const fetchRecentOrder = async () => {
    try {
     
      
      const token = localStorage.getItem("admin_token");

      const response = await apiRequest("Admin/getRecentOrderDetail.php", { token });
      
      setMessage(response.message);
      if (response.status === "success") {
        setRecentOrders(response.recent_orders);
      } else {
        setMessage(response.message || 'Gagal mengambil data recent orders');
      }
    } catch (err) {
      console.error("Ralat fetching recent orders: ", err);
      setError(err.message || 'Ralat sistem');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecentOrder();
  }, []);









  return { 
    dashboardData,
    recentOrders, 
    loading, 
    error,
    message
  };
}



export function useOrderDetail(orderId) {
  const [orderDetail, setOrderDetail] = useState([]);
  const [courierList, setCourierList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchRecentOrder = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("admin_token");
        // Hantar skali orderId ke PHP
        const response = await apiRequest('Admin/getCustOrderDetail.php', { token, orderId: orderId });

        if (response.status === "success") {
          setOrderDetail(response?.data);
          setCourierList(response?.courierList); // Pastikan courier_list wujud
        }
      } catch (err) {
        setError(err.message || 'Ralat sistem');
      } finally {
        setLoading(false);
      }
    };

    if (orderId) {
      fetchRecentOrder();
    }
  }, [orderId]); // 

  const [updating, setUpdating] = useState(false);

const shipOrder = async (courier, trackingNumber, orderId) => {
    if (!courier || !trackingNumber) {
      alert("Sila pilih kurier dan isi no tracking terlebih dahulu!");
      return;
    }

    try {
      setUpdating(true); // Hidupkan loading dekat butang
      const token = localStorage.getItem("admin_token");
      
      // Hantar data ke fail PHP update baharu
      const response = await apiRequest("Admin/updateShipment.php", {
        token,
        orderId: orderId,
        courier: courier,
        trackingNumber: trackingNumber
      });

      if (response.status === "success") {
        alert("Order berjaya dihantar!");
        navigate("/admin/HomeAdmin"); // Redirect ke halaman dashboard selepas berjaya
      } else {
        alert(response.message || "Gagal mengemas kini tracking");
      }
    } catch (err) {
      alert("Ralat menghantar data: " + err.message);
    } finally {
      setUpdating(false); // Matikan loading dekat butang
    }
  };








  return { orderDetail, courierList, shipOrder,updating, loading, error };
}




export function useProduct() {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);

        const token = localStorage.getItem("admin_token");
        const response = await apiRequest("Admin/getProductAdmin.php", { token });

        if (response.status === "success") {
          setProduct(response.products);
        } else {
          setError(response.message || 'Gagal mengambil data produk');
        }


      } catch (err) {
        setError(err.message || 'Ralat sistem');
      } finally {
        setLoading(false);
      }
    };

    
      fetchProduct();
    
  }, []); // 


  return { product, loading, error };



}




export function useGetDetailproduct(idProduct) {
  const [product, setProduct] = useState([]);
  const [variants, setVariants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

   const fetchDetail = async () => {

      try {

        setLoading(true);
        setError(null);

        const token = localStorage.getItem("admin_token");

        const response = await apiRequest(
          "Admin/getProductDetailAdmin.php",
          {
            token:token,
            productId:idProduct
          }
        );

        if (response.status == "success") {

          setProduct(response.products?.[0] || null);
          setVariants(response.variants || []);
          

        } else {

          setError( "Produk tidak dijumpai" ) ;

        }

      } catch (err) {

        setError(err.message || "Ralat sistem") ;

      } finally {

        setLoading(false);

      }

    };

   


  useEffect(() => {

    if (!idProduct) {
      setLoading(false);
      return;
    }
     fetchDetail();

   

  }, [idProduct]);

  return {
    fetchDetail,
    product,
    variants,
    loading,
    error
  };
}

export function useUpdateProduct() {
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);



  const UpdateProduct = async (formData) => {
    

    if (!formData) {
      setError("Sila pastikan data ada");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setMessage("");

      // Satukan token dan cart_id dalam SATU objek POST
      const response = await apiRequest('Admin/updateProductApi.php', formData);

      if (response.status === 'success') {
        setMessage(response.message);
        console.log(response)
        return true; // Pulangkan true supaya komponen boleh tahu untuk refresh state senarai cart
      } else {
        setError(response.message);
        return false;
      }
    } catch (err) {
      console.error("Ralat update:", err);
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };


  return {
    UpdateProduct,
    message,
    error,
    loading
  };
}



