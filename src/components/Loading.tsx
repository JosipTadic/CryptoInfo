import { FC } from "react";
import spinner from "../icons/spinner.gif";

const Loading: FC = () => {
  return (
    <img src={spinner} alt="loading animation" className="spinner"/>
  );
};

export default Loading;
