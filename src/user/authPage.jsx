// AuthPage.jsx
import React, { useState,useEffect
 } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../css/auth.css';
import illustrationImg from '../assets/irvan-maulana-qnAZB4mxpJE-unsplash.jpg';
import {Link, useNavigate} from 'react-router-dom'
import {useAuth} from '../controller/userController'

const AuthPage = () => {
  const navigate = useNavigate()
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [phone,setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [message,setMessage] = useState('');
  const [isSuccess,setIsSuccess] = useState(null)

  const {login, register, loading} = useAuth()

const handleRegisterSubmit = async (e) =>{
  e.preventDefault();

 try {

  const data = await register(username, email,phone, password);

   data.status == 'success'?
   
   setMessage(data.message)
  
   :
    setMessage(data.message)

    data.status =='success'?
     setIsSuccess(true)
     :
      setIsSuccess(false)




  
 } catch (error) {
  
 }

} 

const handleLoginSubmit = async (e) =>{
  e.preventDefault();
 try {

  const data = await login(email, password);
     
   data.status == 'success' && data.role =='user' ?
   navigate('/HomeUser'):
    data.status == 'success' && data.role ==='admin' ?
    navigate('/Admin/HomeAdmin'):
    console.error('gagal login')




  
 } catch (error) {
  
 }

}


  const toggleMode = () => setIsLogin(!isLogin);
  useEffect(() => {
    const userToken = localStorage.getItem('user_token');
    const adminToken = localStorage.getItem('admin_token');

    if (userToken !== null) {
      navigate('/HomeUser');
    } else if (adminToken !== null) {
      navigate('/Admin/HomeAdmin');
    }
  }, [navigate]);

  return (
    <div className="auth-page">
     
      <header className="auth-header">WELCOME TO THREAD STUDIO</header>

      {isSuccess == true && isLogin==false?
      <motion.section 
       initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }} 
      className='message'>
        <p><strong>{message}</strong></p>
      </motion.section>
      :
      <p></p> 
      
    }

      

      <div className="auth-wrapper">
      
        <motion.div 
          className="auth-card" 
          layout 
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
        >
          
        
          <motion.div 
            className="auth-visual" 
            layout
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
            /* 
              isLogin = true (Login) : order 2 (Kanan)
              isLogin = false (Register) : order 1 (Kiri)
            */
            style={{ order: isLogin ? 2 : 1 }}
          >
            <img 
              src={illustrationImg} 
              alt="Shopping Illustration" 
              className="illustration-img" 
            />
          </motion.div>

          {/* --- Bahagian Kiri/Kanan: Borang --- */}
          <motion.div 
            className="auth-form" 
            layout
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
            /* 
              isLogin = true (Login) : order 1 (Kiri)
              isLogin = false (Register) : order 2 (Kanan)
            */
            style={{ order: isLogin ? 1 : 2 }}
          >
            
            {/* 
              AnimatePresence + mode="wait" memastikan borang lama 
              hilang dulu sebelum borang baru muncul dengan animasi silang.
            */}
            <AnimatePresence mode="wait">
              {isLogin ? (
                <motion.div
                  key="login"
                  className="form-content"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="form-title">LOGIN</h2>
                  <input onChange={(e)=> setEmail(e.target.value)} type="email" placeholder="Email" className="auth-input" />
                  <input onChange={(e)=> setPassword(e.target.value)} type="password" placeholder="Password" className="auth-input" />
                  <Link to='/HomeUser'>
                    <button className="auth-btn" onClick={handleLoginSubmit}

                    >
                      LOGIN
                    </button>
                  </Link>
                  <p className="auth-switch" onClick={toggleMode}>
                    don't have account? <span>Register now</span>
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="register"
                  className="form-content"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="form-title">Register</h2>
                  <input onChange={(e)=> setUsername(e.target.value)} type="text" placeholder="Username" className="auth-input" />
                  <input onChange={(e)=> setEmail(e.target.value)} type="email" placeholder="Email" className="auth-input" />
                  <input onChange={(e)=> setPhone(e.target.value)} type="phone" placeholder="Phone" className="auth-input" />
                  <input onChange={(e)=> setPassword(e.target.value)} type="password" placeholder="Password" className="auth-input" />
                  <button className="auth-btn" onClick={handleRegisterSubmit}>
                    REGISTER
                  </button>
                  <p className="auth-switch" onClick={toggleMode}>
                    Already have account? <span>login now</span>
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default AuthPage;