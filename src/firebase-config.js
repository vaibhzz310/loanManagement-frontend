// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBwOlF8__PGjFhqCRSVodqZ_fayMiESaJ8",
  authDomain: "loan-management-2c0bb.firebaseapp.com",
  projectId: "loan-management-2c0bb",
  storageBucket: "loan-management-2c0bb.appspot.com",
  messagingSenderId: "799081497653",
  appId: "1:799081497653:web:cfc8e018e9360f68165d7c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);