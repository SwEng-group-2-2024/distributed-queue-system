import React, { useState } from 'react';
import moment from 'moment';

// ProfileBox Component remains the same
function ProfileBox({ imageUrl }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
      <img src={imageUrl} alt="profile" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
    </div>
  );
}

// Timestamp Component remains the same
function Timestamp({ time }) {
  const friendlyTime = moment(time).format('h:mm A'); // Example: '3:45 PM'
  return (
    <div style={{ fontSize: '12px', color: '#999', marginTop: '5px', textAlign: 'right' }}>
      {friendlyTime}
    </div>
  );
}

// Updated MessageComponent to handle different color for each user
function MessageComponent({ message, imageUrl, time, isCurrentUser }) {
  // Define colors for current user and other users
  const currentUserStyle = {
    backgroundColor: '#0B93F6', // Blue background for current user
    color: 'white', // White text for current user
    border: '1px solid #0B93F6'
  };

  const otherUserStyle = {
    backgroundColor: '#E5E5EA', // Light grey background for other users
    color: 'black', // Black text for other users
    border: '1px solid #E5E5EA'
  };

  // Determine the style based on isCurrentUser
  const messageStyle = isCurrentUser ? currentUserStyle : otherUserStyle;

  // State for displaying message actions menu
  const [showActions, setShowActions] = useState(false);

  // State for message reactions
  const [reactions, setReactions] = useState({
    thumbsUp: 0,
    heart: 0
  });

  // State for uploaded file
  const [file, setFile] = useState(null);

  // Function to toggle message actions menu
  const toggleActions = () => {
    setShowActions(!showActions);
  };

  // Function to handle reaction
  const react = (reactionType) => {
    setReactions(prevState => ({
      ...prevState,
      [reactionType]: prevState[reactionType] + 1
    }));
  };

  // Function to handle file upload
  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0];
    setFile(uploadedFile);
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: isCurrentUser ? 'row-reverse' : 'row',
      alignItems: 'flex-end',
      marginBottom: '10px'
    }}>
      <ProfileBox imageUrl={imageUrl} />
      <div style={{
        position: 'relative', // To position message actions menu
        maxWidth: '60%',
        padding: '10px',
        borderRadius: '20px',
        ...messageStyle, // Apply dynamic style here
      }}>
        {/* Message Content */}
        <div>{message}</div>
        {/* Message Timestamp */}
        <Timestamp time={time} />
        {/* Message Actions */}
        {isCurrentUser && (
          <div style={{ position: 'absolute', top: '5px', right: '5px' }}>
            <button onClick={toggleActions}>...</button>
            {showActions && (
              <div style={{ position: 'absolute', top: '25px', right: '0', backgroundColor: 'white', border: '1px solid #ccc', borderRadius: '5px', padding: '5px' }}>
                <ul style={{ listStyleType: 'none', margin: '0', padding: '0' }}>
                  <li>Edit</li>
                  <li>Delete</li>
                </ul>
              </div>
            )}
          </div>
        )}
        {/* Message Reactions */}
        <div style={{ marginTop: '5px' }}>
          <button onClick={() => react('thumbsUp')} style={{ marginRight: '5px' }}>👍</button>
          <button onClick={() => react('heart')}>❤️</button>
          {/* Display reaction counts as subscripts */}
          {reactions.thumbsUp > 0 && <sup style={{ marginLeft: '5px' }}>{reactions.thumbsUp}</sup>}
          {reactions.heart > 0 && <sup style={{ marginLeft: '5px' }}>{reactions.heart}</sup>}
        </div>
        {/* File Upload */}
        {isCurrentUser && (
          <div style={{ marginTop: '10px' }}>
            <input type="file" onChange={handleFileUpload} />
            {file && <div>File selected: {file.name}</div>}
          </div>
        )}
      </div>
    </div>
  );
}

export default MessageComponent;
