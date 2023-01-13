import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAHk3pF5G8E76cwwbJQiORkm9BiG-p8OlQ",
  authDomain: "expense-tracker-6b9be.firebaseapp.com",
  projectId: "expense-tracker-6b9be",
  storageBucket: "expense-tracker-6b9be.appspot.com",
  messagingSenderId: "981775930212",
  appId: "1:981775930212:web:6953bd88bcb3afe96ce071",
  measurementId: "G-2Z8476HNFV"
};

const app = initializeApp(firebaseConfig);
const fireDb = getFirestore(app); 

export {fireDb, app};