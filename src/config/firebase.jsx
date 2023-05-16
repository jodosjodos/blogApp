// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDNVeQyW2sHrBJbr2f_Z1LvnU7cdy3vgtA",
  authDomain: "blog-app-14f5f.firebaseapp.com",
  projectId: "blog-app-14f5f",
  storageBucket: "blog-app-14f5f.appspot.com",
  messagingSenderId: "40553831429",
  appId: "1:40553831429:web:4234aa73fb8c8a34c6506c",
  measurementId: "G-TRYDRLDGQ6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    
    return result;
  } catch (error) {
    console.log(error);
    throw error;
    
  }
};

const analytics = getAnalytics(app);
