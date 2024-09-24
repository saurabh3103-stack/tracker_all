import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/Kanpur_Police.png'
// import './login.css';

function Login() {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Form data state to manage email and password together
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  useEffect(() => {
    // Add class to body when the component mounts
    document.body.classList.add('bg-one');

    // Cleanup: remove the class when the component unmounts
    return () => {
      document.body.classList.remove('bg-one');
    };
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData); // Correctly prints formData

    // Dummy login check (replace with actual authentication)
    if (formData.email === 'admin@gmail.com' && formData.password === '123456') {
      localStorage.setItem('session', 'true'); // Set session
      console.log('Login Success');
      navigate('/dashboard'); // Navigate to dashboard after login
    } else {
      setError('Invalid email or password');
      console.log('Login Fail');
    }
  };


  
  return (
    <>
      <div className="container mt-5 pt-5">
        <div className="row justify-content-center">
          <div className="col-xxl-4 col-xl-4 col-lg-5 col-md-6 col-sm-6 col-12">
            <div className="bg-white rounded-3 p-4">
              <div className="login-form">
                <a href="/" className="mb-4 d-flex">
                  <img src={logo} className="img-fluid login-logo" alt="Mars Admin Dashboard" />
                </a>
                <h3 className="mt-2 mb-2 text-center">Login</h3>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <div className="mb-3">
                  <label className="form-label">Your Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    id="email"
                    className="form-control"
                    placeholder="Enter your email"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Your Password</label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    id="password"
                    className="form-control"
                    placeholder="Enter your password"
                  />
                </div>
                <div className="d-grid py-3 mt-3">
                  <button
                    type="submit"
                    onClick={handleLogin}
                    className="btn btn-lg btn-primary"
                  >
                    LOGIN
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
