import React, { useEffect, useState } from "react";
import "bulma/css/bulma.min.css";
import { Idata } from "../types";

const MainPage: React.FC = () => {
  const [data, setData] = useState<Idata[]>([]);
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers?limit=500")
      .then((res) => res.json())
      .then(setData);
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
  const [value, setValue] = useState("");

  return (
    <>
      <div className="control">
        <div className="field m-2">
          <p className="control has-icons-right"></p>
          <input
            className="input"
            type="search"
            placeholder="Search by name or symbol..."
            onChange={(e) => setValue(e.target.value.toLowerCase())}
          />
        </div>
        <section>
        <div className="m-2 table-container">
          <table className="table is-striped is-hoverable is-fullwidth">
            <thead>
              <tr>
                <td>
                  <h1>Name</h1>
                </td>
                <td className="has-text-centered">
                  <h1>Symbol</h1>
                </td>
                <td className="has-text-centered">
                  <h1>Price(USD)</h1>
                </td>
                <td className="has-text-centered is-hidden-mobile">
                  <h1>Volume(24h)</h1>
                </td>
                <td className="has-text-centered is-hidden-mobile">
                  <h1>Change(30d)</h1>
                </td>
                <td className="has-text-centered">
                  <h1>Change(1d)</h1>
                </td>
                <td className="has-text-centered is-hidden-mobile">
                  <h1>Change(1h)</h1>
                </td>
                <td className="has-text-centered is-hidden-mobile">
                  <h1>Change(15min)</h1>
                </td>
              </tr>
            </thead>
            <tbody>
              {data
              // eslint-disable-next-line
                .filter((data) => {
                  if (!value) return true;
                  if (
                    data.name.toLowerCase().includes(value) ||
                    data.symbol.toLowerCase().includes(value)
                  ) {
                    return true;
                  }
                })
                .map(({ ...data }: Idata) => (
                  <tr key={data.id}>
                    <td className="">
                      <a href={"historical/" + data.id}>
                        <h2>
                          <b>{data.name}</b>
                        </h2>
                      </a>
                    </td>{" "}
                    <td className="has-text-centered">
                      <span className="tag is-info is-warning">
                        <h3>{data.symbol}</h3>
                      </span>
                    </td>{" "}
                    <td className="has-text-centered">
                      <h3>
                        {data.quotes.USD.price
                          .toFixed(2)
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        ${" "}
                      </h3>
                    </td>{" "}
                    <td className="has-text-centered is-hidden-mobile">
                      <h3>
                        {data.quotes.USD.volume_24h
                          .toFixed(2)
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        ${" "}
                      </h3>
                    </td>
                    {checkIfNegative(data.quotes.USD.percent_change_30d) ? (
                      <td className="has-text-danger has-text-centered is-hidden-mobile">
                        <h3>{data.quotes.USD.percent_change_30d}%</h3>
                      </td>
                    ) : (
                      <td className="has-text-success has-text-centered is-hidden-mobile">
                        <h3>{data.quotes.USD.percent_change_30d}%</h3>
                      </td>
                    )}
                    {checkIfNegative(data.quotes.USD.percent_change_24h) ? (
                      <td className="has-text-danger has-text-centered">
                        <h3>{data.quotes.USD.percent_change_24h}%</h3>
                      </td>
                    ) : (
                      <td className="has-text-success has-text-centered">
                        <h3>{data.quotes.USD.percent_change_24h}%</h3>
                      </td>
                    )}
                    {checkIfNegative(data.quotes.USD.percent_change_1h) ? (
                      <td className="has-text-danger has-text-centered is-hidden-mobile">
                        <h3>{data.quotes.USD.percent_change_1h}%</h3>
                      </td>
                    ) : (
                      <td className="has-text-success has-text-centered is-hidden-mobile">
                        <h3>{data.quotes.USD.percent_change_1h}%</h3>
                      </td>
                    )}
                    {checkIfNegative(data.quotes.USD.percent_change_15m) ? (
                      <td className="has-text-danger has-text-centered is-hidden-mobile">
                        <h3>{data.quotes.USD.percent_change_15m}%</h3>
                      </td>
                    ) : (
                      <td className="has-text-success has-text-centered is-hidden-mobile">
                        <h3>{data.quotes.USD.percent_change_15m}%</h3>
                      </td>
                    )}
                  </tr>
                ))
                .slice(skipPage[0], skipPage[1])}
            </tbody>

            <tfoot>
              <tr>
                <td colSpan={8}>
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
                <td colSpan={8}>
                  <div className="columns is-justify-content-center m-2">
                    Currently displaying {skipPage[0]} - {skipPage[1]}{" "}
                    cryptocurrencies sorted by volume
                  </div>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
        </section>
      </div>
    </>
  );
};

export default MainPage;
