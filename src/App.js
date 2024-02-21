// App.js
import React, { useState } from 'react';
import './App.css';
import SignUp from "./SignUp";
import LoginPage from "./Login";
import MainPage from "./MainPage";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <Router>
      <Routes>
        <Route path="/" element={isLoggedIn ? <Navigate replace to="/main" /> : <LoginPage setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/signup" element={isLoggedIn ? <Navigate replace to="/main" /> : <SignUp setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/main" element={isLoggedIn ? <MainPage setIsLoggedIn={setIsLoggedIn} /> : <Navigate replace to="/" />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
