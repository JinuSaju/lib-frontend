/*import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginPage.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Login button clicked');
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', {
        email,
        password
      });
  
      // Login successful
      alert('Login successful!');
      
      // Store user info in localStorage
      localStorage.setItem('userDetails', JSON.stringify(response.data.user)); // Corrected to use response.data.user
      
      // Redirect to home page
      navigate('/home');
    } catch (error) {
      console.error('Login error:', error.response ? error.response.data : error.message);
      alert(error.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Welcome Back!</h1>
        <p className="login-subtitle">Log in to access your account</p>
        <form onSubmit={handleSubmit} className="login-form">
          <label htmlFor="email" className="form-label">Email:</label>
          <input
            type="email"
            id="email"
            className="input-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />

          <label htmlFor="password" className="form-label">Password:</label>
          <input
            type="password"
            id="password"
            className="input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />

          <button type="submit" className="submit-button">Login</button>
        </form>

        <p className="signup-text">
          Don't have an account? <a href="/signup" className="signup-link">Sign Up</a>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;*/

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginPage.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset previous errors
    setError('');
    
    // Start loading
    setLoading(true);

    try {
      // Input validation
      if (!email || !password) {
        setError('Please enter both email and password');
        setLoading(false);
        return;
      }

      console.log('Login attempt for:', email);

      const response = await axios.post('http://localhost:5000/api/users/login', {
        email,
        password
      });
  
      // Login successful
      console.log('Login successful', response.data);
      
      // Stop loading
      setLoading(false);
      
      // Store user email for profile fetching
      localStorage.setItem('userEmail', email);
      
      // Store user details 
      localStorage.setItem('userDetails', JSON.stringify(response.data.user));
      
      // Optional: Store token if your backend provides one
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      
      // Redirect to profile page
      navigate('/home');
    } catch (error) {
      // Stop loading
      setLoading(false);
      
      // Detailed error handling
      console.error('Login error:', error);
      
      if (error.response) {
        // The request was made and the server responded with a status code
        setError(error.response.data.message || 'Login failed. Please try again.');
      } else if (error.request) {
        // The request was made but no response was received
        setError('No response from server. Please check your network connection.');
      } else {
        // Something happened in setting up the request
        setError('An unexpected error occurred');
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Welcome Back!</h1>
        <p className="login-subtitle">Log in to access your account</p>
        
        {/* Error Message */}
        {error && (
          <div className="error-message" style={{
            color: 'red',
            marginBottom: '15px',
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="login-form">
          <label htmlFor="email" className="form-label">Email:</label>
          <input
            type="email"
            id="email"
            className="input-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />

          <label htmlFor="password" className="form-label">Password:</label>
          <input
            type="password"
            id="password"
            className="input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />

          <button 
            type="submit" 
            className="submit-button"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="signup-text">
          Don't have an account? <a href="/signup" className="signup-link">Sign Up</a>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;