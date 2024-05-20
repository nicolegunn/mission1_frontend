import styles from "./DropDown.module.css";
import { useState, useEffect } from "react";

export default function DropDown({
  items = [],
  selectMsg,
  initialSelectedValue,
}) {
  const [selectedValue, setSelectedValue] = useState(
    initialSelectedValue || ""
  );

  useEffect(() => {
    setSelectedValue(initialSelectedValue);
  }, [initialSelectedValue]);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <div className={styles.DropDownWrapper}>
      <select
        className={styles.DropDown}
        value={selectedValue}
        onChange={handleChange}
      >
        <option value="">{selectMsg}</option>
        {/* Dynamically create options based on items */}
        {items.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
}
