import React from "react";
import "bulma/css/bulma.min.css";
import { IintervalButton, IntervalType } from "../../types";
import { motion } from "framer-motion";

const IntervalButton: React.FC<IintervalButton> = ({
  interval,
  setPeriodInterval,
  amountOfDays,
  buttonText,
}) => {
  return (
    <>
      {setPeriodInterval ? (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={
            interval === amountOfDays
              ? "button is-info  m-1"
              : "button is-info is-outlined  m-1"
          }
          onClick={() => setPeriodInterval(amountOfDays as IntervalType)}
        >
          {buttonText}
        </motion.button>
      ) : (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={
            interval === amountOfDays
              ? "button is-info  m-1"
              : "button is-info is-outlined  m-1"
          }
          disabled
        >
          {buttonText}
        </motion.button>
      )}
    </>
  );
};

export default IntervalButton;
