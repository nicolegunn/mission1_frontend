import styles from "./ImageUpload.module.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

// updateBody, updateMake;
export default function ImageUpload({ updateCarData }) {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    if (image !== null) {
      const formData = new FormData();
      formData.append("image", image);

      axios
        .post("http://localhost:4001/upload", formData)
        .then((response) => {
          const bodyType = response.data.bodyType;
          const carMake = response.data.carMake;
          const bodyTypeConfidence = response.data.bodyTypeConfidence;
          const carMakeConfidence = response.data.carMakeConfidence;
          // updateBody(bodyType);
          // updateMake(carMake);
          updateCarData(
            bodyType,
            carMake,
            bodyTypeConfidence,
            carMakeConfidence
          );
        })
        .catch((error) => {
          console.error("Error uploading image:", error);
          console.error("Full error object:", error);
        });
    }
  }, [image, imageUrl]);

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
    setImageUrl(URL.createObjectURL(event.target.files[0]));
  };

  return (
    <div className={styles.MainContainer}>
      <h2 className={styles.MainHeading}>Upload Photo</h2>
      <img
        className={styles.CarImage}
        src={imageUrl || "/cloud_image_white.png"}
        alt="Uploaded"
      />

      <label htmlFor="fileInput" className={styles.UploadFileButton}>
        <span>Choose File</span>
        <input id="fileInput" type="file" onChange={handleImageChange} />
      </label>
    </div>
  );
}
