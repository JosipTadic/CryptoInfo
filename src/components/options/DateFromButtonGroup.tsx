import React from "react";
import { IdateFromButtonGroup } from "../../types";
import DateFromButton from "./DateFromButton";

const DateFromButtonGroup: React.FC<IdateFromButtonGroup> = ({
  fromInterval,
  interval,
  getInterval,
}) => {
  return (
    <div className="">
      {interval === "1h" || interval === "1d" ? (
        <DateFromButton
          interval={fromInterval}
          amountOfDays="7"
          buttonText="Week"
          getInterval={getInterval}
        />
      ) : (
        <DateFromButton
          interval={fromInterval}
          amountOfDays="7"
          buttonText="Week"
        />
      )}
      {interval === "1d" || interval === "7d" ? (
        <DateFromButton
          interval={fromInterval}
          amountOfDays="30"
          buttonText="Month"
          getInterval={getInterval}
        />
      ) : (
        <DateFromButton
          interval={fromInterval}
          amountOfDays="30"
          buttonText="Month"
        />
      )}
      {interval === "7d" || interval === "30d" || interval === "90d" ? (
        <DateFromButton
          interval={fromInterval}
          amountOfDays="364"
          buttonText="Year"
          getInterval={getInterval}
        />
      ) : (
        <DateFromButton
          interval={fromInterval}
          amountOfDays="364"
          buttonText="Year"
        />
      )}
    </div>
  );
};

export default React.memo(DateFromButtonGroup);
