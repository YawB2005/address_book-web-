import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import {getFirestore} from 'firebase/firestore'
const firebaseConfig = {
  apiKey: "AIzaSyBi9-_JHl5-XVI7vIv2f4r1bNSsl7kNNYs",
  authDomain: "address-book-17a88.firebaseapp.com",
  projectId: "address-book-17a88",
  storageBucket: "address-book-17a88.appspot.com",
  messagingSenderId: "7811108070",
  appId: "1:7811108070:web:362b8c868c8b9de8d2bf27",
  measurementId: "G-4DHXKXMP4S"
};



const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

export {db, auth};