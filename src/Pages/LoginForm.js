import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { loginApi } from '../Services/Auth';


const LoginForm = ({ onLogin, onRegister, onForgot }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit (e) {
    e.preventDefault();
    // Perform validation if needed
    // For simplicity, we're assuming validation is done on the server-side
    // Here, we'll just pass the username and password to the onLogin callback
    let token = "";
    let role = "";
    let data = JSON.stringify({
      "username": username,
      "password": password
    });
    
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://localhost:3030/api/v1/auth/login',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };
    
    await axios.request(config)
    .then((response) => {
      token = response.data.data;
      role = response.data.role[0];
      onLogin({ token, role });
    })
    .catch((error) => {
      onLogin({ token, role });
    });
    
  };



  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title text-center">Login</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Login
                </button>
              </form>

              <div style={{ display: 'flex', justifyContent: 'space-between', margin: '10px 50px 0px 50px' , }}>
              <button
                  className="btn btn-link"
                  onClick={onRegister} // Trigger registration
                >
                  Register
                </button>
                <button
                  className="btn btn-link"
                  onClick={onForgot} // Trigger forgot password
                >
                  Forgot Password?
                </button>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
