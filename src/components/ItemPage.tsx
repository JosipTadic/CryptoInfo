import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
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
  ComposedChart,
  ReferenceLine,
} from "recharts";
import { useHistoricalData } from "../hooks/useHistoricalData";
import CheckIconComponent from "./CheckIconComponent";
import AdditionalInfoString from "./AdditionalInfoString";

type IntervalType = "1d" | "7d" | "30d" | "90d" | "365d";

export interface IhistoricalData {
  timestamp: Date | string;
  price: number;
  volume_24h: number;
  market_cap: number;
}
export interface IhistoricalData extends Array<IhistoricalData> {}

export interface IcoinInfoDataBoolean {
  is_new: boolean | undefined;
  is_active: boolean | undefined;
  open_source: boolean | undefined;
  hardware_wallet: boolean | undefined;
}
export interface IcoinInfoDataString {
  type?: string;
  contract?: string;
  platform?: string;
  development_status?: string;
  proof_type?: string;
  org_structure?: string;
}
export interface IcoinInfo extends IcoinInfoDataBoolean, IcoinInfoDataString {
  id: string;
  name: string;
  symbol: string;
  description: string;
  first_data_at: string;
}

const ItemPage: React.FC = () => {
  var defaultStartDate = new Date();
  defaultStartDate.setDate(-15);
  const [startDate, setStartDate] = useState<string | undefined>(
    defaultStartDate.toISOString()
  );

  const [showTwoCharts, setShowTwoCharts] = useState<boolean>(false);
  const [showLocalHigh, setShowLocalHigh] = useState<boolean>(false);
  const [showLocalLow, setShowLocalLow] = useState<boolean>(false);

  const [interval, setInterval] = useState<IntervalType>("1d");

  let { id } = useParams();

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

  const {
    historicalData,
    priceLocalHigh,
    volumeLocalHigh,
    priceLocalLow,
    volumeLocalLow,
  } = useHistoricalData(id, startDate!, interval);
  const handleIsTwoCharts = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShowTwoCharts(e.target.checked);
  };
  const handleShowLocalHigh = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShowLocalHigh(e.target.checked);
  };
  const handleShowLocalLow = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShowLocalLow(e.target.checked);
  };

  const getInterval = (interval: number) => {
    var ourDate = new Date();
    var pastDate = ourDate.getDate() - interval;
    ourDate.setDate(pastDate);
    setStartDate(ourDate.toISOString());
  };
  /*const coinInfoBoolean: IcoinInfoDataBoolean = {
    is_new: coinInfo?.is_new,
    hardware_wallet: coinInfo?.hardware_wallet,
    is_active: coinInfo?.is_active,
    open_source: coinInfo?.open_source,
  };*/
  /*const fromStart = () => {
    const dateStart = coinInfo?.first_data_at;
    setStartDate(dateStart);
  };*/
  return (
    <>
      <div className="columns is-vcentered is-centered mt-5">
        <div className="column ml-2">
          <Link to="/">
            <button className="button is-primary is-rounded is-outlined">
              Back
            </button>
          </Link>
        </div>
        <div className="column has-text-centered">
          <h1>{coinInfo?.name}</h1>
        </div>
        <div className="column"></div>
      </div>
      <div className="has-text-centered is-align-content-stretch m-2">
        <hr />
        {coinInfo?.description ? (
          <>
            <h2>{coinInfo.description} </h2>
            <hr />
          </>
        ) : (
          ""
        )}
      </div>
      {showTwoCharts ? (
        <div className="columns has-text-centered">
          <div className="column is-half">
            <h2 className="mb-2">Volume:</h2>
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
          </div>
          <div className="column is-half">
            <h2 className="mb-2">Price:</h2>
            <LineChart
              width={550}
              height={300}
              data={historicalData}
              margin={{ top: 0, right: 0, left: 80, bottom: 0 }}
            >
              <CartesianGrid stroke="lightgray" strokeDasharray={5} />
              <XAxis dataKey="timestamp" />
              <YAxis />
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
              <Line type="monotone" dataKey="price" stroke="#8884d8" />
            </LineChart>
          </div>
        </div>
      ) : (
        <div className="mb-2">
          <h2 className="has-text-centered mb-2">Volume and Price:</h2>
          <ComposedChart
            width={1300}
            height={300}
            data={historicalData}
            margin={{
              top: 0,
              right: 0,
              bottom: 0,
              left: 80,
            }}
          >
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
              dataKey="volume_24h"
              stroke="#8884d8"
              activeDot={{ r: 2 }}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="price"
              stroke="#82ca9d"
            />
          </ComposedChart>
        </div>
      )}
      <div className="has-text-centered columns">
        <div className="column">
          <h3>Chart options:</h3>
        </div>
      </div>
      <div className="has-text-centered columns">
        <div className="m-1 column"></div>
        <div className="m-1 column">
          <input
            type="checkbox"
            id="showTwoCharts"
            name="showTwoCharts"
            value="showTwoCharts"
            checked={showTwoCharts}
            onChange={handleIsTwoCharts}
          />
          <label htmlFor="showTwoCharts"> Separate price and volume</label>
        </div>

        <div className="m-1 column">
          <input
            type="checkbox"
            id="showLocalHigh"
            name="showLocalHigh"
            value="showLocalHigh"
            checked={showLocalHigh}
            onChange={handleShowLocalHigh}
          />
          <label htmlFor="showLocalHigh"> Show highest value</label>
        </div>
        <div className="m-1 column">
          <input
            type="checkbox"
            id="showLocalLow"
            name="showLocalLow"
            value="showLocalLow"
            checked={showLocalLow}
            onChange={handleShowLocalLow}
          />
          <label htmlFor="showLocalLow"> Show lowest value</label>
        </div>
        <div className="m-1 column"></div>
      </div>
      <div className="columns is-vcentered is-centered has-text-centered">
        <div className="column is-half is-vcentered is-centered">
          <div className="">
            <h3 className="m-2">Intervals:</h3>
          </div>
          <div className="">
            <button
              className="button is-primary is-small is-outlined m-1"
              onClick={() => setInterval("1d")}
            >
              1 Day
            </button>
            <button
              className="button is-primary is-small is-outlined m-1"
              onClick={() => setInterval("7d")}
            >
              7 Days
            </button>
            <button
              className="button is-primary is-small is-outlined m-1"
              onClick={() => setInterval("30d")}
            >
              30 Days
            </button>
            <button
              className="button is-primary is-small is-outlined m-1"
              onClick={() => setInterval("90d")}
            >
              90 Days
            </button>
            <button
              className="button is-primary is-small is-outlined m-1"
              onClick={() => setInterval("365d")}
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
            <button
              className="button is-primary is-active
             is-small is-outlined m-1"
              onClick={() => getInterval(1)}
            >
              Day
            </button>
            <button
              className="button is-primary is-small is-outlined m-1"
              onClick={() => getInterval(7)}
            >
              Week
            </button>
            <button
              className="button is-primary is-small is-outlined m-1"
              onClick={() => getInterval(30)}
            >
              Month
            </button>
            <button
              className="button is-primary is-small is-outlined m-1"
              onClick={() => getInterval(365)}
            >
              Year
            </button>
          </div>
        </div>
      </div>
      <div>
        <div>
          <h4 className="has-text-centered">Additional info:</h4>
        </div>
        <div className="columns">
          {
            <div className="column">
              <CheckIconComponent
                is_new={coinInfo?.is_new}
                hardware_wallet={coinInfo?.hardware_wallet}
                is_active={coinInfo?.is_active}
                open_source={coinInfo?.open_source}
              />
            </div>
          }
          {
            <div className="column has-text-centered">
             <AdditionalInfoString
                contract={coinInfo?.contract}
                development_status={coinInfo?.development_status}
                org_structure={coinInfo?.org_structure}
                platform={coinInfo?.platform}
                proof_type={coinInfo?.proof_type}
                type={coinInfo?.type}
             />
            </div>
          }
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
/*
<div className="columns has-text-centered">
          <div className="column is-half">
            <div>
              <h2>Volume:</h2>
            </div>
            <div className="">
              <div>
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
                  <CartesianGrid stroke="lightgray" strokeDasharray={5}/>
                  <Tooltip />
                  <Area
                    type="monotone"
                    activeDot={{ r: 3 }}
                    dataKey="volume_24h"
                    stroke="#8884d8"
                    fillOpacity={1}
                    fill="url(#colorUv)"
                  />
                  {showLocalHigh ? <ReferenceLine y={0} label="Max volume" stroke="red" ifOverflow="extendDomain"/> : ""}
                </AreaChart>
              </div>
            </div>
            <div className="column is-half">
              <div>
                <h2>Price:</h2>
              </div>
              <div className="">
                <LineChart
                  width={550}
                  height={300}
                  data={historicalData}
                  margin={{ top: 0, right: 0, left: 80, bottom: 0 }}
                >
                  <CartesianGrid stroke="lightgray" strokeDasharray={5}/>
                  <XAxis dataKey="timestamp" />
                  <YAxis />
                  <Tooltip />
                  {showLocalHigh ? <ReferenceLine y={0} label="Max price" stroke="red" ifOverflow="extendDomain"/> : ""}
                  <Line type="monotone" dataKey="price" stroke="#8884d8" />
                </LineChart>
              </div>
            </div>
          </div>
        </div>

        <button
              className="button is-primary is-small is-outlined m-1"
              onClick={fromStart}
            >
              From start
            </button>
*/
