// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASEKEY,
  authDomain: "inhatc-react.firebaseapp.com",
  databaseURL: "https://inhatc-react-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "inhatc-react",
  storageBucket: "inhatc-react.firebasestorage.app",
  messagingSenderId: "685305337154",
  appId: "1:685305337154:web:bee27c03a178c90c0424db",
  measurementId: "G-BNWQG3GQX4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);