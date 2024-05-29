import { useState } from "react";
import styles from "./VehicleIdentifier.module.css";
import ImageUpload from "./components/ImageUpload";
import Premium from "./components/Premium";

export default function VehicleIdentifier() {
  const [bodyType, setBodyType] = useState("");
  const [make, setMake] = useState("");
  const [bodyTypeConfidence, setBodyTypeConfidence] = useState(null);
  const [makeConfidence, setMakeConfidence] = useState(null);

  const updateCarData = (
    newBodyType,
    newMake,
    newBodyTypeConfidence,
    newMakeConfidence
  ) => {
    setBodyType(newBodyType);
    setMake(newMake);
    setBodyTypeConfidence(newBodyTypeConfidence);
    setMakeConfidence(newMakeConfidence);
  };
  return (
    <div className={styles.MainContainer}>
      <ImageUpload updateCarData={updateCarData} />
      <Premium
        bodyType={bodyType}
        make={make}
        bodyTypeConfidence={bodyTypeConfidence}
        makeConfidence={makeConfidence}
      />
    </div>
  );
}
