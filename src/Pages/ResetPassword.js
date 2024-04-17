import { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';

const ResetPasswordForm = ({ }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform validation if needed
    // For simplicity, we're assuming validation is done on the server-side
    // Here, we'll just pass the email to the onResetPassword callback
    // onForgot({ email });
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title text-center">
                <FaArrowLeft onClick={() => {}} style={{ position: 'absolute', top: '20px', left: '16px', cursor: 'pointer' }} />
                Reset Password
              </h3>
              <form onSubmit={handleSubmit}>
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
                <button type="submit" className="btn btn-primary w-100">
                  Reset Password
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
