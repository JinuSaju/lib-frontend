import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LandingPage.css';


const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
       <img
        src="https://i.imgur.com/Ma8nGO0.png"
        alt="Book Cover"
        className="book-image"
        style={{ maxWidth: '400px', height: 'auto' }} // Corrected style prop
      />
      <h1>Welcome to Our Bookstore</h1>
      <p>Select an option to proceed:</p> 
      <div className="card" onClick={() => navigate('/user-login')}>
        <h2>User Login</h2>
      </div>
      <div className="card" onClick={() => navigate('/admin-login')}>
        <h2>Admin Login</h2>
      </div>
    </div>
  );
};

export default LandingPage;
