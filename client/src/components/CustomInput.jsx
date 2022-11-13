import React from "react";
import styles from "../styles";

const regex = /^[A-Za-z0-9]+$/;
const CustomInput = ({ label, placeholder, value, handleValueChange }) => {
  return (
    <>
      <label htmlFor="name" className={styles.label} value="name">
        {label}
      </label>
      <input
        type="text"
        name="name"
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          if (e.target.value !== "" || regex.test(e.target.value)) {
            handleValueChange(e.target.value);
          }
        }}
        className={styles.input}
      />
    </>
  );
};

export default CustomInput;
