import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [termsAccepted, setTermsAccepted] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation Logic
    const newErrors = {};
    if (formData.password !== formData.confirmPassword) {
      newErrors.password = 'Passwords do not match!';
    }
    if (!termsAccepted) {
      newErrors.terms = 'Please accept the terms and conditions.';
    }
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Submit to JSON server
      try {
        const response = await fetch('http://localhost:3000/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...formData, id: Date.now().toString() }), // Add an ID
        });

        console.log("Response:", response); // Log the response

        if (response.ok) {
          alert('Signup successful!');
          navigate('/login'); // Redirect to login page
        } else {
          const errorMessage = await response.text(); // Get error message
          console.error('Failed to sign up:', errorMessage);
        }
      } catch (error) {
        console.error('Signup error:', error);
      }
    }
  };

  return (
    <div className="signup-container">
      <h2>Create an Account</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Full Name" onChange={handleInputChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleInputChange} required />
        <input type="tel" name="phone" placeholder="Phone Number" onChange={handleInputChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleInputChange} required />
        <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleInputChange} required />
        {errors.password && <p className="error">{errors.password}</p>}
        
        <div className="terms">
          <input type="checkbox" checked={termsAccepted} onChange={() => setTermsAccepted(!termsAccepted)} />
          <label>I accept the <a href="#">terms and conditions</a></label>
        </div>
        {errors.terms && <p className="error">{errors.terms}</p>}
        
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}
export default Signup;
