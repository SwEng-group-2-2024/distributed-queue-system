// ProfilePopup.js

import "./PopUp.css"
import React, { useState } from 'react';

function ProfilePopup  ({ onClose }) {

    const [status, setStatus] = useState('online');

    const handleStatusChange = (e) => {
        setStatus(e.target.value);
      };
    
      return(
    <div className="profile-popup" >
    <div className="profile">
      <div className="header">
        <img src= { require("./profileIcon.png") } alt="Profile Icon" className="profile-icon" />
        <span>Steph</span>
      </div>
      <div className="line"></div>
      <div className="phone">
        <img src={ require("./phone.png") } alt="Telephone Icon" className="telephone-icon" />
        <span>08994454</span>
      </div>
      <div className="line"></div>
      <div className="status">
        <span>Status:</span>
        <select value={status} onChange={handleStatusChange}>
          <option value="online">Online</option>
          <option value="offline">Offline</option>
        </select>
      </div>
    </div>
        
 </div>
      )

      };

export default ProfilePopup;
