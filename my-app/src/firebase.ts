// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";  // Import Firebase Auth

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBTcrAw2w303dqAKov0rVU0526w3CRCn5M",
  authDomain: "bmr-stealth.firebaseapp.com",
  projectId: "bmr-stealth",
  storageBucket: "bmr-stealth.appspot.com",
  messagingSenderId: "678507832711",
  appId: "1:678507832711:web:b4fadf6daa6e491cc79f22",
  measurementId: "G-FHDKHHLXVD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

export {app};
