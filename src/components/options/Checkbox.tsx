import React from "react";
import "bulma/css/bulma.min.css";
import { IcheckBoxProps } from "../../types";

const Checkbox: React.FC<IcheckBoxProps> = ({
  name,
  isChecked,
  handleChange,
  className,
  labelText,
}) => {
  return (
    <>
      <input
        type="checkbox"
        id={name}
        name={name}
        value={name}
        checked={isChecked}
        className={className}
        onChange={handleChange}
      />
      <label className="is-size-5" htmlFor={name}>
        {labelText}
      </label>
    </>
  );
};

export default Checkbox;
