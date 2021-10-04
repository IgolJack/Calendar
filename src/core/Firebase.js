// Firebase App (the core Firebase SDK) is always required and must be listed first
import {initializeApp} from 'firebase/app';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCzWA4fKB4rHYBqYUXuY0VFQodhMVe6s2c',
  authDomain: 'echoes-of-the-schledules.firebaseapp.com',
  databaseURL: 'https://echoes-of-the-schledules.firebaseio.com',
  projectId: 'echoes-of-the-schledules',
  storageBucket: 'echoes-of-the-schledules.appspot.com',
  messagingSenderId: '763118458114',
  appId: '1:763118458114:web:524ea7f275fe5c6b7c5e1b',
  measurementId: 'G-Z9LYEQL4TZ'
};

export function firebaseInit() {
  initializeApp(firebaseConfig);
}

