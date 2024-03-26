// ProfilePopup.js

import "./PopUp.css"
import React, { useState } from 'react';

import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';

function ProfilePopup  ({ onClose }) {

  const [user, setUser] = useState({
    fullName: 'Steph Curry',
    phoneNumber: '+1234567890',
    email: 'StephCurry@gmail.com',
    status: 'Available',
    profilePicture: 'https://probasket.pl/wp-content/uploads/2021/12/steph-curry-interview-2.jpg',
  });

  const handleStatusChange = (e) => {
    setUser({...user, status: e.target.value});
  }

 
      return(
        <div className="overlay">
        <div className="profile-popup">
        <div className="profile-container">
        <button className="close-btn" onClick={onClose}>X</button>
          <img src={user.profilePicture} alt="Profile" className="profile-picture" />
          <h2>{user.fullName}</h2>
          <p>{user.phoneNumber}</p>
          <p>{user.email}</p>
          <div className="status-selector">
            <label htmlFor="status">Status: </label>
            <select name="status" id="status" value={user.status} onChange={handleStatusChange}>
              <option value="Available">Available</option>
              <option value="Busy">Busy</option>
              <option value="Do Not Disturb">Do Not Disturb</option>
            </select>
          </div>
        </div>
      </div>
      </div>
      )

      };

export default ProfilePopup;
