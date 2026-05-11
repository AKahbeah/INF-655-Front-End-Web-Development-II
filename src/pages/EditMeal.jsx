import { useEffect, useState } from "react";
import {
  doc,
  getDoc,
  updateDoc
} from "firebase/firestore";
import {
  useNavigate,
  useParams
} from "react-router-dom";

import { db } from "../firebase/firebase";

function EditMeal() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchMeal = async () => {
      const docRef = doc(db, "meals", id);

      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setName(docSnap.data().name);
        setDescription(docSnap.data().description);
      }
    };

    fetchMeal();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await updateDoc(doc(db, "meals", id), {
        name,
        description
      });

      alert("Meal updated!");

      navigate("/dashboard");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <h1>Edit Meal</h1>

      <form onSubmit={handleUpdate}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button type="submit">
          Update Meal
        </button>
      </form>
    </div>
  );
}

export default EditMeal;