import styles from "./Premium.module.css";
import { useState, useEffect } from "react";
import DropDown from "./DropDown";
import axios from "axios";
require("dotenv").config(); 

const bodyTypes = ["Sedan", "Hatchback", "Station Wagon", "SUV", "Van", "Ute"];
const makes = [
  "Audi",
  "BMW",
  "Ford",
  "Holden",
  "Honda",
  "Hyundai",
  "Mazda",
  "Mercedes-Benz",
  "Mini",
  "Mitsubishi",
  "Nissan",
  "Toyota",
  "Volkswagen",
];

export default function Premium({
  bodyType,
  make,
  bodyTypeConfidence,
  makeConfidence,
}) {
  const [premium, setPremium] = useState("test");

  useEffect(() => {
    if (bodyType.length > 0 && make.length > 0) {
      console.log(`bodyType: ${bodyType}`);
      console.log(`make: ${make}`);
      axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/calculate`, {
          bodyType: bodyType,
          make: make,
        })
        .then((response) => {
          console.log(response.data);
          const base_premium = response.data.base_premium;
          const multiple = response.data.multiple;
          console.log(base_premium);
          console.log(multiple);

          setPremium(base_premium * multiple);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, [bodyType, make]);

  return (
    <div className={styles.PremiumContainer}>
      <h2 className={styles.MainHeading}>Insurance Premium Calculator</h2>
      <div className={styles.AITextContainer}>
        <h3 className={styles.AIHeading}>AI Generated Body Type & Make</h3>
        <div className={styles.AILine}>
          <span className={styles.AIField}>Body Type:</span>
          <span className={styles.AIResult}>{bodyType}</span>
          <span className={styles.AIField}>Confidence:</span>
          <span className={styles.AIConfidence}>{bodyTypeConfidence}%</span>
        </div>
        <div className={styles.AILine}>
          <div className={styles.AIField}>Make:</div>
          <div className={styles.AIResult}>{make}</div>
          <span className={styles.AIField}>Confidence:</span>
          <span className={styles.AIConfidence}>{makeConfidence}%</span>
        </div>
      </div>
      <div className={styles.FilterContainer}>
        <DropDown
          items={bodyTypes}
          selectMsg="Select Body Type"
          initialSelectedValue={bodyType}
        />
        <DropDown
          items={makes}
          selectMsg="Select Make"
          initialSelectedValue={make}
        />
      </div>
      <p>{`The estimated premium is: $${premium}`}</p>
      <div className={styles.CalculatePremiumButton}>Calculate Premium</div>
    </div>
  );
}
