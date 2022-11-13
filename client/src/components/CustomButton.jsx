import React from "react";
import styles from "../styles";

const CustomButton = ({ title, handleClick, restStyles }) => {
  return (
    <button
      type="button"
      onClick={handleClick}
      className={`${styles.btn} ${restStyles}`}
    >
      {title}
    </button>
  );
};

export default CustomButton;
