import axios from "axios";
import { useEffect, useState } from "react";
import commonStyles from "../../../assets/styles/CommonStyles.module.css";
import styles from "./ImageUpload.module.css";
export default function ImageUpload({ updateCarData }) {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    if (image) {
      const formData = new FormData();
      formData.append("image", image);

      axios
        .post(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/upload`, formData)
        .then((response) => {
          const { bodyType, carMake, bodyTypeConfidence, carMakeConfidence } =
            response.data;
          updateCarData(
            bodyType,
            carMake,
            bodyTypeConfidence,
            carMakeConfidence
          );
        })
        .catch((error) => {
          console.error("Error uploading image:", error);
        });
    }
  }, [image]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setImageUrl(URL.createObjectURL(file));
    }
  };

  return (
    <div
      className={`${commonStyles.SameHeightContainer} ${styles.MainContainer}`}
    >
      <h2 className={commonStyles.MainHeading}>Upload Photo</h2>
      <img
        className={styles.CarImage}
        src={imageUrl || "/cloud_image_white.png"}
        alt="Uploaded"
      />
      <label className={commonStyles.Button} htmlFor="fileInput">
        <span>Choose File</span>
        <input
          className={styles.HiddenInput}
          id="fileInput"
          type="file"
          onChange={handleImageChange}
        />
      </label>
    </div>
  );
}
