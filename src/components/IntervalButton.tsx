import React from "react";
import "bulma/css/bulma.min.css";
import { IintervalButton, IntervalType } from "../types";

const IntervalButton: React.FC<IintervalButton> = ({
  interval,
  setPeriodInterval,
  amountOfDays,
  buttonText,
}) => {
  return (
    <>
      {setPeriodInterval ? (
        <button
          className={
            interval === amountOfDays
              ? "button is-info  m-1"
              : "button is-info is-outlined  m-1"
          }
          onClick={() => setPeriodInterval(amountOfDays as IntervalType)}
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

export default IntervalButton;
