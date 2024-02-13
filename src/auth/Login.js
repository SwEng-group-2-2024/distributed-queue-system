import React, { useState } from 'react';
import './Login.css';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../store.js';
import logo from '../fence.png';
const PORT = process.env.PORT || 4000;

function LoginPage ()  {
   const dispatch = useDispatch();

    const [email, setEmail] = useState('');

    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    
    const handleLogin = async (e) => { // function to handle the login
      e.preventDefault();
      setPasswordError('');

        try {
            const response = await fetch('http://localhost:3000/api/login', {
              method: 'POST',
              headers: {'Content-Type': 'application/json'},
      
              body: JSON.stringify({email, password}),
            });
            if (response.ok) {
              dispatch(loginSuccess());
            } else {
              console.error('incorrect login or password:', response.statusText);
              setPasswordError('incorrect login or password');
            }
          } catch (error) {
            console.error('error logging in:', error);
          }
    } ;

    return (
      <div className="return">
        <img src={logo} style={{ width: '500px', height: '382px' }} alt="Fence logo" />
        <div className="login">
        
          <form className="inputBox" onSubmit={handleLogin}>

            <input placeholder="email" className="input" value={email} onChange={(e) => setEmail(e.target.value)} />
            

            <input placeholder="password" className="input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            {passwordError && <div className="error">{passwordError}</div>}

            <button type="submit" className="submitBtn">log in</button>
          </form>
        </div>
      </div>
      
      );
    };


export default LoginPage;

