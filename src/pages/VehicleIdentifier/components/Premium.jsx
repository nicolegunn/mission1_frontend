import axios from "axios";
import { SyncLoader } from "react-spinners";
import { useState, useEffect, useRef } from "react";
import commonStyles from "../../../assets/styles/CommonStyles.module.css";
import styles from "./Premium.module.css";
import DropDown from "./DropDown";

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

const NZDollar = new Intl.NumberFormat("en-NZ", {
  style: "currency",
  currency: "NZD",
});

export default function Premium({
  bodyType,
  make,
  bodyTypeConfidence,
  makeConfidence,
  isLoading,
  showAIResults,
  updateShowLoading,
}) {
  const [premium, setPremium] = useState(null);
  const [showPremium, setShowPremium] = useState(false);
  const [loadingPremium, setLoadingPremium] = useState(false);
  const aiRef = useRef(null);
  const premiumRef = useRef(null);

  useEffect(() => {
    setShowPremium(false);
    if (bodyType.length > 0 && make.length > 0) {
      updateShowLoading(false);
    }
  }, [bodyType, make]);

  const handleClick = () => {
    if (bodyType.length > 0 && make.length > 0) {
      setLoadingPremium(true);
      axios
        .post(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/calculate`, {
          bodyType: bodyType,
          make: make,
        })
        .then((response) => {
          const base_premium = response.data.base_premium;
          const multiple = response.data.multiple;
          setPremium(base_premium * multiple);
          setTimeout(() => {
            setLoadingPremium(false);
            setShowPremium(true);
          }, 1000);
        })
        .catch((error) => {
          console.error("Error:", error);
          setLoadingPremium(false);
        });
    }
  };

  return (
    <div
      className={`${commonStyles.SameHeightContainer} ${styles.PremiumContainer}`}
    >
      <h2 className={commonStyles.MainHeading}>Premium Calculator</h2>
      {isLoading && (
        <div>
          <img src="/loader.gif" />
        </div>
      )}
      <div
        className={styles.CollapsibleWrapperSlow}
        ref={aiRef}
        style={
          showAIResults
            ? { height: aiRef.current.scrollHeight + "px" }
            : { height: "0px" }
        }
      >
        <div className={styles.AITextContainer}>
          <h3 className={styles.AIHeading}>
            Vehicle Specifications
            <span>Detected by AI</span>
          </h3>
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
      {loadingPremium && (
        <>
          <SyncLoader loading={loadingPremium} color="#28a745" />
        </>
      )}
      <div
        className={styles.CollapsibleWrapper}
        ref={premiumRef}
        style={
          showPremium
            ? { height: premiumRef.current.scrollHeight + "px" }
            : { height: "0px" }
        }
      >
        <p
          className={styles.PremiumMessage}
        >{`The estimated premium is: ${NZDollar.format(premium)}`}</p>
      </div>

      <div className={commonStyles.Button} onClick={handleClick}>
        Calculate Premium
      </div>
    </div>
  );
}
