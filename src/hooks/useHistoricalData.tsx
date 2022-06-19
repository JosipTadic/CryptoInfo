import { useState, useEffect, useCallback, useMemo } from "react";
import { IhistoricalData } from "../types";

export const useHistoricalData = (
  id: string | undefined,
  startDate: string,
  interval: string
) => {
  const [historicalData, setData] = useState<IhistoricalData>();
  useEffect(() => {
    const url =
      "https://api.coinpaprika.com/v1/tickers/" +
      id +
      "/historical?start=" +
      startDate +
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
  }, [id, interval, startDate]);

  const prices = useMemo(() => historicalData?.map(function (historicalDataObject) {
    return historicalDataObject.price;
  }), [historicalData]);

  
  const priceLocalHigh = prices ? Math.max(...prices) : 0;
  const priceLocalLow = prices ? Math.min(...prices) : 0;

  const volumes = historicalData?.map(function (historicalDataObject) {
    return historicalDataObject.volume_24h;
  });
  const volumeLocalHigh = volumes ? Math.max(...volumes) : 0;
  const volumeLocalLow = volumes ? Math.min(...volumes) : 0;

  return {
    historicalData,
    priceLocalHigh,
    volumeLocalHigh,
    priceLocalLow,
    volumeLocalLow,
  };
};
