// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
const firebaseConfig = {
  apiKey: 'AIzaSyBA60GHU6ASj1ixkR8qpGMEHqpJurLIFwQ',
  authDomain: 'rafhan-internship.firebaseapp.com',
  projectId: 'rafhan-internship',
  storageBucket: 'rafhan-internship.appspot.com',
  messagingSenderId: '949333554177',
  appId: '1:949333554177:web:d804bc9dd37c71d0c83c00',
  measurementId: 'G-XN3RBR8XTB',
};

const app = initializeApp(firebaseConfig);

const firestore = getFirestore(app);
const storage = getStorage(app);

export { firestore, storage, collection, addDoc };
