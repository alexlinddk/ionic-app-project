// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAaGJPpVabWMJofL8GZQpICRGGIgt5p3Lo",
  authDomain: "restaurants-app-2402e.firebaseapp.com",
  databaseURL: "https://restaurants-app-2402e-default-rtdb.firebaseio.com",
  projectId: "restaurants-app-2402e",
  storageBucket: "restaurants-app-2402e.appspot.com",
  messagingSenderId: "779520558011",
  appId: "1:779520558011:web:d9dbeb4605b68b11c3fa9e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Get a reference to the database service
const database = getDatabase(app);

