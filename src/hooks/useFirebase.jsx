import { useState, useEffect } from "react";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";

export const useFirebase = () => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        if (!id) {
          throw new Error("No ID provided");
        }

        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setResponse({ ...docSnap.data(), id: docSnap.id });
        } else {
          setError(new Error("Document does not exist"));
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  return { response, error, loading };
};
