import React from "react";
import "bulma/css/bulma.min.css";
import { IdateFromButton } from "../../types";
import { motion } from "framer-motion";

const DateFromButton: React.FC<IdateFromButton> = ({
  interval,
  getInterval,
  amountOfDays,
  buttonText,
}) => {
  return (
    <>
      {getInterval ? (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={
            interval === amountOfDays
              ? "button is-info  m-1"
              : "button is-info is-outlined  m-1"
          }
          onClick={() => getInterval(amountOfDays as unknown as number)}
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

export default DateFromButton;
