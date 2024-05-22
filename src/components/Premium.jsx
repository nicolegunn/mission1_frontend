import commonStyles from "./CommonStyles.module.css";
import styles from "./Premium.module.css";
import { useState, useEffect, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import axios from "axios";
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
}) {
  const [premium, setPremium] = useState(null);
  const [showAIResults, setShowAIResults] = useState(false);
  const aiNodeRef = useRef(null);
  const premiumNodeRef = useRef(null);

  useEffect(() => {
    if (bodyType.length > 0 && make.length > 0) {
      setShowAIResults(true);
    } else {
      setShowAIResults(false);
    }
  }, [bodyType, make]);

  const handleClick = () => {
    if (bodyType.length > 0 && make.length > 0) {
      axios
        .post(`https://carinsurancebackend.azurewebsites.net/calculate`, {
          bodyType: bodyType,
          make: make,
        })
        .then((response) => {
          const base_premium = response.data.base_premium;
          const multiple = response.data.multiple;
          setPremium(base_premium * multiple);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  return (
    <div
      className={`${commonStyles.SameHeightContainer} ${styles.PremiumContainer}`}
    >
      <h2 className={commonStyles.MainHeading}>Premium Calculator</h2>
      <CSSTransition
        in={showAIResults}
        nodeRef={aiNodeRef}
        timeout={300}
        classNames={{
          enter: styles.TransitionEnter,
          enterActive: styles.TransitionEnterActive,
          exit: styles.TransitionExit,
          exitActive: styles.TransitionExitActive,
        }}
        unmountOnExit
      >
        {(state) => (
          <div ref={aiNodeRef} className={styles.AITextContainer}>
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
        )}
      </CSSTransition>
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
      <CSSTransition
        in={Boolean(premium)}
        nodeRef={premiumNodeRef}
        timeout={300}
        classNames={{
          enter: styles.TransitionEnter,
          enterActive: styles.TransitionEnterActive,
          exit: styles.TransitionExit,
          exitActive: styles.TransitionExitActive,
        }}
        unmountOnExit
      >
        {(state) => (
          <p
            ref={premiumNodeRef}
            className={`${styles.PremiumMessage} ${
              state === "entered" ? styles.show : ""
            }`}
          >{`The estimated premium is: ${NZDollar.format(premium)}`}</p>
        )}
      </CSSTransition>
      <div className={commonStyles.Button} onClick={handleClick}>
        Calculate Premium
      </div>
    </div>
  );
}
