import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminDashboard from './components/AdminDashboard';
import LandingPage from './components/LandingPage';
import AdminLogin from './components/AdminLogin';

import EmailForm from './components/EmailForm';
import AdminUserDetails from './components/AdminUserDetails';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import HomePage from './pages/HomePage';
import ProfilePage from './components/ProfilePage'; 
import Navbar from './components/Navbar'; // Import Navbar
import AdminUserManagement from './components/AdminUserManagement';
const App = () => {
  return (
    <div>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage/>} /> {/* No Navbar here */}
        <Route path="/user-login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/contact" element={<EmailForm />} />
        {/* HomePage and ProfilePage with Navbar */}
        <Route path="/home" element={<><Navbar /><HomePage /></>} /> 
        <Route path="/profile" element={<><Navbar /><ProfilePage /></>} /> 

        {/* Admin Routes */}
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<AdminUserManagement />} />
        <Route path="/admin/user/:id" element={<AdminUserDetails />} />
        

        {/* Fallback Route */}
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
    </div>
  );
};

export default App;
