import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import store from './redux/Store';
import { Provider } from 'react-redux';

import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
