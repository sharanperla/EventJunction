// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDFeUvvZ4ra0EXNCA4nJdyEGuum1wrnec0",
  authDomain: "eventjunction-b8db1.firebaseapp.com",
  projectId: "eventjunction-b8db1",
  storageBucket: "eventjunction-b8db1.appspot.com",
  messagingSenderId: "123495061540",
  appId: "1:123495061540:web:5d1f5259457b0aa69060b1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
