import styles from './ImageUpload.module.css'
import React, { useState } from "react";
import axios from "axios";
import ObjectExtractor from "./ObjectExtractor";

export default function ImageUpload() {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(""); // Added imageUrl state

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
    setImageUrl(URL.createObjectURL(event.target.files[0])); // Set imageUrl
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await axios.post(
        "http://localhost:4000/upload",
        formData
      );

      // Process response.data if needed
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div className={styles.MainContainer}>
      <input type="file" onChange={handleImageChange} />
      <button onClick={handleUpload}>Upload</button>
      {imageUrl && <img src={imageUrl} alt="Uploaded" />}{" "}
      {/* Display uploaded image */}
      <ObjectExtractor image={imageUrl} /> {/* Pass imageUrl as image prop */}
    </div>
  );
}
