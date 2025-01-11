/*import React, { useState } from "react";

const EditProfileForm = ({ user, onSave, onCancel }) => {
  const [formData, setFormData] = useState(user);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const validationErrors = {};
    if (!formData.name) validationErrors.name = "Name is required.";
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      validationErrors.email = "Please enter a valid email.";
    }
    if (!formData.contact || formData.contact.length !== 10) {
      validationErrors.contact = "Contact number should be 10 digits.";
    }
    if (!formData.age || formData.age <= 0) {
      validationErrors.age = "Please enter a valid age.";
    }
    return validationErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      onSave(formData);
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="edit-profile-form">
      <h2 className="form-title">Edit Profile</h2>
      <div className="form-group">
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-input"
          />
        </label>
        {errors.name && <p className="error-message">{errors.name}</p>}
      </div>
      <div className="form-group">
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-input"
          />
        </label>
        {errors.email && <p className="error-message">{errors.email}</p>}
      </div>
      <div className="form-group">
        <label>
          Contact:
          <input
            type="text"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            className="form-input"
          />
        </label>
        {errors.contact && <p className="error-message">{errors.contact}</p>}
      </div>
      <div className="form-group">
        <label>
          Age:
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="form-input"
          />
        </label>
        {errors.age && <p className="error-message">{errors.age}</p>}
      </div>
      <div className="form-group">
        <label>
          Address:
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="form-input"
          />
        </label>
      </div>
      <div className="form-group">
        <label>
          Education:
          <input
            type="text"
            name="education"
            value={formData.education}
            onChange={handleChange}
            className="form-input"
          />
        </label>
      </div>
      <div className="form-buttons">
        <button
          type="submit"
          className="save-button"
          disabled={Object.keys(errors).length > 0}
        >
          Save
        </button>
        <button type="button" onClick={onCancel} className="cancel-button">
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditProfileForm;*/

import React, { useState } from "react";

const EditProfileForm = ({ user, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    username: user.username || '',
    email: user.email || '',
    phone: user.phone || '',
    age: user.age || '',
    place: user.place || '',
    education: user.education || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const validateForm = () => {
    const validationErrors = {};
    if (!formData.username) validationErrors.username = "Name is required.";
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      validationErrors.email = "Please enter a valid email.";
    }
    if (!formData.phone || formData.phone.length !== 10) {
      validationErrors.phone = "Contact number should be 10 digits.";
    }
    if (!formData.age || formData.age <= 0) {
      validationErrors.age = "Please enter a valid age.";
    }
    return validationErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      onSave(formData);
    } else {
      // Handle validation errors (you might want to set these in state)
      console.log(validationErrors);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="edit-profile-form">
      <h2 className="form-title">Edit Profile</h2>
      
      <div className="form-group">
        <label>Name:</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="form-input"
          required
        />
      </div>

      <div className="form-group">
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="form-input"
          required
        />
      </div>

      <div className="form-group">
        <label>Contact:</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="form-input"
          required
        />
      </div>

      <div className="form-group">
        <label>Age:</label>
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          className="form-input"
          required
        />
      </div>

      <div className="form-group">
        <label>Address:</label>
        <input
          type="text"
          name="place"
          value={formData.place}
          onChange={handleChange}
          className="form-input"
          required
        />
      </div>

      <div className="form-group">
        <label>Education:</label>
        <input
          type="text"
          name="education"
          value={formData.education}
          onChange={handleChange}
          className="form-input"
          required
        />
      </div>

      <div className="form-buttons">
        <button type="submit" className="save-button">Save</button>
        <button type="button" onClick={onCancel} className="cancel-button">
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditProfileForm;