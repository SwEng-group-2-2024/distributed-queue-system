import React, { useState } from 'react';
import './Login.css';
import { useDispatch } from 'react-redux';
import { loginSuccess } from './storelog.js';
import logo from './fence.png';
import { Link } from 'react-router-dom'; 
const PORT = process.env.PORT || 5000;


function LoginPage ({ setIsLoggedIn })  {
   const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');

    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    
    const handleLogin = async (e) => { // function to handle the login
        try {
            const response = await fetch('http://localhost:${PORT}/api/login', {
              method: 'POST',
              headers: {'Content-Type': 'application/json'},
      
              body: JSON.stringify({email, password}),
            });
            if (response.ok) {
              dispatch(loginSuccess());
              setIsLoggedIn(true);
            } else {
              console.error('incorrect login or password:', response.statusText);
            }
          } catch (error) {
            console.error('error logging in:', error);
          }
    } ;

    return (
      <div className="return">
        <img src={logo} style={{ width: '500px', height: '382px' }} alt="Fence logo" />
        <div className="login">
        
          <h1>log in</h1>
          <form className="inputBox" onSubmit={handleLogin}>

            <input placeholder="email" className="input" value={email} onChange={(e) => setEmail(e.target.value)} />
            {emailError && <div className="error">{emailError}</div>}

            <input placeholder="password" className="input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            {passwordError && <div className="error">{passwordError}</div>}

            <button type="submit" className="submitBtn">log in</button>
          </form>
          <p className="navigationLink">
          don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
        </div>
      </div>
      
      );
    };


export default LoginPage;
