import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';
import './Navbar.css';

const NavbarAdmin = () => {
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
          <Link to="/admin-dashboard" className="navbar-icon">
             Dashboard
          </Link>
        </li>
        <li>
          <Link to="/admin-rent" className="navbar-icon">
            Request
          </Link>
        </li>
        <li>
          <Link to="/admin/users" className="navbar-icon">
            Users
          </Link>
        </li>
       
      </ul>
      <button className="navbar-icon logout-button" onClick={handleLogout}>
        <FaSignOutAlt size={24} /> Log Out
      </button>
    </nav>
  );
};

export default NavbarAdmin;
