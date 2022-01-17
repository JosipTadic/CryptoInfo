import { FC } from "react";
import redCheckmark from "../icons/close-red.png";
import { IlabelProps } from "./GreenCheckmark";

const RedCheckmark: FC<IlabelProps> = (labelProp) => {
  return (
    <>
      <div>
        <div>
          <h4>{labelProp.labelProp}</h4>
        </div>
        <div>
          <figure className="image is-32x32">
            <img alt="red checkmark" src={redCheckmark} />
          </figure>
        </div>
      </div>
    </>
  );
};

export default RedCheckmark;
