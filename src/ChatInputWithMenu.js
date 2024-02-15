import React, { useState } from 'react';
import "./ChatInputWithMenu.css"
function ChatInputWithMenu() {
  const [message, setMessage] = useState('');
  const [showMenu, setShowMenu] = useState(false);

  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSendMessage = () => {
    console.log('Message to send:', message);
    setMessage(''); // Clear input after sending
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

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