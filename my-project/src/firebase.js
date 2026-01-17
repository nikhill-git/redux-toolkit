// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDWgLr0EIIX4pMdWghBQdpkwY9AX5-G6K0",
  authDomain: "media-search-d87f1.firebaseapp.com",
  projectId: "media-search-d87f1",
  storageBucket: "media-search-d87f1.firebasestorage.app",
  messagingSenderId: "840974207239",
  appId: "1:840974207239:web:85558d0a638e92f2b3dda2",
  measurementId: "G-T785XPKC8K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth()