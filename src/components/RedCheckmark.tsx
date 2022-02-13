import { FC } from "react";
import redCheckmark from "../icons/close-red.png";
import { IlabelProps } from "./GreenCheckmark";

const RedCheckmark: FC<IlabelProps> = (labelProp) => {
  return (
    <>
      <div className="columns m-1">
        <div className="column ml-2">
          <p>{labelProp.labelProp}</p>
        </div>
        <div className="column">
          <figure className="image is-32x32">
            <img alt="red checkmark" src={redCheckmark} />
          </figure>
        </div>
      </div>
    </>
  );
};

export default RedCheckmark;
