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

function MainPage({ setIsLoggedIn }) {
  const [isProfilePopupVisible, setProfilePopupVisible] = useState(false);
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const [color, setColor] = useState("white"); 
  const mainPageStyle = {
    backgroundColor: color // Adding !important here
  };


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
      setMessages((prevMessages) => [...prevMessages, data]); // Make sure this logic aligns with your data structure
    } catch (error) {
      console.error("There was a problem with your fetch operation:", error);
    }
  }
  

  useEffect(() => {
    const interval = setInterval(fetchMessages, 5000); // Fetch messages every interval

    return () => clearInterval(interval); // Clean up on component unmount
  }, []);
  useEffect(() => {
    console.log(`Color changed to: ${color}`);
    // You could also perform other side effects here, like fetching data based on the color, etc.
  }, [color]); // This effect depends on `color` and runs every time `color` changes.


  useEffect(() => {
    // Scroll to the bottom every time messages update
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="M"  >
      <NavBar onProfileClick={toggleProfilePopup} color={color} setColor={setColor} />
      {isProfilePopupVisible && <ProfilePopup onClose={toggleProfilePopup} />}

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
      <div id="bar">
        {" "}
        <GoPersonFill className="pro" /> <div id="nameLable">Steph</div>
        <button className="logoutButton" onClick={handleLogout}>
          log out
        </button>
      </div>

      <ChatInputWithMenu />
      <DarkMode />
    </div>
  );
}

export default MainPage;
