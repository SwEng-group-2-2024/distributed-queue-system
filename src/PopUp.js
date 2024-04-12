// ProfilePopup.js

import "./PopUp.css"
import React, { useState, useEffect } from 'react';

import axios from 'axios';


function ProfilePopup({ onClose }) {
  const [error, setError] = useState('');
  const [user, setUser] = useState({});
  // Directly initializing from localStorage
  const [profilePicUrl, setProfilePicUrl] = useState(localStorage.getItem('userProfilePicUrl') || 'default-profile-pic-path');

  useEffect(() => {
    const userEmail = localStorage.getItem('UserEmail');
    const userDetailUrl = `http://localhost:4000/api/users/${encodeURIComponent(userEmail)}`;

    if (userEmail) {
      axios.get(userDetailUrl)
        .then(response => {
          setUser(response.data);
          console.log(response.data);
        })
        .catch(err => {
          console.error("Error fetching user data:", err);
          setError('Failed to fetch user data. Please try again later.');
        });
    }

    console.log(profilePicUrl);
  }, []);

  const handleFileChange = async (event) => {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append('profilePicture', file);
      formData.append('email', localStorage.getItem('UserEmail'));

      try {
        const response = await axios.post('http://localhost:4000/api/user/profile-picture', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });

        if (response.data.profilePictureUrl) {
          localStorage.setItem('userProfilePicUrl', response.data.profilePictureUrl);
          setProfilePicUrl(response.data.profilePictureUrl); // This will trigger a re-render
        }
      } catch (error) {
        console.error("Error uploading profile picture:", error);
        setError('Failed to upload profile picture. Please try again later.');
      }
    }
  };

  return (
    <div className="overlay">
    <div className="profile-popup">
      <div className="profile-container">
        <button className="close-btn" onClick={onClose}>X</button>
        <div className="profile-picture-container">
          <img src={profilePicUrl} alt="Profile" className="profile-picture" />
          <input type="file" onChange={handleFileChange} />
        </div>
        <h2>{user.FullName}</h2>
        <p>{user.PhoneNumber}</p>
        <p>{user.Email}</p>
        {/* Other content */}
      </div>
    </div>
  </div>
  );
}

export default ProfilePopup;
