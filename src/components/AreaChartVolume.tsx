import React from "react";
import "bulma/css/bulma.min.css";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Area,
  AreaChart,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";
import { IareaChartVolume } from "../types";

const AreaChartVolume: React.FC<IareaChartVolume> = ({
  historicalData,
  showLocalHigh,
  showLocalLow,
  volumeLocalHigh,
  volumeLocalLow
}) => {
  return (
    <>
      <ResponsiveContainer width="95%" height="90%">
        <AreaChart
          data={historicalData}
          margin={{ top: 0, right: 0, left: 80, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="1%" stopColor="#0b0073" stopOpacity={0.95} />
              <stop offset="95%" stopColor="#050253" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="timestamp" interval={5} angle={0} dx={20} />
          <YAxis />
          <CartesianGrid stroke="lightgray" strokeDasharray={5} />
          <Tooltip />
          <Area
            type="monotone"
            activeDot={{ r: 3 }}
            dataKey="volume_24h"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#colorUv)"
          />
          {showLocalHigh ? (
            <ReferenceLine
              y={volumeLocalHigh}
              label={volumeLocalHigh}
              stroke="red"
              strokeDasharray={9}
              ifOverflow="extendDomain"
            />
          ) : (
            ""
          )}
          {showLocalLow ? (
            <ReferenceLine
              y={volumeLocalLow}
              label={volumeLocalLow}
              stroke="red"
              strokeDasharray={9}
              ifOverflow="extendDomain"
            />
          ) : (
            ""
          )}
        </AreaChart>
      </ResponsiveContainer>
    </>
  );
};

export default AreaChartVolume;
