import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
const apiKey = import.meta.env.VITE_APP_PUBLIC_API_KEY
const authDomain=import.meta.env.VITE_APP_PUBLIC_AUTH_DOMAIN
const projectId=import.meta.env.VITE_APP_PUBLIC_PROJECT_ID
const storageBucket=import.meta.env.VITE_APP_PUBLIC_STORAGE_BUCKET
const messagingSenderId=import.meta.env.VITE_APP_PUBLIC_MESSAGE_SENDER_ID
const appId=import.meta.env.VITE_APP_PUBLIC_APP_ID
const firebaseConfig = {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider()
export { auth, provider };