import React, { useState } from 'react';



function ProfilePage() {
  const [status, setStatus] = useState('online');

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  
  return (
    <div className="profile">
      <div className="header">
        <img src= { require("./img/profileIcon.png") } alt="Profile Icon" className="profile-icon" />
        <span>Grace</span>
      </div>
      <div className="line"></div>
      <div className="phone">
        <img src={ require("./img/phone.png") } alt="Telephone Icon" className="telephone-icon" />
        <span>1234567890</span>
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
  );
}

export default ProfilePage;
