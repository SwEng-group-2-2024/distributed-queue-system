import React from 'react';
import './App.css';
import SignUp from "./SignUp.js";
import MainPage from "./MainPage.js"; 
import { useSelector } from 'react-redux';

function App() {
  const isSignedUp = useSelector(state => state.isSignedUp); 

  return (
    <div className="App">

      {isSignedUp ? <MainPage /> : <SignUp />}

      
    </div>
  );
}

export default App;
