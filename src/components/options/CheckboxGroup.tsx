import React from "react";
import "bulma/css/bulma.min.css";
import { IcheckBoxGroupProps } from "../../types";
import Checkbox from "./Checkbox";

const CheckboxGroup: React.FC<IcheckBoxGroupProps> = ({
  showTwoCharts,
  handleIsTwoCharts,
  showLocalHigh,
  handleShowLocalHigh,
  showLocalLow,
  handleShowLocalLow,
}) => {
  return (
    <div className="has-text-centered columns">
      <div className="m-1 column is-size-5">
        <Checkbox
          name={"showTwoCharts"}
          isChecked={showTwoCharts}
          handleChange={handleIsTwoCharts}
          labelText={" Separate price and volume"}
          className={"switch is-rounded is-outlined is-info"}
        />
      </div>
      <div className="m-1 column is-size-5">
        <Checkbox
          name={"showLocalHigh"}
          isChecked={showLocalHigh}
          handleChange={handleShowLocalHigh}
          labelText={" Show highest value"}
          className={"switch is-rounded is-outlined is-info"}
        />
      </div>
      <div className="m-1 column is-size-5">
        <Checkbox
          name={"showLocalLow"}
          isChecked={showLocalLow}
          handleChange={handleShowLocalLow}
          labelText={" Show lowest value"}
          className={"switch is-rounded is-outlined is-info"}
        />
      </div>
    </div>
  );
};

export default CheckboxGroup;
