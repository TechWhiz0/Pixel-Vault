// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "fir-7db92.firebaseapp.com",
  projectId: "fir-7db92",
  storageBucket: "fir-7db92.appspot.com",
  messagingSenderId: "302405859871",
  appId: "1:302405859871:web:5e81b235c8c6490aa0b32a",
  measurementId: "G-8NJPNCJY6M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage=getStorage(app)