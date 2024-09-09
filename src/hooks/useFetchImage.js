import { useState, useEffect } from "react";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { app } from "../../firebase";

export const useFetchImage = (imagePath) => {
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState(null);
  const storage = getStorage(app);

  useEffect(() => {
    if (imagePath) {
      const imageRef = ref(storage, imagePath);

      getDownloadURL(imageRef)
        .then((url) => {
          setImageUrl(url);
        })
        .catch((err) => {
          setError(err);
          console.error("error al traer imagen:", err);
        });
    }
  }, [imagePath, storage]);

  return { imageUrl, error };
};
