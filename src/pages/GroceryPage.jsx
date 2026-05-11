import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";

function GroceryPage() {
  const [groceryList, setGroceryList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGroceryItems = async () => {
      try {
        setLoading(true);

        if (!auth.currentUser) return;

        const q = query(
          collection(db, "meals"),
          where("userId", "==", auth.currentUser.uid)
        );

        const data = await getDocs(q);

        const meals = data.docs.map((doc) => doc.data());

        // 🔴 Extract all ingredients
        const allIngredients = meals.flatMap((meal) =>
          meal.ingredients ? meal.ingredients : []
        );

        // 🔴 Remove duplicates + clean empty values
        const cleanedList = [...new Set(allIngredients)].filter(
          (item) => item && item.trim() !== ""
        );

        setGroceryList(cleanedList);

      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchGroceryItems();
  }, []);

  if (loading) {
    return <p>Loading grocery list...</p>;
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Grocery List</h1>

      {groceryList.length === 0 ? (
        <p>No ingredients found. Add meals first.</p>
      ) : (
        <ul>
          {groceryList.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default GroceryPage;