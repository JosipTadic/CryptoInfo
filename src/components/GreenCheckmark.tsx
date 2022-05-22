import { FC } from "react";
import greenCheckmark from "../icons/green-checkmark.png";
import { IlabelProps } from "../types";

const GreenCheckmark: FC<IlabelProps> = (labelProp) => {
  return (
    <div>
      <div className="m-1 columns is-flex-mobile">
        <div className="ml-6 column is-size-5">
          <p>{labelProp.labelProp}</p>
        </div>
        <div className="column has-text-centered-mobile">
          <figure className="image is-32x32 ml-6 is-inline-block-mobile">
            <img alt="green checkmark" src={greenCheckmark} />
          </figure>
        </div>
      </div>
    </div>
  );
};

export default GreenCheckmark;
