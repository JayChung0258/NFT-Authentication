// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDXK1RuMETkYaaerO2_sY7lFWsTNs5uDhw",
  authDomain: "nft-authentication-742f6.firebaseapp.com",
  projectId: "nft-authentication-742f6",
  storageBucket: "nft-authentication-742f6.appspot.com",
  messagingSenderId: "287335622167",
  appId: "1:287335622167:web:ce31fbddf39950d844de52",
  databaseURL:
    "https://nft-authentication-742f6-default-rtdb.asia-southeast1.firebasedatabase.app",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);

export default database;
