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
  getFormattedDate,
}) => {
  return (
    <>
      <ResponsiveContainer width="95%" height="90%">
        <LineChart
          data={historicalData}
          margin={{ top: 0, right: 0, left: 25, bottom: 0 }}
        >
          <CartesianGrid stroke="lightgray" strokeDasharray={5} />
          <XAxis
            dataKey="timestamp"
            tickFormatter={(number) => getFormattedDate(number)}
          />
          <YAxis tickFormatter={(number) => number.toString() + "$"} />
          <Tooltip
            labelFormatter={getFormattedDate}
            formatter={(value: number) =>
              new Intl.NumberFormat("en").format(value) + "$"
            }
          />
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
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};

export default LineChartPrice;
