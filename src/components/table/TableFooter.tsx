import React from "react";
import "bulma/css/bulma.min.css";
import { ItableFooterProps } from "../../types";

const TableFooter: React.FC<ItableFooterProps> = ({skipPage, setSkipPage}) => {

  const first20 = () => {
    setSkipPage!([0, 20]);
  };
  const last20 = () => {
    setSkipPage!([480, 500]);
  };
  const next20 = () => {
    setSkipPage!(skipPage.map((x) => x + 20));
  };
  const previous20 = () => {
    setSkipPage!(skipPage.map((x) => x - 20));
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

  return (
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
          <div className="columns has-text-centered is-justify-content-center m-2">
            Displaying {skipPage[0]} - {skipPage[1]} cryptocurrencies sorted by
            volume
          </div>
        </td>
      </tr>
    </tfoot>
  );
};

export default TableFooter;
