import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "bulma/css/bulma.min.css";
import { useHistoricalData } from "../hooks/useHistoricalData";
import CheckIconComponent from "./CheckIconComponent";
import AdditionalInfoString from "./AdditionalInfoString";
import { IcoinInfo, IntervalType } from "../types";
import ItemPageHeader from "./ItemPageHeader";
import AreaChartVolume from "./AreaChartVolume";
import LineChartPrice from "./LineChartPrice";
import ComboChart from "./ComboChart";

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
      <ItemPageHeader itemPageTitle={coinInfo?.name} />
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
            {historicalData && (
              <AreaChartVolume
                historicalData={historicalData}
                showLocalHigh={showLocalHigh}
                showLocalLow={showLocalLow}
                volumeLocalHigh={volumeLocalHigh}
                volumeLocalLow={volumeLocalLow}
              />
            )}
          </div>
          <div className="column is-half is-custom-phone-height">
            <h3 className="mb-2 is-size-5">Price:</h3>
            {historicalData && (
              <LineChartPrice
                historicalData={historicalData}
                showLocalHigh={showLocalHigh}
                showLocalLow={showLocalLow}
                priceLocalHigh={priceLocalHigh}
                priceLocalLow={priceLocalLow}
              />
            )}
          </div>
        </div>
      ) : (
        <div className="columns is-centered has-text-centered">
          <div className="column is-custom-phone-height">
            <h3 className="mb-5 is-size-4">Volume and Price:</h3>
            {historicalData && (
              <ComboChart
                historicalData={historicalData}
                showLocalHigh={showLocalHigh}
                showLocalLow={showLocalLow}
                volumeLocalHigh={volumeLocalHigh}
                volumeLocalLow={volumeLocalLow}
                priceLocalHigh={priceLocalHigh}
                priceLocalLow={priceLocalLow}
              />
            )}
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
