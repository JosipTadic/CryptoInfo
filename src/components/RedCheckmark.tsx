import { FC } from "react";
import redCheckmark from "../icons/close-red.png";
import { IlabelProps } from "../types";

const RedCheckmark: FC<IlabelProps> = (labelProp) => {
  return (
    <div>
      <div className="columns m-1 is-flex-mobile">
        <div className="column ml-6 is-size-5">
          <p>{labelProp.labelProp}</p>
        </div>
        <div className="column  has-text-centered-mobile">
          <figure className="image is-32x32 ml-6 is-inline-block-mobile">
            <img alt="red checkmark" src={redCheckmark} />
          </figure>
        </div>
      </div>
    </div>
  );
};

export default RedCheckmark;
