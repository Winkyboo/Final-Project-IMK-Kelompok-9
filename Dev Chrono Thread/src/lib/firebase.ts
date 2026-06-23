import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  projectId: "delta-chiller-jr5vm",
  appId: "1:1011441607029:web:1509507f7e684e73b0333c",
  apiKey: "AIzaSyClicoJGKtcRQEiDxhNiA4DZix0c6kHpk8",
  authDomain: "delta-chiller-jr5vm.firebaseapp.com",
  storageBucket: "delta-chiller-jr5vm.firebasestorage.app",
  messagingSenderId: "1011441607029",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Use the custom firestore database ID provided in the config
export const db = getFirestore(app, "ai-studio-8045a460-4284-4fc1-ba1e-2205ce893047");
