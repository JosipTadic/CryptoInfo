import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "bulma/css/bulma.min.css";
import {
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Line,
  Area,
  AreaChart,
  Tooltip,
  Legend,
} from "recharts";

export interface IhistoricalData {
  timestamp: Date | string;
  price: number;
  volume_24h: number;
  market_cap: number;
}

const ItemPage: React.FC = () => {
  let { id } = useParams();
  const [historicalData, setData] = useState<IhistoricalData[]>([]);
  useEffect(() => {
    fetch(
      "https://api.coinpaprika.com/v1/tickers/" +
        id +
        "/historical?start=2020-11-24T05:15:00Z&interval=1d"
    )
      .then((res) => res.json())
      .then(setData);
  }, []);

  return (
    <>
    <div className="columns is-centered m-0">
      <h1>{id?.split("-")[1].toUpperCase()}</h1>
      </div>
      <div className="is-flex">
        <div className="columns is-centered">
          <div className="column">
          <h2>Price</h2>
          <div className="column">
          <AreaChart
            width={500}
            height={300}
            data={historicalData}
            margin={{ top: 0, right: 0, left: 100, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="timestamp" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="volume_24h"
              stroke="#8884d8"
              fillOpacity={1}
              fill="url(#colorUv)"
            />
          </AreaChart>
          </div>
          </div>
        </div>
        <div className="columns is-vcentered is-centered">
        <div className="column">
          <h2>Volume</h2>
          <LineChart
            width={500}
            height={300}
            data={historicalData}
            margin={{ top: 0, right: 50, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="price" stroke="#8884d8" />
          </LineChart>
          </div>
        </div>
      </div>
    </>
  );
};

export default ItemPage;

/*
<ul>
        {historicalData.map(({ ...historicalData }: IhistoricalData) => (
          <li key={historicalData.timestamp as string}>
            {historicalData.price}
          </li>
        ))}
      </ul>
*/
