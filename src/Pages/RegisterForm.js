import { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import axios from 'axios';

const RegisterForm = ({ onRegister, onBack }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    // Perform validation if needed
    // For simplicity, we're assuming validation is done on the server-side
    // Here, we'll just pass the registration details to the onRegister callback
    let token = "";

    let data = JSON.stringify({
      "username": username,
      "password": password,
      "email": email,
      "role": [
        "user"
      ]
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://localhost:3030/api/v1/auth/register',
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };

    await axios.request(config)
      .then((response) => {
        if (response.status == 200) {
          token = response.data.data;
          onRegister({ token });
        } else {
          alert("thông báo lỗi");
        }
      })
      .catch((error) => {
        alert("thông báo lỗi");
        console.log(error);
      });
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title text-center">
                <FaArrowLeft onClick={onBack} style={{ position: 'absolute', top: '20px', left: '16px', cursor: 'pointer' }} />
                Register
              </h3>
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
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
