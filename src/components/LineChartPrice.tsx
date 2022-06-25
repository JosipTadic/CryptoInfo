import React from "react";
import "bulma/css/bulma.min.css";
import {
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Line,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";
import { IlineChartPrice } from "../types";

const LineChartPrice: React.FC<IlineChartPrice> = ({
  historicalData,
  showLocalHigh,
  showLocalLow,
  priceLocalHigh,
  priceLocalLow,
}) => {
  const CustomTooltip: React.FC<{ active: any; payload: any; label: any }> = ({
    active,
    payload,
    label,
  }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">{`${label} : ${payload[0].value}`}</p>
          <p className="desc">Anything you want can be displayed here.</p>
        </div>
      );
    }

    return null;
  };

  return (
    <>
      <ResponsiveContainer width="95%" height="90%">
        <LineChart
          data={historicalData}
          margin={{ top: 0, right: 0, left: 80, bottom: 0 }}
        >
          <CartesianGrid stroke="lightgray" strokeDasharray={5} />
          <XAxis dataKey="timestamp" />
          <YAxis tickFormatter={(number) => number.toString() + "$"} />
          <Tooltip />
          {showLocalHigh ? (
            <ReferenceLine
              y={priceLocalHigh}
              label={priceLocalHigh}
              stroke="red"
              strokeDasharray={9}
              ifOverflow="extendDomain"
            />
          ) : (
            ""
          )}
          {showLocalLow ? (
            <ReferenceLine
              y={priceLocalLow}
              label={priceLocalLow}
              stroke="red"
              strokeDasharray={9}
              ifOverflow="extendDomain"
            />
          ) : (
            ""
          )}
          <Line name="Price" type="monotone" dataKey="price" stroke="#8884d8" />
          <Tooltip
            content={
              <CustomTooltip
                active={undefined}
                payload={undefined}
                label={undefined}
              />
            }
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};

export default LineChartPrice;
