
import React from 'react';
import './SettingsPopup.css'; // Ensure this CSS file is properly linked

function SettingsPopup({ onClose, color, setColor }) {
  return (
    <div className="settings-overlay" onClick={onClose}>
      <div className="settings-container" onClick={(e) => e.stopPropagation()}>
        <div className="settings-header">
          <h2>Settings</h2>
        
        </div>
        <div className="settings-content">
          <div className="color-picker-container">
            <label htmlFor="color-input">Theme Color:</label>
            <input
              id="color-input"
              type="text"
              className="color-input"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              placeholder="Enter a colour"
            />
            <div className="color-preview" style={{ backgroundColor: color }}></div>
          </div>
          {/* Additional settings can go here */}
        </div>
      </div>
    </div>
  );
}

export default SettingsPopup;
