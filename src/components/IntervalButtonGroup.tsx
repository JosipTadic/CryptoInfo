import { IintervalButtonGroup } from "../types";
import IntervalButton from "./IntervalButton";

const IntervalButtonGroup: React.FC<IintervalButtonGroup> = ({fromInterval, interval, setPeriodInterval}) => {
  
  return (
          <div>
            {(fromInterval < 35 && fromInterval > 2) || fromInterval === 0 ? (
              <IntervalButton
                interval={interval}
                amountOfDays={"1d"}
                buttonText={"1 Day"}
                setPeriodInterval={() => setPeriodInterval!("1d")}
              />
            ) : (
              <IntervalButton
                interval={interval}
                amountOfDays={"1d"}
                buttonText={"1 Day"}
              />
            )}
            {fromInterval > 7 || fromInterval === 0 ? (
              <IntervalButton
                interval={interval}
                amountOfDays={"7d"}
                buttonText={"7 Day"}
                setPeriodInterval={() => setPeriodInterval!("7d")}
              />
            ) : (
              <IntervalButton
                interval={interval}
                amountOfDays={"7d"}
                buttonText={"7 Day"}
              />
            )}
            {fromInterval > 30 || fromInterval === 0 ? (
              <IntervalButton
                interval={interval}
                amountOfDays={"30d"}
                buttonText={"30 Day"}
                setPeriodInterval={() => setPeriodInterval!("30d")}
              />
            ) : (
              <IntervalButton
                interval={interval}
                amountOfDays={"30d"}
                buttonText={"30 Day"}
              />
            )}
            {fromInterval > 90 ? (
              <IntervalButton
                interval={interval}
                amountOfDays={"90d"}
                buttonText={"90 Day"}
                setPeriodInterval={() => setPeriodInterval!("90d")}
              />
            ) : (
              <IntervalButton
                interval={interval}
                amountOfDays={"90d"}
                buttonText={"90 Day"}
              />
            )}
          </div>
  );
};

export default IntervalButtonGroup;
