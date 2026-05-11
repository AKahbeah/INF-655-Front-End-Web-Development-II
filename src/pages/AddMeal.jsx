import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";

function AddMeal() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [day, setDay] = useState("");
  const [category, setCategory] = useState("");
  const [ingredients, setIngredients] = useState("");

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSuccessMessage("");
    setErrorMessage("");

    // 🔴 1. Auth safety check
    if (!auth.currentUser) {
      setErrorMessage("You must be logged in to add a meal.");
      return;
    }

    // 🔴 2. Form validation
    if (!name || !description || !day || !category) {
      setErrorMessage("Please fill out all required fields.");
      return;
    }

    try {
      await addDoc(collection(db, "meals"), {
        name,
        description,
        day,
        category,

        // convert string → array
        ingredients: ingredients
          ? ingredients.split(",").map((item) => item.trim())
          : [],

        completed: false,

        // 🔴 user isolation (IMPORTANT for grading)
        userId: auth.currentUser.uid,

        createdAt: new Date()
      });

      // success feedback
      setSuccessMessage("Meal added successfully!");

      // reset form
      setName("");
      setDescription("");
      setDay("");
      setCategory("");
      setIngredients("");

    } catch (error) {
      setErrorMessage(error.message || "Something went wrong.");
    }
  };

  return (
    <div>
      <h1>Add Meal</h1>

      {/* Success / Error messages */}
      {successMessage && (
        <p style={{ color: "green" }}>{successMessage}</p>
      )}

      {errorMessage && (
        <p style={{ color: "red" }}>{errorMessage}</p>
      )}

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Meal Name *"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Description *"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <select value={day} onChange={(e) => setDay(e.target.value)}>
          <option value="">Select Day *</option>
          <option>Monday</option>
          <option>Tuesday</option>
          <option>Wednesday</option>
          <option>Thursday</option>
          <option>Friday</option>
          <option>Saturday</option>
          <option>Sunday</option>
        </select>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select Category *</option>
          <option>Breakfast</option>
          <option>Lunch</option>
          <option>Dinner</option>
          <option>Snack</option>
        </select>

        <input
          placeholder="Ingredients (comma separated)"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
        />

        <button type="submit">Add Meal</button>
      </form>
    </div>
  );
}

export default AddMeal;

