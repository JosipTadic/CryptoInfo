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
  description: string;
  first_data_at: string;
}

const ItemPage: React.FC = () => {
  var firstInMonth = new Date();
  firstInMonth.setDate(0);
  const [startDate, setStartDate] = useState<String | undefined>(
    firstInMonth.toISOString()
  );
  const [interval, setInterval] = useState<String>("1d");
  let { id } = useParams();
  const [historicalData, setData] = useState<IhistoricalData[]>([]);
  useEffect(() => {
    const url =
      "https://api.coinpaprika.com/v1/tickers/" +
      id +
      "/historical?start=" +
      startDate /*"2020-11-24T05:15:00Z"*/ +
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
  }, [interval, startDate]);

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
  const lastDay = () => {
    var ourDate = new Date();
    var pastDate = ourDate.getDate() - 1;
    ourDate.setDate(pastDate);
    setStartDate(ourDate.toISOString());
  };
  const lastWeek = () => {
    var ourDate = new Date();
    var pastDate = ourDate.getDate() - 7;
    ourDate.setDate(pastDate);
    setStartDate(ourDate.toISOString());
  };
  const lastMonth = () => {
    var ourDate = new Date();
    var pastDate = ourDate.getDate() - 30;
    ourDate.setDate(pastDate);
    setStartDate(ourDate.toISOString());
  };
  const lastYear = () => {
    var ourDate = new Date();
    var pastDate = ourDate.getDate() - 365;
    ourDate.setDate(pastDate);
    setStartDate(ourDate.toISOString());
  };
  const fromStart = () => {
    const dateStart = coinInfo?.first_data_at;
    setStartDate(dateStart);
  };
  return (
    <>
      <div className="columns is-vcentered is-centered mt-5">
        <h1>{coinInfo?.name}</h1>
      </div>
      <div className="has-text-centered is-align-content-stretch m-2">
      <hr />
        <h2>{coinInfo?.description}</h2>
        <hr />
      </div>
      <div className="is-max-widescreen is-flex">
        <div className="columns is-centered m-1">
          <div className="column has-text-centered">
            <h2>Volume:</h2>
            
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
                <XAxis dataKey="timestamp" interval={5} angle={0} dx={20} />
                <YAxis />
                <CartesianGrid strokeDasharray="0 0" />
                <Tooltip />
                <Area
                  type="monotone"
                  activeDot={{ r: 3 }}
                  dataKey="volume_24h"
                  stroke="#8884d8"
                  fillOpacity={1}
                  fill="url(#colorUv)"
                />
              </AreaChart>
            </div>
          </div>
        </div>
        <div className="columns is-centered m-1">
          <div className="column has-text-centered">
            <h2>Price:</h2>
            <div className="column">
              <LineChart
                width={550}
                height={300}
                data={historicalData}
                margin={{ top: 0, right: 0, left: 80, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="0 0" />
                <XAxis dataKey="timestamp" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="price" stroke="#8884d8" />
              </LineChart>
            </div>
          </div>
        </div>
      </div>
      <div className="columns is-vcentered is-centered has-text-centered">
        <div className="column is-half is-vcentered is-centered">
          <div className="">
            <h3 className="m-2">Intervals:</h3>
          </div>
          <div className="">
            <button
              className="button is-primary is-small is-outlined m-1" 
              onClick={interval1d}
            >
              1 Day
            </button>
            <button
              className="button is-primary is-small is-outlined m-1"
              onClick={interval7d}
            >
              7 Days
            </button>
            <button
              className="button is-primary is-small is-outlined m-1"
              onClick={interval30d}
            >
              30 Days
            </button>
            <button
              className="button is-primary is-small is-outlined m-1"
              onClick={interval90d}
            >
              90 Days
            </button>
            <button
              className="button is-primary is-small is-outlined m-1"
              onClick={interval365d}
            >
              365 Days
            </button>
          </div>
        </div>
        <div className="column is-half is centered">
          <div>
            <h3 className="m-2">Date from:</h3>
          </div>
          <div className="">
            <button className="button is-primary is-active
             is-small is-outlined m-1" onClick={lastDay}>
              Day
            </button>
            <button className="button is-primary is-small is-outlined m-1" onClick={lastWeek}>
              Week
            </button>
            <button className="button is-primary is-small is-outlined m-1" onClick={lastMonth}>
              Month
            </button>
            <button className="button is-primary is-small is-outlined m-1" onClick={lastYear}>
              Year
            </button>
            <button className="button is-primary is-small is-outlined m-1" onClick={fromStart}>
              From start
            </button>
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
