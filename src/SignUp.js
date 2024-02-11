import React, { useState } from 'react';
import './SignUp.css';
import { useDispatch } from 'react-redux';
import { signUpSuccess } from './store';

function SignUp() {
  const dispatch = useDispatch();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');


  const [fullNameError, setFullNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).toLowerCase());

  
  const validatePassword = (password) => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(String(password));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFullNameError('');

    setEmailError('');
    setPhoneNumberError('');

    setPasswordError('');
    let isValid = true;
    if (!validateEmail(email)) {
      setEmailError('Invalid email format');
      isValid = false;
    }
    if (!validatePassword(password)) {
      setPasswordError('Password must be at least 8 characters, include one letter and one number');

      isValid = false;
    }
    if (!isValid) return;
    try {
      const response = await fetch('http://localhost:4000/api/register', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},

        body: JSON.stringify({fullName, email, phoneNumber, password}),
      });
      if (response.ok) {
        dispatch(signUpSuccess());
        setFullName('');

        setEmail('');
        setPhoneNumber('');
        setPassword('');
      } else {
        console.error('Registration failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="Outer">
      <div className="logo"></div>
      <div className="Main">
        <h1>Sign Up</h1>
        <form className="inputBox" onSubmit={handleSubmit}>

          <input placeholder="Full Name" className="input" value={fullName} onChange={(e) => setFullName(e.target.value)} />
          {fullNameError && <div className="error">{fullNameError}</div>}


          <input placeholder="Email" className="input" value={email} onChange={(e) => setEmail(e.target.value)} />
          {emailError && <div className="error">{emailError}</div>}

          <input placeholder="Phone Number" className="input" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
          {phoneNumberError && <div className="error">{phoneNumberError}</div>}

          <input placeholder="Password" className="input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          {passwordError && <div className="error">{passwordError}</div>}


          <button type="submit" className="submitBtn">Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
