import React, { useEffect, useState } from "react";
import "bulma/css/bulma.min.css";
import { Idata, ItableBodyProps } from "../../types";

const TableBody: React.FC<ItableBodyProps> = ({skipPage, value}) => {
  const [data, setData] = useState<Idata[]>([]);
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers?limit=500")
      .then((res) => res.json())
      .then(setData);
  }, []);

  const checkIfNegative = (x: number) => {
    return x < 0;
  };

  return (
            <tbody>
              {data
                .filter((data) => {
                  if (
                    data.name.toLowerCase().includes(value) ||
                    data.symbol.toLowerCase().includes(value)
                  ) {
                    return true;
                  }
                  return false;
                })
                .map((data) => (
                  <tr key={data.id}>
                    <td>
                      <a href={"historical/" + data.id}>
                        <h2>
                          <b>{data.name}</b>
                        </h2>
                      </a>
                    </td>
                    <td className="has-text-centered">
                      <span className="tag is-info is-warning">
                        <h3>{data.symbol}</h3>
                      </span>
                    </td>
                    <td className="has-text-centered">
                      <h3>
                        {data.quotes.USD.price
                          .toFixed(2)
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      </h3>
                    </td>
                    <td className="has-text-centered is-hidden-mobile">
                      <h3>
                        {data.quotes.USD.volume_24h
                          .toFixed(2)
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
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
  );
};

export default TableBody;
