import React, { useState } from 'react';
import "./ChatInputWithMenu.css"
function ChatInputWithMenu() {
  const [message, setMessage] = useState('');
  const [showMenu, setShowMenu] = useState(false);

  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };
  const sendingTime = new Date().toISOString();
  const senderID = Math.floor(Math.random() * 10).toString;

  const handleSendMessage = async (e) => {
    console.log('Message to send:', message);
    setMessage(''); // Clear input after sending
    try {
        const response = await fetch('http://localhost:4000/api/enqueue', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
  
          body: JSON.stringify({message, sendingTime, senderID}),
        });
        if (response.ok) {
          console.log('message sent!', response.statusText);
        } 
      } catch (error) {
        console.error('error sending message:', error);
      }
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  
  const handleSending = async (e) => { // function to handle the login
    try {
        const response = await fetch('http://localhost:4000/api/enqueue', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
  
          body: JSON.stringify({message, sendingTime, senderID}),
        });
        if (response.ok) {
          console.log('message sent!', response.statusText);
        } 
      } catch (error) {
        console.error('error sending message:', error);
      }
} ;
  return (
    <div className="chat-input-container">
      <div className="chat-input-bar">
        <button className="options-button" onClick={toggleMenu}>
          +
        </button>
        {showMenu && (
          <div className="dropdown-menu">
          
<h1>sss</h1>
           
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