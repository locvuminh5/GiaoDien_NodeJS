import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import LoginForm from './Pages/LoginForm';
import AdminPanel from './Pages/AdminPanel';
import UserPanel from './Pages/UserPanel';
import RegisterForm from './Pages/RegisterForm';
import ForgotPasswordForm from './Pages/ForgotPasswordForm';
import { useNavigate } from 'react-router-dom';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    // Check if token exists in local storage or session storage
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if (token) {
      if (role === "admin") {
        setIsAdmin(true);
      }
      // Verify token on the server-side (e.g., send token to Node.js server for verification)
      // If token is valid, set isLoggedIn to true
      setIsLoggedIn(true);
    }

  }, []); // Only run this effect once when the component mounts

  //Call api
  const handleRegisterApi = async ({ token }) => {
    // Perform registration logic here
    // console.log(`Registering user with username: ${username}, email: ${email}, password: ${password}`);
    // For simplicity, we'll just set isLoggedIn to true to simulate successful registration
    // RegisterApi(username, email, password);
    if (token === "") {

    } else {
      alert("Đăng ký thành công. Chuyển đến trang chủ!!!!");
      localStorage.setItem('token', token);
      // console.log(response.data.data)
      setIsLoggedIn(true);
      setIsAdmin(false);
    }
  };

  //Functions
  const handleLogin = ({ token, role }) => {
    // Set token in local storage or session storage upon successful login
    // console.log(token, role);
    if (role === "" || token === "") {
      alert("Lỗi")
    } else {
      localStorage.setItem('token', token);
      document.cookie = 'token = ' + token;
      if (role === "admin") {
        localStorage.setItem('role', role);
        setIsAdmin(true);
      }
      setIsLoggedIn(true);
    }
  };

  const handleLogout = () => {
    // Remove token from local storage or session storage upon logout
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/');
    setIsLoggedIn(false);
    setIsAdmin(false);
    handleBackToLogin();
  };

  const handleRegister = () => {
    setShowRegister(true);
  };

  const handleForgotPassword = () => {
    setShowForgotPassword(true);
  };

  const handleBackToLogin = () => {
    setShowRegister(false); // Hide the RegisterForm
    setShowForgotPassword(false); // Hide the ForgotPasswordForm
  };



  const handleForgotPasswordApi = ({ email }) => {
    // Perform forgot password logic here
    console.log(`Resetting password for email: ${email}`);
  };


  return (
    <div style={{
      // background: "#1f2025"
    }}>
      {isLoggedIn ? (
        <>
          {isAdmin ? (
            <AdminPanel onLogout={handleLogout} />
          ) : (
            <UserPanel onLogout={handleLogout} />
          )}
        </>
      ) : (
        <>
          {showRegister ? (
            <RegisterForm onRegister={handleRegisterApi} onBack={handleBackToLogin} />
          ) : showForgotPassword ? (
            <ForgotPasswordForm onForgot={handleForgotPasswordApi} onBack={handleBackToLogin} />
          ) : (
            <LoginForm
              onLogin={handleLogin}
              onRegister={handleRegister}
              onForgot={handleForgotPassword}
            />
          )}
        </>
      )}
    </div>
  );

  
}

export default App;
