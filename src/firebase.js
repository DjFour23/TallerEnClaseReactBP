// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAKIibnX36ha4k-w6h3yw_zruJPg5Ze5g4",
  authDomain: "tallerreactbuenaspractic-87a30.firebaseapp.com",
  projectId: "tallerreactbuenaspractic-87a30",
  storageBucket: "tallerreactbuenaspractic-87a30.appspot.com",
  messagingSenderId: "474807969906",
  appId: "1:474807969906:web:849c6312fa2b0b28857aeb",
  measurementId: "G-BMD5L7B0K4"
};
  

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export{firebase}
