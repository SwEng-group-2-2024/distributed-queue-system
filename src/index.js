import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './store'; 
import storelog from './storelog'; 

ReactDOM.render(
  <React.StrictMode>

    <Provider storelog={storelog}>
      <App />
    </Provider>

    
  </React.StrictMode>,
  document.getElementById('root')
);
