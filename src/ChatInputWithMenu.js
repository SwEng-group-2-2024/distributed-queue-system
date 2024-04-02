import React, { useState, useEffect } from "react";
import "./ChatInputWithMenu.css";

function ChatInputWithMenu() {
  const [message, setMessage] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [color, setColor] = useState("black");

  // Retrieve 'sender' (user's email) and 'userName' (user's name) from localStorage
  const senderEmail = localStorage.getItem('UserEmail');
  const senderName = localStorage.getItem('UserName'); // Assuming you're storing user's name with this key
  const ProfileImg = 'https://e7.pngegg.com/pngimages/753/432/png-clipart-user-profile-2018-in-sight-user-conference-expo-business-default-business-angle-service.png';

  const [profilePicUrl, setProfilePicUrl] = useState(localStorage.getItem('userProfilePicUrl') || ProfileImg);

  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  useEffect(() => {
    setProfilePicUrl(localStorage.getItem('userProfilePicUrl'));

  })


  const handleSendMessage = async () => {
    console.log("Message to send:", message);

    // Check if 'senderEmail' and 'senderName' are available in localStorage
    if (!senderEmail || !senderName) {
      console.error("User email or name not found. Cannot send message.");
      return;
    }

    try {
      // const response = await fetch("http://57.151.53.113/api/message/enqueue", {
        const response = await fetch("http://172.190.85.221/api/message/api/message/enqueue", {

      
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message,
          sentfrom: senderEmail, // User's email
          sender: senderName, // User's name
          timestamp: new Date().toISOString(), // Current timestamp in ISO format
          profilepic: profilePicUrl
          // Include other fields as necessary
        }),
      });

      if (response.ok) {
        const savedMessageData = await response.json(); // Get the response data
        console.log("Message sent and saved!", savedMessageData);
        setMessage(""); // Clear input field after sending
      } else {
        console.error("Failed to send message. Status:", response.status);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleColorChange = (newColor) => {
    setColor(newColor);
    setShowMenu(false); // Optionally close the menu after selecting a color
  };

  const styleObj = {
    backgroundColor: color,
  };

  return (
    <div style={styleObj} className="chat-input-container">
      <div className="chat-input-bar">
        <button className="options-button" onClick={toggleMenu}>
          +
        </button>
        {showMenu && (
          <div className="dropdown-menu">
            <h1>Options</h1>
          </div>
        )}
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={handleInputChange}
          className="message-input"
        />
        <button className="send-button" onClick={handleSendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatInputWithMenu;
