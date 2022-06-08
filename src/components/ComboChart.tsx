import React from "react";
import "bulma/css/bulma.min.css";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Line,
  Area,
  Tooltip,
  Legend,
  ComposedChart,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";
import { IcomboChart } from "../types";

const ComboChart: React.FC<IcomboChart> = ({
  historicalData,
  showLocalHigh,
  showLocalLow,
  priceLocalHigh,
  priceLocalLow,
  volumeLocalHigh,
  volumeLocalLow,
}) => {
  return (
    <>
      <ResponsiveContainer width="97%" height="90%">
        <ComposedChart
          data={historicalData}
          margin={{
            top: 0,
            right: 0,
            bottom: 0,
            left: 80,
          }}
        >
          <defs>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="1%" stopColor="#8884d8" stopOpacity={0.95} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="lightgray" strokeDasharray={5} />
          <XAxis dataKey="timestamp" scale="band" />
          <YAxis yAxisId="left" dataKey="volume_24h" />
          {showLocalHigh ? (
            <ReferenceLine
              y={volumeLocalHigh}
              yAxisId="left"
              label="Max volume"
              stroke="red"
              strokeDasharray={12}
              ifOverflow="extendDomain"
            />
          ) : (
            ""
          )}
          {showLocalLow ? (
            <ReferenceLine
              y={volumeLocalLow}
              yAxisId="left"
              label="Min volume"
              stroke="red"
              strokeDasharray={12}
              ifOverflow="extendDomain"
            />
          ) : (
            ""
          )}
          <YAxis yAxisId="right" dataKey="price" orientation="right" />
          {showLocalHigh ? (
            <ReferenceLine
              y={priceLocalHigh}
              yAxisId="right"
              label="Max price"
              stroke="red"
              strokeDasharray={12}
              ifOverflow="extendDomain"
            />
          ) : (
            ""
          )}
          {showLocalLow ? (
            <ReferenceLine
              y={priceLocalLow}
              yAxisId="right"
              label="Min price"
              stroke="red"
              strokeDasharray={12}
              ifOverflow="extendDomain"
            />
          ) : (
            ""
          )}
          <Tooltip />
          <Legend />
          <Area
            yAxisId="left"
            type="monotone"
            activeDot={{ r: 2 }}
            dataKey="volume_24h"
            stroke="#0000ea"
            fillOpacity={1}
            fill="url(#colorPv)"
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="price"
            stroke="#060040"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </>
  );
};

export default ComboChart;
