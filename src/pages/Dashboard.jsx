import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
  doc
} from "firebase/firestore";

import { auth, db } from "../firebase/firebase";
import { Link } from "react-router-dom";

function Dashboard() {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
  ];

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        setLoading(true);

        // 🔴 SAFETY CHECK (IMPORTANT)
        if (!auth.currentUser) return;

        const q = query(
          collection(db, "meals"),
          where("userId", "==", auth.currentUser.uid)
        );

        const data = await getDocs(q);

        setMeals(
          data.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id
          }))
        );

      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMeals();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "meals", id));

      setMeals((prev) =>
        prev.filter((meal) => meal.id !== id)
      );

    } catch (error) {
      alert(error.message);
    }
  };

  if (loading) {
    return <p>Loading meals...</p>;
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Weekly Meal Planner</h1>

      {/* EMPTY STATE */}
      {meals.length === 0 && (
        <p>No meals found. Start by adding one!</p>
      )}

      {days.map((day) => (
        <div
          key={day}
          style={{
            border: "2px solid gray",
            marginBottom: 20,
            padding: 10
          }}
        >
          <h2>{day}</h2>

          {meals
            .filter((meal) => meal.day === day)
            .map((meal) => (
              <div
                key={meal.id}
                style={{
                  border: "1px solid black",
                  padding: 10,
                  marginBottom: 10
                }}
              >
                <h3>{meal.name}</h3>

                <p>{meal.description}</p>

                <p>
                  <strong>Category:</strong> {meal.category}
                </p>

                <p>
                  <strong>Ingredients:</strong>{" "}
                  {meal.ingredients?.join(", ")}
                </p>

                <Link to={`/edit-meal/${meal.id}`}>
                  <button>Edit</button>
                </Link>

                <button onClick={() => handleDelete(meal.id)}>
                  Delete
                </button>
              </div>
            ))}
        </div>
      ))}
    </div>
  );
}

export default Dashboard;