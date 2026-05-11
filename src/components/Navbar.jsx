import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase";
import { signOut } from "firebase/auth";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <nav style={styles.navbar}>
      <h2 style={styles.logo}>Plate Planner</h2>

      <div style={styles.links}>
        <Link to="/" style={styles.link}>Home</Link>

        {user ? (
          <>
            <Link to="/dashboard" style={styles.link}>
              Dashboard
            </Link>

            <Link to="/add-meal" style={styles.link}>
              Add Meal
            </Link>

            <Link to="/grocery" style={styles.link}>
              Grocery List
            </Link>

            <button onClick={handleLogout} style={styles.button}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/register" style={styles.link}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "#333",
    color: "#fff"
  },
  logo: {
    margin: 0
  },
  links: {
    display: "flex",
    gap: "15px",
    alignItems: "center"
  },
  link: {
    color: "white",
    textDecoration: "none"
  },
  button: {
    padding: "6px 10px",
    cursor: "pointer"
  }
};

export default Navbar;