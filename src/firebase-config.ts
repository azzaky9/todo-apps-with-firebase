// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCKs1P6OcDA1nUsHGrzqC2etDMvW8Z_jdk",
  authDomain: "test-study-37994.firebaseapp.com",
  projectId: "test-study-37994",
  storageBucket: "test-study-37994.appspot.com",
  messagingSenderId: "386979427486",
  appId: "1:386979427486:web:c5e1d90c1efd2d6ad1b78f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Service
export const db = getFirestore(app);
export const auth = getAuth(app);
