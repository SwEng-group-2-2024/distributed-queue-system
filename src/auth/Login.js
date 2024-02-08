import './Login.css';
import React, { useState  }from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
const BASE_URL = 'http://localhost:3000';


const LoginPage = () => {
    const [newUser, setNewUser] = useState({ // defined user
        username: '',
        password: '',
      });
    // const handleRegister = async () => {} : function to handle the login
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewUser((prevUser) => ({
          ...prevUser,
          [name]: value,
        }));
      };

    return (
        <div>
          <h1 className='login-page'>log in</h1>
          <label>
            username:
            <input type="text" name="username" value={newUser.username} onChange={handleInputChange} />
          </label>
          <br></br>
          <label>
            password:
            <input type="text" name="homeAddress" value={newUser.homeAddress} onChange={handleInputChange} />
          </label>
          <br></br>
          <button onClick={handleRegister}>log in</button>
          <div>
            <strong>Message: </strong>
            {message}
          </div>
        </div>
      );
    };


export default LoginPage;

