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

export interface IcoinInfo {
  id: string;
  name: string;
  symbol: string;
}

const ItemPage: React.FC = () => {
  /*var firstInMonth = new Date();
  firstInMonth.setDate(0);
  const [startDate, setStartDate] = useState<Date>(firstInMonth)*/
  const [interval, setInterval] = useState<String>("1d");
  let { id } = useParams();
  const [historicalData, setData] = useState<IhistoricalData[]>([]);
  useEffect(() => {
    const url =
      "https://api.coinpaprika.com/v1/tickers/" +
      id +
      "/historical?start=" +
      /*startDate*/ "2020-11-24T05:15:00Z" +
      "&interval=" +
      interval;
    var headers = {};

    fetch(url, {
      method: "GET",
      mode: "cors",
      headers: headers,
    })
      .then((res) => res.json())
      .then(setData);
  }, [interval]);

  const [coinInfo, setCoinInfo] = useState<IcoinInfo>();
  useEffect(() => {
    const url = "https://api.coinpaprika.com/v1/coins/" + id;
    var headers = {};

    fetch(url, {
      method: "GET",
      mode: "cors",
      headers: headers,
    })
      .then((res) => res.json())
      .then(setCoinInfo);
  }, []);

  const interval1d = () => {
    setInterval("1d");
  };
  const interval7d = () => {
    setInterval("7d");
    console.log({ interval });
  };
  const interval30d = () => {
    setInterval("30d");
  };
  const interval90d = () => {
    setInterval("90d");
  };
  const interval365d = () => {
    setInterval("365d");
  };

  return (
    <>
      <div className="columns is-vcentered is-centered m-2">
        <h1>{coinInfo?.name}</h1>
      </div>
      <div className="is-max-widescreen is-flex">
        <div className="columns is-centered m-4">
          <div className="column">
            <h2>Price:</h2>
            <div className="column">
              <AreaChart
                width={550}
                height={300}
                data={historicalData}
                margin={{ top: 0, right: 0, left: 80, bottom: 0 }}
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
            <div>
              <h3>Intervals:</h3>
              <button onClick={interval1d}>1 Day</button>
              <button onClick={interval7d}>7 Days</button>
              <button onClick={interval30d}>30 Days</button>
              <button onClick={interval90d}>90 Days</button>
              <button onClick={interval365d}>365 Day</button>
            </div>
          </div>
        </div>
        <div className="columns is-centered m-4">
          <div className="column is-centered">
            <h2>Volume:</h2>
            <div className="column is-centered">
              <LineChart
                width={550}
                height={300}
                data={historicalData}
                margin={{ top: 0, right: 0, left: 80, bottom: 0 }}
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
      </div>
    </>
  );
};

export default ItemPage;

/*
<div className="columns is-centered m-0">
      <h1>{id?.split("-")[1].toUpperCase()}</h1>
</div>

<ul>
        {historicalData.map(({ ...historicalData }: IhistoricalData) => (
          <li key={historicalData.timestamp as string}>
            {historicalData.price}
          </li>
        ))}
      </ul>
*/
