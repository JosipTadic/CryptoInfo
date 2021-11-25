import React, { useEffect, useState } from "react";
import "bulma/css/bulma.min.css";

export interface Idata {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: Date;
  last_updated: Date;
  quotes: Iqoutes;
}
export interface Iqoutes {
  USD: IUSD;
}
export interface IUSD {
  price: number;
  volume_24h: number;
  volume_24h_change_24h: number;
  market_cap: number;
  market_cap_change_24h: number;
  percent_change_15m: number;
  percent_change_30m: number;
  percent_change_1h: number;
  percent_change_6h: number;
  percent_change_12h: number;
  percent_change_24h: number;
  percent_change_7d: number;
  percent_change_30d: number;
  percent_change_1y: number;
  ath_price: number;
  ath_date: Date;
  percent_from_price_ath: number;
}

const MainPage: React.FC = () => {
  const [data, setData] = useState<Idata[]>([]);
  useEffect(() => {
    //const interval = setInterval(() => {
    fetch("https://api.coinpaprika.com/v1/tickers?limit=500")
      .then((res) => res.json())
      .then(setData);
    /*}, 30000);
    return () => clearInterval(interval);*/
  }, []);
  const [skipPage, setSkipPage] = useState([0, 20]);

  const first20 = () => {
    setSkipPage([0, 20]);
  };
  const last20 = () => {
    setSkipPage([480, 500]);
  };
  const next20 = () => {
    setSkipPage(skipPage.map((x) => x + 20));
  };
  const previous20 = () => {
    setSkipPage(skipPage.map((x) => x - 20));
  };
  const checkIfLastPage = () => {
    if (skipPage[0] >= 480) {
      return true;
    } else {
      return false;
    }
  };
  const checkIfFirstPage = () => {
    if (skipPage[0] <= 0) {
      return true;
    } else {
      return false;
    }
  };
  const checkIfNegative = (x: number) => {
    if (x < 0) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <div>
      <table className="table is-striped is-hoverable is-fullwidth">
        <thead>
          <tr>
            <td>Name</td>
            <td>Symbol</td>
            <td>Price(USD)</td>
            <td>Volume(24h)</td>
            <td>Change(1h)</td>
            <td>Change(15min)</td>
          </tr>
        </thead>
        <tbody>
          {data
            .map(({ ...data }: Idata) => (
              <tr key={data.id}>
                <td>
                  <a href={"historical/" + data.id}>{data.name}</a>
                </td>{" "}
                <td>
                  <span className="tag is-info is-warning">{data.symbol}</span>
                </td>{" "}
                <td>
                  {data.quotes.USD.price
                    .toFixed(2)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  $
                </td>{" "}
                <td>
                  {data.quotes.USD.volume_24h
                    .toFixed(2)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  $
                </td>
                {checkIfNegative(data.quotes.USD.percent_change_1h) ? (
                  <td className="has-text-danger">
                    {data.quotes.USD.percent_change_1h}%
                  </td>
                ) : (
                  <td className="has-text-success">
                    {data.quotes.USD.percent_change_1h}%
                  </td>
                )}
                {checkIfNegative(data.quotes.USD.percent_change_15m) ? (
                  <td className="has-text-danger">
                    {data.quotes.USD.percent_change_15m}%
                  </td>
                ) : (
                  <td className="has-text-success">
                    {data.quotes.USD.percent_change_15m}%
                  </td>
                )}
              </tr>
            ))
            .slice(skipPage[0], skipPage[1])}
        </tbody>

        <tfoot>
          <tr>
            <td colSpan={6}>
              <div className="columns">
                <div className="column is-one-quarter">
                  {checkIfFirstPage() ? (
                    <button
                      className="button is-link is-outlined is-fullwidth"
                      onClick={first20}
                      disabled
                    >
                      First
                    </button>
                  ) : (
                    <button
                      className="button is-link is-outlined is-fullwidth"
                      onClick={first20}
                    >
                      First
                    </button>
                  )}
                </div>
                <div className="column is-one-quarter">
                  {checkIfFirstPage() ? (
                    <button
                      className="button is-link is-outlined is-fullwidth"
                      onClick={previous20}
                      disabled
                    >
                      Previous
                    </button>
                  ) : (
                    <button
                      className="button is-link is-outlined is-fullwidth"
                      onClick={previous20}
                    >
                      Previous
                    </button>
                  )}
                </div>
                <div className="column is-one-quarter">
                  {checkIfLastPage() ? (
                    <button
                      className="button is-link is-outlined is-fullwidth"
                      onClick={next20}
                      disabled
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      className="button is-link is-outlined is-fullwidth"
                      onClick={next20}
                    >
                      Next
                    </button>
                  )}
                </div>
                <div className="column is-one-quarter">
                  {checkIfLastPage() ? (
                    <button
                      className="button is-link is-outlined is-fullwidth"
                      onClick={last20}
                      disabled
                    >
                      Last
                    </button>
                  ) : (
                    <button
                      className="button is-link is-outlined is-fullwidth"
                      onClick={last20}
                    >
                      Last
                    </button>
                  )}
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td colSpan={6}>
              <div className="columns">
                Currently displaying {skipPage[0]} - {skipPage[1]}{" "}
                cryptocurrencies sorted by volume
              </div>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default MainPage;
