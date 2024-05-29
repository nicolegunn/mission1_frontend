import axios from "axios";
import { useState } from "react";
import commonStyles from "../../assets/styles/CommonStyles.module.css";
import styles from "./PremiumCalculator.module.css";
export default function PremiumCalculator() {
  const [textInput, setTextInput] = useState(null);
  const [riskRating, setRiskRating] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleChange = (e) => {
    setTextInput(e.target.value);
  };

  const handleClick = (e) => {
    e.preventDefault();
    setRiskRating(null);
    const data = { claim_history: textInput.trim() };
    console.log(data);
    console.log(typeof data.claim_history);
    axios
      .post(`${import.meta.env.VITE_REACT_APP_BACKEND_URL2}/risk_rating`, data)
      .then((response) => {
        console.log("Response:", response);
        if (response.data.risk_rating) {
          setRiskRating(response.data.risk_rating);
          setErrorMessage(null);
        } else {
          setErrorMessage("Unable to calculate risk rating. Please try again.");
          setRiskRating(null);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setErrorMessage("An error occurred while calculating risk rating.");
        setRiskRating(null);
      });
  };

  return (
    <div className={`${styles.MainContainer}`}>
      <form
        className={`${commonStyles.SameHeightContainer} ${styles.Form}`}
        action=""
      >
        <textarea onChange={(e) => handleChange(e)} />
        <p>{textInput}</p>
        <button className={commonStyles.Button} onClick={(e) => handleClick(e)}>
          Calculate Risk
        </button>
        {riskRating && (
          <p
            className={styles.RiskRatingMessage}
          >{`The risk rating is: ${riskRating}`}</p>
        )}
        {errorMessage && (
          <p className={styles.RiskRatingMessage}>{errorMessage}</p>
        )}
      </form>
    </div>
  );
}
