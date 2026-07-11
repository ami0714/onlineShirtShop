import { useState, useEffect } from 'react';
import {apiRequest} from '../utils/apiHelper'
import {useNavigate} from 'react-router-dom'







export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {

      const data = {
        email: email,
        password:password


      }


      // Guna helper universal tadi untuk hantar ke PHP
      const result = await apiRequest('loginApi.php', data);
      
      // Jika PHP pulangkan token, simpan dalam LocalStorage
      if (result.token && result.role === 'user') {
        localStorage.setItem('user_token', result.token);
        setUser(result.user); // Simpan info user (nama, role) dalam state
      }else if (result.token && result.role === 'admin') {
        localStorage.setItem('admin_token', result.token);
        setUser(result.user); // Simpan info user (nama, role) dalam state
      }
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email,phone, password) => {
    setLoading(true);
    setError(null);
    try {

      const data = {
        username: name,
        email:email,
        phone:phone,
        password:password


      }
      const result = await apiRequest('registerApi.php', data );
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  

  const logout = () => {
    localStorage.removeItem('user_token');
    localStorage.removeItem('admin_token');
    setUser(null);
  };

  return { user, loading, error, login, register, logout };
}














export function useUserData() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchUserData = async () => {
      const token = localStorage.getItem('user_token');
      
      if (!token) {
        setIsLoggedIn(false);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        // Hantar token di dalam body POST ke PHP untuk disahkan
        const response = await apiRequest('getUserDataApi.php',  {token} );

        if (response.status === 'success') {
          setUsername(response.username);
          setEmail(response.email);
          setPhone(response.phone)
          setRole(response.role);
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("Gagal mendapatkan data user:", error);
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {

    fetchUserData();
  }, []);

  const updateProfile = async (name, email, phone) => {
    const token = localStorage.getItem('user_token');
    
    // Keselamatan tambahan: pastikan token ada sebelum cuba hantar
    if (!token) {
      return { status: 'error', message: 'Sesi tamat, sila log masuk semula.' };
    }
    
    try {
      const data = {
        token: token,
        username: name,
        email: email,
        phone: phone
      };
      
      // Dibetulkan ejaan fail jika nama fail sebenar ialah UpdateProfile.php
      const result = await apiRequest('UpdateProfile.php', data);
      
      // PENAMBAHBAIKAN KRITIKAL: Kemas kini state tempatan serta-merta jika berjaya
      if (result.status === 'success') {
        console.log(result)
      }

      return result;
    } catch (err) {
      console.error("Gagal kemas kini profil:", err);
      throw err;
    } 
  };




  return { username, email,phone, role, isLoggedIn,updateProfile,fetchUserData };
}





export function useUserCart() {

   const [cartData,setCartData] = useState([]);
   const [cartLength,setCartLength] = useState(0);
   const [shipingFee, setShippingFee] = useState(null)
   const [loading, setLoading] = useState(true);

   const fetchUserCart = async () => {

      const token = localStorage.getItem("user_token");

      if (!token) { setCartData([]); setCartLength(0); setLoading(false); return; }

        try {
          setLoading(true);

          const response = await apiRequest("getUserCartApi.php",{token});

      if(response.status==="success"){
         setCartData(response.cartData);
         setCartLength(response.cartLength);
         setShippingFee(response.shippingFee)
      }

        } catch (error) { 
          console.error("Gagal mendapatkan data cart user:", error);

        } finally { 
          setLoading(false); 

        }

      

   }

   useEffect(()=>{
      fetchUserCart();
   },[]);

   return {
      cartData,
      cartLength,
      shipingFee,
      loading,
      fetchUserCart
   }

}



export function useUpdateCart() {
  const navigate = useNavigate()
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);



  const handleAddCart = async (productId,size,color) => {
    const token = localStorage.getItem('user_token');

    if (!token) {
      setError("Sila log masuk terlebih dahulu");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setMessage("");

      // Satukan token dan cart_id dalam SATU objek POST
      const response = await apiRequest('updateCartApi.php', { 
        token: token, 
        productId: productId,
        size:size,
        color:color,
        action: 'add' 
      });

      if (response.status === 'success') {
        setMessage(response.message);
        navigate('/cart')
        console.log(response)
        return true; // Pulangkan true supaya komponen boleh tahu untuk refresh state senarai cart
      } else {
        setError(response.message || 'Gagal tambah barang dari troli');
        return false;
      }
    } catch (err) {
      console.error("Ralat padam item cart:", err);
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };







  // Kita keluarkan fungsi dari useEffect supaya butang dekat UI boleh panggil pabila di-klik
  const handleDeleteCart = async (cartId) => {
    const token = localStorage.getItem('user_token');

    if (!token) {
      setError("Sila log masuk terlebih dahulu");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setMessage("");

      // Satukan token dan cart_id dalam SATU objek hantaran POST
      const response = await apiRequest('updateCartApi.php', { 
        token: token, 
        cart_id: cartId,
        action: 'delete' // Bagus letak action ni kalau nanti nak guna fail yang sama untuk 'update_quantity'
      });

      if (response.status === 'success') {
        setMessage(response.message);
        

        return true; // Pulangkan true supaya komponen boleh tahu untuk refresh state senarai cart
      } else {
        setError(response.message || 'Gagal memadam barang dari troli');
        return false;
      }
    } catch (err) {
      console.error("Ralat padam item cart:", err);
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };



  const handleCartQuantity = async (cartId,Qvalue) => {
    const token = localStorage.getItem('user_token');

    if (!token) {
      setError("Sila log masuk terlebih dahulu");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setMessage("");

      // Satukan token dan cart_id dalam SATU objek hantaran POST
      const response = await apiRequest('updateCartApi.php', { 
        token: token, 
        cart_id: cartId,
        action: 'update',
        newQuantity: Qvalue 
      });

      if (response.status === 'success') {
        setMessage(response.message);
        

        return true; // Pulangkan true supaya komponen boleh tahu untuk refresh state senarai cart
      } else {
        setError(response.message || 'Gagal tambah kuantiti barang dari troli');
        return false;
      }
    } catch (err) {
      console.error("Ralat padam item cart:", err);
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    handleAddCart,
    handleDeleteCart,
    handleCartQuantity, // Eksport fungsi ini untuk diletakkan pada onClick button
    message,
    error,
    loading
  };
}


export function useCreateOrder() {
  const navigate = useNavigate()
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [url,SetUrl]= useState('')



  const HandlePayment = async (address) => {
    const token = localStorage.getItem('user_token');

    if (!token) {
      setError("Sila log masuk terlebih dahulu");
      return;
    }

    if (!address) {
      setError("Sila masukkan alamat penghantaran");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setMessage("");

      // Hantar token dan alamat sahaja. PHP akan kira total harga berdasarkan database.
      const response = await apiRequest('createOrderApi.php', { token, address });

      if (response.status === 'success' && response.payment_url) {
        setMessage("Lencongan ke gateway pembayaran...");
        
        // ke halaman ToyyibPay
        window.location.href = response.payment_url; 
        
        return true; 
      } else {
        setError(response.message || 'Gagal mencipta pesanan');
        return false;
      }
    } catch (err) {
      console.error("Ralat pembayaran:", err);
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };



  return {
  
    HandlePayment,
    message,
    error,
    loading
  };
}











export function useUserOrder() {
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUserOrder = async () => {
    const token = localStorage.getItem("user_token");


    if (!token) { 
      setOrderData([]); 
      setLoading(false); 
      return; 
    }

    try {
      setLoading(true);


      const response = await apiRequest("getOrderDetailApi.php", { token });

      if (response.status === "success") {

        setOrderData(response.data);
      }
    

    } catch (error) { 
      console.error("Gagal mendapatkan data order user:", error);
    } finally { 
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchUserOrder();
  }, []);


   const handleCancelOrder = async (billcode) => {
  const token = localStorage.getItem('user_token');

  // 1.  check token & billcode, kalau takde terus return false
  if (!token || !billcode) {
    return false;
  }

  try {
    // 2. Hantar token dan billcode ke PHP untuk proses pembersihan DB
    const response = await apiRequest('cancel_order.php', { token, billcode: billcode});

    if (response.status === 'success') {
      console.log("Sistem :", response.message);
      return true; 
    } else {
      
      console.error(response.message || 'Gagal membatalkan pesanan');
      return false;
    }
  } catch (err) {
    console.error("Ralat ketika membatalkan order:", err);
    
    return false;
  }
};


//-----fungsi untuk update status order------

const handleReceiveOrder = async (orderId) => {
  const token = localStorage.getItem('user_token');

  // 1.  check token & billcode, kalau takde terus return false
  if (!token) {
    return false;
  }

  try {
    // 2. Hantar token dan billcode ke PHP untuk proses pembersihan DB
    const response = await apiRequest('updateStatus.php', { token, orderId: Number(orderId)});

    if (response.status === 'success') {
      console.log("Sistem message:", response.message);
      return true; 
    } else {
      
      console.error(response.message || 'Gagal membatalkan pesanan baki.');
      return false;
    }
  } catch (err) {
    console.error("Ralat ketika membatalkan order:", err);
    
    return false;
  }
};


  

  return {
    orderData,
    handleReceiveOrder,
    fetchUserOrder,
    handleCancelOrder,
    loading
  };
}






