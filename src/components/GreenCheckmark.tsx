import { FC } from "react";
import greenCheckmark from "../icons/green-checkmark.png";
import { IlabelProps } from "../types";

const GreenCheckmark: FC<IlabelProps> = (labelProp) => {
  return (
    <div>
      <div className="m-1 columns">
        <div className="ml-2 column">
          <p>{labelProp.labelProp}</p>
        </div>
        <div className="column">
          <figure className="image is-32x32">
            <img alt="green checkmark" src={greenCheckmark} />
          </figure>
        </div>
      </div>
    </div>
  );
};

export default GreenCheckmark;
