import React, { useState, useEffect } from "react";
import "./App.css";

// Your existing components
import Greeting from "./Greeting";
import UserInfo from "./UserInfo";
import TaskComponent from "./TaskComponent";

// Firebase imports
import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";

import {
  getFirestore,
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
  deleteDoc,
  doc,
  serverTimestamp
} from "firebase/firestore";

// 🔥 Firebase config (replace with your own from Firebase console)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

function App() {
  // =========================
  // AUTH STATE
  // =========================
  const [user, setUser] = useState(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // =========================
  // TASK STATE
  // =========================
  const [tasks, setTasks] = useState([]);

  // Listen for login/logout
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  // Load tasks in REAL TIME for logged-in user
  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "tasks"),
      where("userId", "==", user.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const userTasks = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setTasks(userTasks);
    });

    return () => unsubscribe();
  }, [user]);

  // =========================
  // AUTH FUNCTIONS
  // =========================
  const handleSignUp = async () => {
    await createUserWithEmailAndPassword(auth, email, password);
  };

  const handleLogin = async () => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  // =========================
  // FIRESTORE TASK FUNCTIONS
  // =========================
  const addTask = async (taskName, taskDescription) => {
    if (!user) return;

    await addDoc(collection(db, "tasks"), {
      userId: user.uid,
      taskName,
      taskDescription,
      createdAt: serverTimestamp()
    });
  };

  const deleteTask = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this task?");
    if (!confirmDelete) return;

    await deleteDoc(doc(db, "tasks", id));
  };

  // =========================
  // UI
  // =========================
  return (
    <div className="App">
      <Greeting username={user ? user.email : "Guest"} />
      <hr />

      {/* ================= LOGIN / SIGNUP ================= */}
      {!user ? (
        <div>
          <h2>Login / Sign Up</h2>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div>
            <button onClick={handleSignUp}>Sign Up</button>
            <button onClick={handleLogin}>Login</button>
          </div>
        </div>
      ) : (
        <>
          {/* ================= LOGGED IN AREA ================= */}
          <button onClick={handleLogout}>Logout</button>

          <hr />

          <UserInfo user={user} />

          <hr />

          {/* Task Component */}
          <TaskComponent
            tasks={tasks}
            addTask={addTask}
            deleteTask={deleteTask}
          />
        </>
      )}
    </div>
  );
}

export default App;