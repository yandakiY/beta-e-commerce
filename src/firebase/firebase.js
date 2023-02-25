// Import the functions you need from the SDKs you need
import { initializeApp  } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA2eO6YRJNtiW3GkhssxfbftFD2v5sp7JQ",
  authDomain: "beta-e-commerce.firebaseapp.com",
  databaseURL: "https://beta-e-commerce-default-rtdb.firebaseio.com",
  projectId: "beta-e-commerce",
  storageBucket: "beta-e-commerce.appspot.com",
  messagingSenderId: "380228977108",
  appId: "1:380228977108:web:67547c6725894adc6c1641",
  measurementId: "G-KD5LPYXKRR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//Storage
const storage = getStorage()

// Authentification
const auth = getAuth(app);
// const analytics = getAnalytics(app);
export { storage , auth , app } 