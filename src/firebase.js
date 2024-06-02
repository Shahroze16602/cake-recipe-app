import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAMOBI2hZFXpm_GyUP9JQIwzN-NZ-6qtko",
  authDomain: "cake-recipe-app-72307.firebaseapp.com",
  projectId: "cake-recipe-app-72307",
  storageBucket: "cake-recipe-app-72307.appspot.com",
  messagingSenderId: "330393722238",
  appId: "1:330393722238:web:c74a8980ee917b9d2ba72f"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);