import { FC } from "react";
import greenCheckmark from "../icons/green-checkmark.png";

export interface IlabelProps {
  labelProp: string;
}

const GreenCheckmark: FC<IlabelProps> = (labelProp) => {
  return (
    <>
      <div className="m-2 is-text-centered">
        <div>
          <h4>{labelProp.labelProp}</h4>
        </div>
        <div>
          <figure className="image is-32x32">
            <img alt="green checkmark" src={greenCheckmark} />
          </figure>
        </div>
      </div>
    </>
  );
};

export default GreenCheckmark;
