import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddMeal from "./pages/AddMeal";
import EditMeal from "./pages/EditMeal";
import GroceryPage from "./pages/GroceryPage";
import Navbar from "./components/Navbar";

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-meal"
          element={
            <ProtectedRoute>
              <AddMeal />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit-meal/:id"
          element={
            <ProtectedRoute>
              <EditMeal />
            </ProtectedRoute>
          }
        />

        <Route
          path="/grocery"
          element={
            <ProtectedRoute>
              <GroceryPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;