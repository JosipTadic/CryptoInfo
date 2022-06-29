import React from "react";
import { Link } from "react-router-dom";
import "bulma/css/bulma.min.css";
import { IitemPageHeader } from "../types";

const ItemPageHeader: React.FC<IitemPageHeader> = ({ itemPageTitle }) => {

  return (
    <section>
      <div className="columns is-vcentered is-centered is-flex">
        <div className="column ml-2  mt-5">
          <Link to="/">
            <button className="button is-info is-rounded is-outlined">
              <p> &lt; Back</p>
            </button>
          </Link>
        </div>
        <div className="column has-text-centered mt-5">
          <h1 className="is-size-3">{itemPageTitle && itemPageTitle}</h1>
        </div>
        <div className="column  mt-5"></div>
      </div>
    </section>
  );
};

export default React.memo(ItemPageHeader);
