import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions"; // ✅ Import functions

const firebaseConfig = {
  apiKey: "google api key",//# is small 
  authDomain: "teacher-availability.firebaseapp.com",
  projectId: "teacher-availability",
  storageBucket: "teacher-availability.appspot.com",
  messagingSenderId: "59869004799",
  appId: "1:59869004799:web:99daf23aaa4f499f189dca",
  measurementId: "G-9K9880NV20"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const functions = getFunctions(app); // ✅ Export functions
export default app;
