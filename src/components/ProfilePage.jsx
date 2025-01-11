// ProfilePage.js

/*import React, { useState, useEffect } from "react";
import ProfileView from "./ProfileView";
import EditProfileForm from "./EditProfileForm";
import "./ProfilePage.css"; // Import the external CSS file

const ProfilePage = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    contact: "",
    age: "",
    address: "",
    education: "",
    rentedBookCount: 0,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);  // To handle loading state
  const [error, setError] = useState(null);      // To handle errors during fetch

  // Simulate API call to fetch user details
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      try {
        // Simulate fetching user data from an API
        const fetchedUser = {
          name: "Amith",
          email: "abcd@gmail.com",
          contact: "1234567890",
          age: 19,
          address: "Trivandrum, Kerala",
          education: "Bachelor's in Computer Science",
          rentedBookCount: 5,
        };
        setUser(fetchedUser);
      } catch (error) {
        setError("Failed to load user data");
      } finally {
        setLoading(false);
      }
    }, 500);
  }, []);

  // Save the updated user information
  const handleSave = (updatedUser) => {
    setLoading(true);
    setTimeout(() => {
      setUser(updatedUser);
      setIsEditing(false);
      setLoading(false);
    }, 500);
  };

  if (loading) {
    return <div className="loading-message">Loading...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="profile-page-container">
      <div className="profile-card">
        <h1 className="profile-title">User Profile</h1>
        {isEditing ? (
          <EditProfileForm
            user={user}
            onSave={handleSave}
            onCancel={() => setIsEditing(false)}
          />
        ) : (
          <ProfileView user={user} onEdit={() => setIsEditing(true)} />
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
*/

import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ProfileView from "./ProfileView";
import EditProfileForm from "./EditProfileForm";
import "./ProfilePage.css";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({
    user: null,
    isEditing: false,
    loading: true,
    error: null
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        // Update loading state
        setProfileData(prev => ({ ...prev, loading: true }));
        
        // Retrieve email
        const userEmail = 
          localStorage.getItem('userEmail') || 
          JSON.parse(localStorage.getItem('userDetails'))?.email;
        
        console.log("Retrieved email:", userEmail);

        // Comprehensive email validation
        if (!userEmail) {
          // If no email found, redirect to login
          console.error('No user email found');
          navigate('/login');
          return;
        }

        console.log("Fetching profile for email:", userEmail);

        const response = await axios.post(
          'http://localhost:5000/api/users/profile', 
          { email: userEmail }
        );

        console.log("User profile response:", response.data);
        
        // Update state with user data
        setProfileData(prev => ({
          ...prev,
          user: response.data,
          loading: false,
          error: null
        }));
      } catch (err) {
        console.error("Full error object:", err);
        
        // Detailed error handling
        let errorMessage = "Failed to load user data";
        
        if (err.response) {
          console.error("Error response data:", err.response.data);
          console.error("Error response status:", err.response.status);
          
          // If unauthorized or session expired, redirect to login
          if (err.response.status === 401 || err.response.status === 403) {
            navigate('/login');
          }
          
          errorMessage = err.response.data.message || errorMessage;
        } else if (err.request) {
          console.error("No response received:", err.request);
          errorMessage = "No response from server. Please check your network connection.";
        } else {
          console.error("Error setting up request:", err.message);
        }
        
        // Update state with error
        setProfileData(prev => ({
          ...prev,
          loading: false,
          error: errorMessage
        }));
      }
    };

    fetchUserProfile();
  }, [navigate]);

  // Handler for saving profile
  const handleSaveProfile = async (updatedUser) => {
    try {
      // Update loading state
      setProfileData(prev => ({ ...prev, loading: true }));
      
      // Retrieve email
      const userEmail = 
        localStorage.getItem('userEmail') || 
        JSON.parse(localStorage.getItem('userDetails'))?.email;
      
      if (!userEmail) {
        throw new Error('No user email found');
      }

      // First, fetch the user to get the ID
      const userResponse = await axios.post(
        'http://localhost:5000/api/users/profile', 
        { email: userEmail }
      );
      
      const userId = userResponse.data._id;

      console.log("Attempting to update user profile:", updatedUser);
      
      const response = await axios.put(
        `http://localhost:5000/api/users/profile/${userId}`, 
        updatedUser
      );
      
      console.log("Profile update response:", response.data);
      
      // Update state with new user data
      setProfileData(prev => ({
        ...prev,
        user: response.data,
        isEditing: false,
        loading: false,
        error: null
      }));
    } catch (err) {
      console.error("Profile update error:", err);
      
      const errorMessage = err.response?.data?.errors 
        ? Object.values(err.response.data.errors).join(', ')
        : "Failed to update profile";
      
      // Update state with error
      setProfileData(prev => ({
        ...prev,
        loading: false,
        error: errorMessage
      }));
    }
  };

  // Toggle editing mode
  const toggleEditMode = () => {
    setProfileData(prev => ({
      ...prev,
      isEditing: !prev.isEditing
    }));
  };

  // Render loading state
  if (profileData.loading) {
    return <div className="loading-message">Loading...</div>;
  }

  // Render error state
  if (profileData.error) {
    return <div className="error-message">{profileData.error}</div>;
  }

  // Render profile view or edit form
  return (
    <div className="profile-page-container">
      <div className="profile-card">
        <h1 className="profile-title">User Profile</h1>
        {profileData.isEditing ? (
          <EditProfileForm
            user={profileData.user}
            onSave={handleSaveProfile}
            onCancel={toggleEditMode}
          />
        ) : (
          <ProfileView 
            user={profileData.user} 
            onEdit={toggleEditMode} 
          />
        )}
      </div>
    </div>
  );
};

export default ProfilePage;