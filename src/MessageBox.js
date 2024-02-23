import moment from 'moment';

// ProfileBox Component
function ProfileBox({ imageUrl }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
      <img src={imageUrl} alt="profile" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
    </div>
  );
}

// Timestamp Component
function Timestamp({ time }) {
  // Convert the passed time to a more friendly format using moment.js
  const friendlyTime = moment(time).format('h:mm A'); // Example: '3:45 PM'
  return (
    <div style={{ fontSize: '12px', color: '#999', marginTop: '5px', textAlign: 'right' }}>
      {friendlyTime}
    </div>
  );
}

// MessageComponent
function MessageComponent({ message, imageUrl, time, isCurrentUser }) {
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
        backgroundColor: isCurrentUser ? '#0B93F6' : '#E5E5EA',
        color: isCurrentUser ? 'white' : 'black',
        borderRadius: '20px',
        border: isCurrentUser ? '1px solid #0B93F6' : '1px solid #E5E5EA'
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
