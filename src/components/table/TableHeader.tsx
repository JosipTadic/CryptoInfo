import React from "react";
import "bulma/css/bulma.min.css";

const TableHeader: React.FC = () => {
  return (
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
          <h1>Volume(24h)(USD)</h1>
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
        <td className="has-text-centered is-hidden-mobile is-hidden-landscape">
          <h1>Change(15min)</h1>
        </td>
      </tr>
    </thead>
  );
};

export default TableHeader;
