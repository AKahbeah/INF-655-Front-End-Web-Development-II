import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDJO1CJDB8mriqqEr3OPsp7spLDcwjfRWM",
  authDomain: "plate-planner-74fd2.firebaseapp.com",
  projectId: "plate-planner-74fd2",
  storageBucket: "plate-planner-74fd2.firebasestorage.app",
  messagingSenderId: "1047180111935",
  appId: "1:1047180111935:web:665111b65324953f90488a"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);