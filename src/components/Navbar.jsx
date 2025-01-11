import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate(); // Hook to programmatically navigate

  const handleLogout = () => {
    // Clear any user-related data (if necessary)
    localStorage.removeItem('userToken'); // Example: Remove token from localStorage
    navigate('/'); // Redirect to login page
  };

  return (
    <nav className="navbar">
      <a href="/" className="logo">Library</a>
      <ul className="nav-links">
        <li>
          <Link to="/home" className="navbar-icon">
             Home
          </Link>
        </li>
        
        <li>
          <Link to="/profile" className="navbar-icon">
            Profile
          </Link>
        </li>
        <li>
          <Link to="/contact" className="navbar-icon">
            Contact Us
          </Link>
        </li>
      </ul>
      <button className="navbar-icon logout-button" onClick={handleLogout}>
        <FaSignOutAlt size={24} /> Log Out
      </button>
    </nav>
  );
};

export default Navbar;
