import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "bulma/css/bulma.min.css";
import { useHistoricalData } from "../hooks/useHistoricalData";
import { IcoinInfo, IntervalType } from "../types";
import ItemPageHeader from "./ItemPageHeader";
import AreaChartVolume from "./AreaChartVolume";
import LineChartPrice from "./LineChartPrice";
import ComboChart from "./ComboChart";
import IntervalButtonGroup from "./IntervalButtonGroup";
import CheckIconComponent from "./CheckIconComponent";
import AdditionalInfoString from "./AdditionalInfoString";
import CheckboxGroup from "./CheckboxGroup";
import DateFromButtonGroup from "./DateFromButtonGroup";

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
    let headers = {};
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
    let ourDate = new Date();
    let pastDate = ourDate.getDate() - interval;
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
      <CheckboxGroup
        showTwoCharts={showTwoCharts}
        handleIsTwoCharts={handleIsTwoCharts}
        showLocalHigh={showLocalHigh}
        handleShowLocalHigh={handleShowLocalHigh}
        showLocalLow={showLocalLow}
        handleShowLocalLow={handleShowLocalLow}
      />
      <div className="columns is-vcentered is-centered has-text-centered">
        <div className="column is-half is-vcentered is-centered">
          <div className="">
            <h3 className="has-text-centered m-2 is-size-5">Intervals:</h3>
          </div>
          <IntervalButtonGroup
            interval={interval}
            fromInterval={fromInterval}
            setPeriodInterval={setPeriodInterval}
          />
        </div>
        <div className="column is-half is centered">
          <div>
            <h3 className="has-text-centered m-2 is-size-5">Date from:</h3>
          </div>
          <div className="">
            <DateFromButtonGroup
              interval={interval}
              fromInterval={fromInterval as unknown as string}
              getInterval={getInterval}
            />
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
