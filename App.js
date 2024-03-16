import React, { useState } from "react";
import "./App.css"; 

const App = () => {
  const [color, setColor] = useState("black");

  const styleObj = {
    backgroundColor: color
  }
  return (
    <div style= {styleObj} className ="container"> 
    <div className ="card">
      <div className ="header">
        Colour: <span> {color || "White" }</span>
      </div>
      <input 
      type={'text'} 
      className="input"
      value={color} 
      onChange= {(e) => setColor(e.target.value)}
      placeholder= "Enter a colour"
      />
      </div>
      </div>
  );
};

export default App;
