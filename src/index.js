import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider as ReduxProvider } from 'react-redux';
import store from './store'; // Redux store for main app state
import loginStore from './loginStore'; // Redux store for login state

ReactDOM.render(
  <React.StrictMode>
    <ReduxProvider store={store}>
    <ReduxProvider store={loginStore}>
      <App />
    </ReduxProvider>
    </ReduxProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
