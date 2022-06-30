import { FC } from "react";
import spinner from "../icons/spinner.gif";

const Loading: FC = () => {
  return (
    <img src={spinner} alt="loading animation"/>
  );
};

export default Loading;
