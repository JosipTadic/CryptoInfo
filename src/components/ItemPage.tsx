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
  ResponsiveContainer,
} from "recharts";
import { useHistoricalData } from "../hooks/useHistoricalData";
import CheckIconComponent from "./CheckIconComponent";
import AdditionalInfoString from "./AdditionalInfoString";
import { IcoinInfo, IntervalType } from "../types";

const ItemPage: React.FC = () => {
  var defaultStartDate = new Date();
  defaultStartDate.setDate(-20);
  const [startDate, setStartDate] = useState<string | undefined>(
    defaultStartDate.toISOString()
  );

  const [showTwoCharts, setShowTwoCharts] = useState<boolean>(false);
  const [showLocalHigh, setShowLocalHigh] = useState<boolean>(false);
  const [showLocalLow, setShowLocalLow] = useState<boolean>(false);

  const [interval, setPeriodInterval] = useState<IntervalType>("1d");
  const [fromInterval, setFromPeriodInterval] = useState<number>(0);

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
  }, [id]);

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
    setFromPeriodInterval(interval);
    var ourDate = new Date();
    var pastDate = ourDate.getDate() - interval;
    ourDate.setDate(pastDate);
    setStartDate(ourDate.toISOString());
  };

  return (
    <>
      <section>
        <div className="columns is-vcentered is-centered mt-5 is-flex">
          <div className="column ml-2">
            <Link to="/">
              <button className="button is-info is-rounded is-outlined">
                <p> &lt; Back</p>
              </button>
            </Link>
          </div>
          <div className="column has-text-centered">
            <h1 className="is-size-3">{coinInfo?.name}</h1>
          </div>
          <div className="column"></div>
        </div>
      </section>
      <div className="has-text-centered is-align-content-stretch m-2">
        <hr />
        {coinInfo?.description ? (
          <>
            <h2 className="is-size-5">{coinInfo.description} </h2>
            <hr />
          </>
        ) : (
          ""
        )}
      </div>
      {showTwoCharts ? (
        <div className="columns has-text-centered">
          <div className="column is-half is-custom-phone-height">
            <h3 className="mb-2 is-size-5">Volume:</h3>
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
          </div>
          <div className="column is-half is-custom-phone-height">
            <h3 className="mb-2 is-size-5">Price:</h3>
            <ResponsiveContainer width="95%" height="90%">
              <LineChart
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
            </ResponsiveContainer>
          </div>
        </div>
      ) : (
        <div className="columns is-centered has-text-centered">
          <div className="column is-custom-phone-height">
            <h3 className="mb-5 is-size-4">Volume and Price:</h3>
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
          </div>
        </div>
      )}
      <hr />
      <div className="has-text-centered columns">
        <div className="column">
          <h3 className="has-text-centered m-2 is-size-4">Chart options:</h3>
        </div>
      </div>
      <div className="has-text-centered columns">
        <div className="m-1 column"></div>
        <div className="m-1 column is-size-5">
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

        <div className="m-1 column is-size-5">
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
        <div className="m-1 column is-size-5">
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
            <h3 className="has-text-centered m-2 is-size-5">Intervals:</h3>
          </div>
          <div className="">
            {/*fromInterval === 1 || fromInterval === 7 ? (
              <button
                className={
                  interval === "1h"
                    ? "button is-info  m-1"
                    : "button is-info is-outlined  m-1"
                }
                onClick={() => setPeriodInterval("1h")}
              >
                1 Hour
              </button>
            ) : (
              <button
                className={
                  interval === "1h"
                    ? "button is-info  m-1"
                    : "button is-info is-outlined  m-1"
                }
                onClick={() => setPeriodInterval("1h")}
                disabled
              >
                1 Hour
              </button>
              )*/}
            {(fromInterval < 35 && fromInterval > 2) || fromInterval === 0 ? (
              <button
                className={
                  interval === "1d"
                    ? "button is-info  m-1"
                    : "button is-info is-outlined  m-1"
                }
                onClick={() => setPeriodInterval("1d")}
              >
                1 Day
              </button>
            ) : (
              <button
                className={
                  interval === "1d"
                    ? "button is-info  m-1"
                    : "button is-info is-outlined  m-1"
                }
                onClick={() => setPeriodInterval("1d")}
                disabled
              >
                1 Day
              </button>
            )}
            {fromInterval > 7 || fromInterval === 0 ? (
              <button
                className={
                  interval === "7d"
                    ? "button is-info  m-1"
                    : "button is-info is-outlined  m-1"
                }
                onClick={() => setPeriodInterval("7d")}
              >
                7 Days
              </button>
            ) : (
              <button
                className={
                  interval === "7d"
                    ? "button is-info  m-1"
                    : "button is-info is-outlined  m-1"
                }
                onClick={() => setPeriodInterval("7d")}
                disabled
              >
                7 Days
              </button>
            )}
            {fromInterval > 30 || fromInterval === 0 ? (
              <button
                className={
                  interval === "30d"
                    ? "button is-info  m-1"
                    : "button is-info is-outlined  m-1"
                }
                onClick={() => setPeriodInterval("30d")}
              >
                30 Days
              </button>
            ) : (
              <button
                className={
                  interval === "30d"
                    ? "button is-info  m-1"
                    : "button is-info is-outlined  m-1"
                }
                onClick={() => setPeriodInterval("30d")}
                disabled
              >
                30 Days
              </button>
            )}
            {fromInterval > 90 ? (
              <button
                className={
                  interval === "90d"
                    ? "button is-info  m-1"
                    : "button is-info is-outlined  m-1"
                }
                onClick={() => setPeriodInterval("90d")}
              >
                90 Days
              </button>
            ) : (
              <button
                className={
                  interval === "90d"
                    ? "button is-info  m-1"
                    : "button is-info is-outlined  m-1"
                }
                onClick={() => setPeriodInterval("90d")}
                disabled
              >
                90 Days
              </button>
            )}
          </div>
        </div>
        <div className="column is-half is centered">
          <div>
            <h3 className="has-text-centered m-2 is-size-5">Date from:</h3>
          </div>
          <div className="">
            {/*interval === "1h" ? (
              <button
                className={
                  fromInterval === 1
                    ? "button is-info  m-1"
                    : "button is-info is-outlined  m-1"
                }
                onClick={() => getInterval(1)}
              >
                Day
              </button>
            ) : (
              <button
                className={
                  fromInterval === 1
                    ? "button is-info  m-1"
                    : "button is-info is-outlined  m-1"
                }
                onClick={() => getInterval(1)}
                disabled
              >
                Day
              </button>
            )*/}
            {interval === "1h" || interval === "1d" ? (
              <button
                className={
                  fromInterval === 7
                    ? "button is-info  m-1"
                    : "button is-info is-outlined  m-1"
                }
                onClick={() => getInterval(7)}
              >
                Week
              </button>
            ) : (
              <button
                className={
                  fromInterval === 7
                    ? "button is-info  m-1"
                    : "button is-info is-outlined  m-1"
                }
                onClick={() => getInterval(7)}
                disabled
              >
                Week
              </button>
            )}
            {interval === "1d" || interval === "7d" ? (
              <button
                className={
                  fromInterval === 30
                    ? "button is-info  m-1"
                    : "button is-info is-outlined  m-1"
                }
                onClick={() => getInterval(30)}
              >
                Month
              </button>
            ) : (
              <button
                className={
                  fromInterval === 30
                    ? "button is-info  m-1"
                    : "button is-info is-outlined  m-1"
                }
                onClick={() => getInterval(30)}
                disabled
              >
                Month
              </button>
            )}
            {interval === "7d" || interval === "30d" || interval === "90d" ? (
              <button
                className={
                  fromInterval === 365
                    ? "button is-info  m-1"
                    : "button is-info is-outlined  m-1"
                }
                onClick={() => getInterval(365)}
              >
                Year
              </button>
            ) : (
              <button
                className={
                  fromInterval === 365
                    ? "button is-info  m-1"
                    : "button is-info is-outlined  m-1"
                }
                onClick={() => getInterval(365)}
                disabled
              >
                Year
              </button>
            )}
          </div>
        </div>
      </div>
      <div>
        <hr />
        <div className="mt-3">
          <h3 className="has-text-centered is-size-4">Additional info:</h3>
        </div>
        <div className="columns">
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
                      <stop offset="1%" stopColor="#8884d8" stopOpacity={0.95} />
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
              className="button is-info   m-1"
              onClick={fromStart}
            >
              From start
            </button>
*/
