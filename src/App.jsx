import 'babel-polyfill';
import 'whatwg-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
/* import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firebase-firestore'; */

import Page from './Page.jsx';

/* const firebaseConfig = {
  apiKey: 'AIzaSyAQZch2fOfKBsdaWpL3KZ_kNFBS_Akn57s',
  // apiKey: window.apiKey,
  authDomain: 'fir-ch2-5cbdb.firebaseapp.com',
  databaseURL: 'https://fir-ch2-5cbdb.firebaseio.com',
  projectId: 'fir-ch2-5cbdb',
  storageBucket: 'fir-ch2-5cbdb.appspot.com',
  // messagingSenderId: window.messagingSenderId,
  messagingSenderId: '',
  appId: 'app-id',
  measurementId: 'G-measurement-id',
};

firebase.initializeApp(firebaseConfig); */

const element = (
  <Router>
    <Page />
  </Router>
);
ReactDOM.render(element, document.getElementById('contents'));

if (module.hot) {
  module.hot.accept();
}
