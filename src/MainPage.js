import React, { useState, useEffect, useRef } from "react";
import "./MainPage.css";
import NavBar from "./NavBar";
import ProfilePopup from "./PopUp"; // Assuming you have this component defined
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

function MainPage({ setIsLoggedIn }) {
  const [isProfilePopupVisible, setProfilePopupVisible] = useState(false);
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const [color, setColor] = useState(""); 
  const mainPageStyle = {
    backgroundColor: color // Adding !important here
  };


  const [isSettingsPopupVisible, setIsSettingsPopupVisible] = useState(false);
  
  const toggleSettingsPopup = () => setIsSettingsPopupVisible(!isSettingsPopupVisible);



  const buttonClick = () => {
    addNotification({
        title: 'Warning',
        subtitle: 'This is a subtitle',
        message: 'This is a very long message',
        theme: 'darkblue',
        native: true 
    });
};

const ProfileImg = 'https://probasket.pl/wp-content/uploads/2021/12/steph-curry-interview-2.jpg';

  const toggleProfilePopup = () =>
    setProfilePopupVisible(!isProfilePopupVisible);
  const handleLogout = () => setIsLoggedIn(false);

  async function fetchMessages() {
    try {
      const response = await fetch(
        "http://localhost:3001/api/message/dequeue",
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
    const interval = setInterval(fetchMessages, 5000); 

    return () => clearInterval(interval); 
  }, []);
  useEffect(() => {
    console.log(`Color changed to: ${color}`);
   
  }, [color]); 


  useEffect(() => {
    
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="M"  >
   <NavBar onProfileClick={toggleProfilePopup} onSettingsClick={toggleSettingsPopup} />
            {isProfilePopupVisible && <ProfilePopup onClose={toggleProfilePopup} />}
            {isSettingsPopupVisible &&   <SettingsPopup color={color} setColor={setColor} onClose={toggleSettingsPopup} />}

      <div style={{ backgroundColor: color }} id="messageContainer">
        {" "}
        {/* You might need to style this for proper scrolling */}
        {messages.map((message, index) => (
          <div key={index}>
            <p>{message.TaskId}</p>
            <p>{message.Sender}</p>
            <p>{message.Timestamp}</p>
            <p>{message.Message}</p>
            {/* <span>{new Date(message.timestamp).toLocaleString()}</span> */}
          </div>
        ))}
        <div ref={messagesEndRef} />{" "}
        {/* Invisible element to enable auto-scrolling */}
      </div>
      <div className="user-bar">
  <img src={ProfileImg} alt="User Profile" className="profile-pic" />
  <div className="user-name">Steph</div>
  <button className="logout-button" onClick={handleLogout}>Log out</button>
</div>

      <ChatInputWithMenu />
      <DarkMode />
    </div>
  );
}

export default MainPage;
