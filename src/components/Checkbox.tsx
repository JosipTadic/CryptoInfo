import React from "react";
import "bulma/css/bulma.min.css";
import { IcheckBoxProps } from "../types";

const Checkbox: React.FC<IcheckBoxProps> = ({
  name,
  isChecked,
  handleChange,
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
        onChange={handleChange}
      />
      <label htmlFor={name}>{labelText}</label>
    </>
  );
};

export default Checkbox;
