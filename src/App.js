import React from 'react';
import './App.css';
import LoginPage from "./auth/Login.js"; 
import store from './store.js';
import { Provider } from 'react-redux';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <LoginPage />
      </Provider>
    </div>
  );
}

export default App;
