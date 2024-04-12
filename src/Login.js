import React, { useState } from 'react';
import './Login.css';
import { useDispatch } from 'react-redux';
import { loginSuccess } from './storelog.js';
import logo from './fence.png';
import {Link} from 'react-router-dom';

const LoginPage = ({ setIsLoggedIn }) => {
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    
    const handleLogin = async (e) => {
        e.preventDefault();
        setPasswordError('');

        try {
            const response = await fetch('http://localhost:4000/api/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({email, password}),
            });

            if (response.ok) {
                const data = await response.json();
                dispatch(loginSuccess(data));

                  localStorage.setItem('UserEmail', email);
              
                setIsLoggedIn(true);
            } else {
                console.error('Incorrect login or password:', response.statusText);
                setPasswordError('Incorrect login or password');
            }
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    return (
        <div className="loginPage">
            <div className="loginContainer">
                <h1>FENCE</h1>
                <form className="loginForm" onSubmit={handleLogin}>
                    <input placeholder="Email" className="inputField" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input placeholder="Password" className="inputField" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    {passwordError && <div className="error">{passwordError}</div>}
                    <button type="submit" className="submitBtn">Log In</button>
                </form>
                <p id="signupPrompt" className="navigationLink">
                    Don't have an account? <Link to="/signup">Sign Up</Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;