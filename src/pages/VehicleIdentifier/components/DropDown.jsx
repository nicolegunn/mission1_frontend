import { useState, useEffect } from "react";
import styles from "./DropDown.module.css";

export default function DropDown({
  items = [],
  selectMsg,
  initialSelectedValue,
}) {
  const [selectedValue, setSelectedValue] = useState(
    initialSelectedValue || ""
  );

  // If the bodyType or make props change in Premium, this will trigger an initialSelectedValue change
  useEffect(() => {
    setSelectedValue(initialSelectedValue);
  }, [initialSelectedValue]);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
      <select
        className={styles.DropDown}
        value={selectedValue}
        onChange={handleChange}
      >
        <option value="">{selectMsg}</option>
        {items.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>
  );
}


  