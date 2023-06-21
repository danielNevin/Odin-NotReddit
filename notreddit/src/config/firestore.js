// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAZcg1jWGG4gjl80FRrkHOmSW-LM5x_tCI",
  authDomain: "notreddit-7a359.firebaseapp.com",
  projectId: "notreddit-7a359",
  storageBucket: "notreddit-7a359.appspot.com",
  messagingSenderId: "714106577434",
  appId: "1:714106577434:web:5b231ae384b5cae69667a3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);