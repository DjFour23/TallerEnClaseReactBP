// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAEj9oi_AGhLChY0YqH62O1ogY2vpos1H0",
    authDomain: "tallerbuenaspracticas-3099e.firebaseapp.com",
    projectId: "tallerbuenaspracticas-3099e",
    storageBucket: "tallerbuenaspracticas-3099e.appspot.com",
    messagingSenderId: "320939330317",
    appId: "1:320939330317:web:e1fdc23fd4fc14edd67e44",
    measurementId: "G-HYCZCSB756"
  };
  

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export{firebase}
