import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import './EmailForm.css';
import Navbar from './Navbar';  // Correctly import Navbar component

const EmailForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Your EmailJS service ID, template ID, and Public Key
    const serviceId = 'service_iqwvxkt';
    const templateId = 'template_2fdkgha';
    const publicKey = '1wPSwEaAhRbyHkiQ9';

    // Create a new object that contains dynamic template params
    const templateParams = {
      from_name: name,
      from_email: email,
      to_name: 'Web Wizard',
      message: message,
    };

    // Send the email using EmailJS
    emailjs.send(serviceId, templateId, templateParams, publicKey)
      .then((response) => {
        console.log('Email sent successfully!', response);
        setName('');
        setEmail('');
        setMessage('');
      })
      .catch((error) => {
        console.error('Error sending email:', error);
      });
  }

  return (
    <div>
      <Navbar />  {/* Include Navbar component */}
      <form onSubmit={handleSubmit} className='emailForm'>
        <img
          src="https://i.imgur.com/Ma8nGO0.png"
          alt="Book Cover"
          className="book-image"
          style={{ maxWidth: '600px', height: 'auto' }} // Corrected style prop
        />
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <textarea
          placeholder="Enter text"
          cols="30"
          rows="10"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">Send Email</button>
      </form>
    </div>
  );
}

export default EmailForm;
