/*import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SignUpPage.css'; // Import CSS file

function SignUpPage() {
  const [formData, setFormData] = useState({
    name: '',
    place: '',
    age: '',
    email: '',
    education: '',
    phone: '',
    password: '', // Added password field
    terms: false,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.terms) {
      // Simulate a successful signup
      alert(`Welcome, ${formData.name}! We're glad to have you.`);

      // Save user details to localStorage excluding the password
      const { password, terms, ...userDetails } = formData;
      localStorage.setItem('userDetails', JSON.stringify(userDetails));

      // Redirect to homepage after successful signup
      navigate('/home'); // Redirect to the home page
    } else {
      alert('You must agree to the Terms and Conditions!');
    }
  };

  const handleTermsClick = () => {
    alert(
      'Terms and Conditions:\n\nA fine will be charged if the book is not returned on time or is damaged. Please handle books responsibly.'
    );
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h1 className="signup-title">Create Your Account</h1>
        <p className="signup-subtitle">Fill in your details to join our library</p>
        <form className="signup-form" onSubmit={handleSubmit}>
          <label htmlFor="name" className="form-label">Full Name:</label>
          <input
            type="text"
            id="name"
            className="input-field"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
          />

          <label htmlFor="place" className="form-label">Place:</label>
          <input
            type="text"
            id="place"
            className="input-field"
            name="place"
            value={formData.place}
            onChange={handleChange}
            placeholder="Enter your place"
            required
          />

          <label htmlFor="age" className="form-label">Age:</label>
          <input
            type="number"
            id="age"
            className="input-field"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="Enter your age"
            required
          />

          <label htmlFor="email" className="form-label">Email:</label>
          <input
            type="email"
            id="email"
            className="input-field"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />

          <label htmlFor="education" className="form-label">Education:</label>
          <input
            type="text"
            id="education"
            className="input-field"
            name="education"
            value={formData.education}
            onChange={handleChange}
            placeholder="Enter your education"
            required
          />

          <label htmlFor="phone" className="form-label">Phone Number:</label>
          <input
            type="text"
            id="phone"
            className="input-field"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
            required
          />

          <label htmlFor="password" className="form-label">Password:</label>
          <input
            type="password"
            id="password"
            className="input-field"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />

          <div className="terms-checkbox">
            <input
              type="checkbox"
              id="terms"
              name="terms"
              checked={formData.terms}
              onChange={handleChange}
            />
            <label htmlFor="terms" className="terms-label">
              I agree to the{' '}
              <span
                className="highlight-link"
                onClick={handleTermsClick}
                role="button"
                tabIndex="0"
              >
                Terms and Conditions
              </span>
            </label>
          </div>

          <button type="submit" className="submit-button">Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default SignUpPage;
*/

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/SignUpPage.css';

function SignUpPage() {
  const [formData, setFormData] = useState({
    name: '',
    place: '',
    age: '',
    email: '',
    education: '',
    phone: '',
    password: '',
    terms: false,
  });

  const navigate = useNavigate();

  // Add handleChange function
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!formData.terms) {
      alert('You must agree to the Terms and Conditions!');
      return;
    }
  
    try {
      const dataToSend = {
        username: formData.name,
        place: formData.place,
        age: formData.age,
        email: formData.email,
        education: formData.education,
        phone: formData.phone,
        password: formData.password
      };
  
      console.log('Sending signup data:', dataToSend);
  
      const response = await axios.post('https://lib-backend-8o2x.onrender.com/api/users/register', dataToSend, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      console.log('Signup response:', response.data);
      
      alert(`Welcome, ${response.data.username}! Account created successfully.`);
      localStorage.setItem('userDetails', JSON.stringify(response.data));
      
      // Directly navigate to home page after successful signup
      navigate('/home');  // This will redirect to HomePage immediately after signup
    } catch (error) {
      console.error('Full signup error:', error);
      
      const errorMessage = error.response?.data?.message || 
                           error.response?.data?.errors?.join(', ') || 
                           'Signup failed. Please try again.';
      
      alert(errorMessage);
    }
  };
  

  const handleTermsClick = () => {
    alert(
      'Terms and Conditions:\n\nA fine will be charged if the book is not returned on time or is damaged. Please handle books responsibly.'
    );
  };


  return (
    <div className="signup-container">
      <div className="signup-card">
        <h1 className="signup-title">Create Your Account</h1>
        <p className="signup-subtitle">Fill in your details to join our library</p>
        <form className="signup-form" onSubmit={handleSubmit}>
          <label htmlFor="name" className="form-label">Full Name:</label>
          <input
            type="text"
            id="name"
            className="input-field"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
          />

          <label htmlFor="place" className="form-label">Place:</label>
          <input
            type="text"
            id="place"
            className="input-field"
            name="place"
            value={formData.place}
            onChange={handleChange}
            placeholder="Enter your place"
            required
          />

          <label htmlFor="age" className="form-label">Age:</label>
          <input
            type="number"
            id="age"
            className="input-field"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="Enter your age"
            required
          />

          <label htmlFor="email" className="form-label">Email:</label>
          <input
            type="email"
            id="email"
            className="input-field"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />

          <label htmlFor="education" className="form-label">Education:</label>
          <input
            type="text"
            id="education"
            className="input-field"
            name="education"
            value={formData.education}
            onChange={handleChange}
            placeholder="Enter your education"
            required
          />

          <label htmlFor="phone" className="form-label">Phone Number:</label>
          <input
            type="text"
            id="phone"
            className="input-field"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
            required
          />

          <label htmlFor="password" className="form-label">Password:</label>
          <input
            type="password"
            id="password"
            className="input-field"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />

          <div className="terms-checkbox">
            <input
              type="checkbox"
              id="terms"
              name="terms"
              checked={formData.terms}
              onChange={handleChange}
            />
            <label htmlFor="terms" className="terms-label">
              I agree to the{' '}
              <span
                className="highlight-link"
                onClick={handleTermsClick}
                role="button"
                tabIndex="0"
              >
                Terms and Conditions
              </span>
            </label>
          </div>

          <button type="submit" className="submit-button">Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default SignUpPage;