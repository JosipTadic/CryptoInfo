import React from "react";
import GreenCheckmark from "./GreenCheckmark";
import { IcoinInfoDataBoolean } from "../types";
import RedCheckmark from "./RedCheckmark";

const CheckIconComponent: React.FC<IcoinInfoDataBoolean> = ({
  is_new,
  hardware_wallet,
  is_active,
  open_source,
}) => {
  return (
    <div className="mt-2 ml-5">
      {is_new ? (
        <GreenCheckmark labelProp="New: " />
      ) : (
        <RedCheckmark labelProp="New: " />
      )}
      {hardware_wallet ? (
        <GreenCheckmark labelProp="Hardware wallet: " />
      ) : (
        <RedCheckmark labelProp="Hardware wallet: " />
      )}
      {is_active ? (
        <GreenCheckmark labelProp="Active: " />
      ) : (
        <RedCheckmark labelProp="Active: " />
      )}
      {open_source ? (
        <GreenCheckmark labelProp="Open source: " />
      ) : (
        <RedCheckmark labelProp="Open source: " />
      )}
    </div>
  );
};

export default CheckIconComponent;
