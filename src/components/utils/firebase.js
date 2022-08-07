// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
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
};

// Initialize Firebase
const useFireBase = initializeApp(firebaseConfig);

export default useFireBase;
