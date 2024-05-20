import styles from "./App.module.css";
import { useState } from "react";
import NavBar from "./components/NavBar";
import ImageUpload from "./components/ImageUpload";
import Premium from "./components/Premium";

function App() {
  const [bodyType, setBodyType] = useState("");
  const [make, setMake] = useState("");
  const [bodyTypeConfidence, setBodyTypeConfidence] = useState(null);
  const [makeConfidence, setMakeConfidence] = useState(null);

  const updateBodyType = (newBodyType) => {
    setBodyType(newBodyType);
  };

  const updateMake = (newMake) => {
    setMake(newMake);
  };

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
    <>
      <NavBar />
      <div className={styles.MainContainer}>
        {/* updateBody={updateBodyType} updateMake={updateMake} */}
        <ImageUpload updateCarData={updateCarData} />
        <Premium
          bodyType={bodyType}
          make={make}
          bodyTypeConfidence={bodyTypeConfidence}
          makeConfidence={makeConfidence}
        />
      </div>
    </>
  );
}

export default App;
