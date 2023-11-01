
import { initializeApp } from "@firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "realestateapplication-27d3c.firebaseapp.com",
  projectId: "realestateapplication-27d3c",
  storageBucket: "realestateapplication-27d3c.appspot.com",
  messagingSenderId: "529613361931",
  appId: "1:529613361931:web:2893d1b86b9e4ddcc1080e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);