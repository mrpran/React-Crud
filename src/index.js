import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import {configureFakeBackend} from './helpers/fake-backend'

configureFakeBackend();


ReactDOM.render(
  <BrowserRouter>
        <App />
    </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log) git) here we go
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals hello
reportWebVitals();
