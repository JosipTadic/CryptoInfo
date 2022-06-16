import React from "react";
import "bulma/css/bulma.min.css";
import { IdateFromButton } from "../types";

const DateFromButton: React.FC<IdateFromButton> = ({
  interval,
  getInterval,
  amountOfDays,
  buttonText,
}) => {
  return (
    <>
      {getInterval ? (
        <button
          className={
            interval === amountOfDays
              ? "button is-info  m-1"
              : "button is-info is-outlined  m-1"
          }
          onClick={() => getInterval(amountOfDays as unknown as number)}
        >
          {buttonText}
        </button>
      ) : (
        <button
          className={
            interval === amountOfDays
              ? "button is-info  m-1"
              : "button is-info is-outlined  m-1"
          }
          disabled
        >
          {buttonText}
        </button>
      )}
    </>
  );
};

export default DateFromButton;
