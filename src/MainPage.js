import React, { useState, useEffect, useRef } from "react";
import "./MainPage.css";
import NavBar from "./NavBar";
import ProfilePopp from "./Popup"; 
import {
  NavbarContainer,
  LeftContainer,
  RightContainer,
  NavbarInnerContainer,
  NavbarExtendedContainer,
  NavbarLinkContainer,
  NavbarLink,
  Profile,
  OpenLinksButton,
  NavbarLinkExtended,
} from "./Navbar.style";
import ProfileImg from "./iconProfile.webp"; 
import { GoPersonFill } from "react-icons/go";
import ChatInputWithMenu from "./ChatInputWithMenu";
import DarkMode from './DarkMode';
import Dropdown from './SettingPage'
import SettingPage from "./SettingPage";
import { IoMdColorPalette } from "react-icons/io";
import addNotification from 'react-push-notification';
import SettingsPopup from './SettingsPopup'; 
import axios from 'axios';

function MainPage({ setIsLoggedIn }) {
  const [isProfilePopupVisible, setProfilePopupVisible] = useState(false);
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const [color, setColor] = useState(""); 
  const mainPageStyle = {
    backgroundColor: color // Adding !important here
  };
  const [error, setError] = useState('');
  const ProfileImg = 'https://e7.pngegg.com/pngimages/753/432/png-clipart-user-profile-2018-in-sight-user-conference-expo-business-default-business-angle-service.png';

  const [profilePicUrl, setProfilePicUrl] = useState(localStorage.getItem('userProfilePicUrl') || ProfileImg);

  const userEmail = localStorage.getItem('UserEmail');
  const userName = localStorage.getItem('UserName');
  const userPhoneNumber = localStorage.getItem('UserPhoneNumber');
  const [userDetails, setUserDetails] = useState({ name: "", email: "" });

  const [isSettingsPopupVisible, setIsSettingsPopupVisible] = useState(false);
  
  const toggleSettingsPopup = () => setIsSettingsPopupVisible(!isSettingsPopupVisible);


  const [user, setUser] = useState({});

  
  useEffect(() => {
    const userEmail = localStorage.getItem('UserEmail');
    const userDetailUrl = `http://localhost:4000/api/users/${encodeURIComponent(userEmail)}`;
   
    if (userEmail) {
      axios.get(userDetailUrl)
        .then(response => {
          setUser(response.data); // This now includes all user details
          console.log(response.data);
        })
        .catch(err => {
          console.error("Error fetching user data:", err);
          setError('Failed to fetch user data. Please try again later.');
        });
    }
  }, []);
  const handleStatusChange = (e) => {
    setUser({...user, status: e.target.value});
  }

 

  const buttonClick = () => {
    addNotification({
        title: 'Warning',
        subtitle: 'This is a subtitle',
        message: 'This is a very long message',
        theme: 'darkblue',
        native: true 
    });
};


  const toggleProfilePopup = () =>
    setProfilePopupVisible(!isProfilePopupVisible);
  const handleLogout = () => setIsLoggedIn(false);

  async function fetchMessages() {
    try {
      const response = await fetch(
        "http://57.151.53.113/api/message/dequeue",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setMessages((prevMessages) => [...prevMessages, data]); 
    } catch (error) {
      console.error("There was a problem with your fetch operation:", error);
    }
  }
  
  useEffect(() => {
    setProfilePicUrl(localStorage.getItem('userProfilePicUrl'));

  })

  useEffect(() => {
    const interval = setInterval(fetchMessages, 5000); 
    return () => clearInterval(interval); 
  }, []);

  useEffect(() => {
    console.log(`Color changed to: ${color}`);
  }, [color]); 

  useEffect(() => {
    const messageContainer = document.getElementById('messageContainer');
    if (messageContainer) {
      messageContainer.scrollTop = messageContainer.scrollHeight;
    }
  }, [messages]); // Assuming 'messages' is your state holding the message list
  
  return (
    <div className="M">
      <NavBar onProfileClick={toggleProfilePopup} onSettingsClick={toggleSettingsPopup} />
      {isProfilePopupVisible && <ProfilePopup onClose={toggleProfilePopup} />}
      {isSettingsPopupVisible && <SettingsPopup color={color} setColor={setColor} onClose={toggleSettingsPopup} />}
      <div className="user-bar">
        <img src={profilePicUrl} alt="User Profile" className="profile-pic" />
        <div className="user-name">{user.FullName}</div>
        <button className="logout-button" onClick={handleLogout}>Log out</button>
      </div>

      <div style={{ backgroundColor: color }} id="messageContainer" className="message-container">
        {messages.map((message, index) => {
          const isCurrentUserMessage = message.sentFrom === userEmail;
          return (
            <div key={message.uniqueMessageID || index} className={`message-row ${isCurrentUserMessage ? 'message-row-left' : 'message-row-right'}`}>
              {isCurrentUserMessage && <img src={message.ProfilePic} alt="User Profile" className="profile-pic" />}
              <div className={`message-bubble ${isCurrentUserMessage ? 'message-bubble-left' : 'message-bubble-right'}`}>
                <div className="message-content">
                  <p className="user-name">{message.Sender}</p>
                  <p className="message-text">{message.Message}</p>
                </div>
              </div>
              {!isCurrentUserMessage && <img src={message.ProfilePic} alt="User Profile" className="profile-pic" />}
            </div>
          );
        })}
        <div ref={messagesEndRef}></div>
      </div>
    
    

      <ChatInputWithMenu />
      <DarkMode />
    </div>
  );
}
export default MainPage;