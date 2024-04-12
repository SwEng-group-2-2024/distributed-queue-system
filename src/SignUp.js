import React, { useState } from 'react';
import './SignUp.css';
import { useDispatch } from 'react-redux';
import { signUpSuccess } from './store';
import { Link } from 'react-router-dom';

function SignUp({ setIsLoggedIn }) {
  const dispatch = useDispatch();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');

  const validateEmail = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.toLowerCase());
  const validatePassword = password => /(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);

  const handleSubmit = async (e) => {
      e.preventDefault();
      let isValid = true;

      if (!validateEmail(email)) {
          setError('Invalid email format');
          isValid = false;
      } else if (!validatePassword(password)) {
          setError('Password must contain at least 8 characters, including one letter and one number');
          isValid = false;
      } 

      if (isValid) {
          try {
              const response = await fetch('http://localhost:4000/api/register', {
                  method: 'POST',
                  headers: {'Content-Type': 'application/json'},
                  body: JSON.stringify({ fullName, email, phoneNumber, password }),
              });

              if (response.ok) {
                  const data = await response.json();
                  console.log(JSON.stringify(data, null, 2));
                  localStorage.setItem('UserEmail', email);
                  localStorage.setItem('UserName', fullName);
                  localStorage.setItem('UserPhoneNumber', phoneNumber);
                  dispatch(signUpSuccess());
                  setFullName('');
                  setEmail('');
                  setPhoneNumber('');
                  setPassword('');
                  setIsLoggedIn(true);
              } else {
                  setError('Registration failed: ' + response.statusText);
              }
          } catch (error) {
              console.error('Error submitting form:', error);
              setError('Failed to submit form. Please try again.');
          }
      }
  };

  return (
      <div className="signUpPage">
          <div className="signUpContainer">
              <h1>FENCE</h1>
              <form className="signUpForm" onSubmit={handleSubmit}>
                  <input placeholder="Full Name" className="inputField" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                  <input placeholder="Email" className="inputField" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  <input placeholder="Phone Number" className="inputField" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                  <input placeholder="Password" className="inputField" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                  {error && <div className="error">{error}</div>}
                  <button type="submit" className="submitBtn">Sign Up</button>
              </form>
              <p className="navigationLink">
                  Already have an account? <Link to="/">Log In</Link>
              </p>
          </div>
      </div>
  );
}

export default SignUp;