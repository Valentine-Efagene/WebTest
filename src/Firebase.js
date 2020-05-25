import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firebase-firestore';

const firebaseConfig = {
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

class Firebase {
  constructor() {
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    this.auth = firebase.auth();
  }
}

export default new Firebase();
