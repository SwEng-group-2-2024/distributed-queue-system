import React from 'react';
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

  return (
    <div style={{
      display: 'flex',
      flexDirection: isCurrentUser ? 'row-reverse' : 'row',
      alignItems: 'flex-end',
      marginBottom: '10px'
    }}>
      <ProfileBox imageUrl={imageUrl} />
      <div style={{
        maxWidth: '60%',
        padding: '10px',
        borderRadius: '20px',
        ...messageStyle, // Apply dynamic style here
      }}>
        {message}
        <Timestamp time={time} />
      </div>
    </div>
  );
}

// Example usage of MessageComponent inside a functional component
/*function App() {
  return (
    <div style={{ padding: '20px' }}>
      <MessageComponent
        message="Hello! How are you today?"
        imageUrl="https://example.com/path/to/profile.jpg"
        time={new Date().toISOString()} // Current time; replace with actual message time
        isCurrentUser={false}
      />
      {/* Add more <MessageComponent /> as needed */
   // </div>
  //);
//}
export default MessageComponent;
