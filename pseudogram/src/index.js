import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

firebase.initializeApp({
 apiKey: "AIzaSyBHAdQ8BrUcxiF0Kh2Jw3_EeJmCPgMNF4Y",
 authDomain: "pseudogram-mlimideiro.firebaseapp.com",
 projectId: "pseudogram-mlimideiro",
 storageBucket: "pseudogram-mlimideiro.appspot.com",
 messagingSenderId: "504793228538",
 appId: "1:504793228538:web:150c682dd81991ceec1543",
 measurementId: "G-M7G2Y58QSS"
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
