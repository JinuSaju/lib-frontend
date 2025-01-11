import React from "react";

const ProfileView = ({ user, onEdit }) => {
  // Destructure user details with fallback to empty string or 'N/A'
  const { 
    username = 'N/A', 
    email = 'N/A', 
    phone = 'N/A', 
    age = 'N/A', 
    place = 'N/A', 
    education = 'N/A' 
  } = user || {};

  return (
    <div className="profile-view">
      <h2 className="profile-section-title">Personal Details</h2>
      <div className="profile-info">
        <p><strong>Name:</strong> {username}</p>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Contact:</strong> {phone}</p>
        <p><strong>Age:</strong> {age}</p>
        <p><strong>Address:</strong> {place}</p>
        <p><strong>Education:</strong> {education}</p>
      </div>
      <button onClick={onEdit} className="edit-button">Edit Profile</button>
    </div>
  );
};

export default ProfileView;