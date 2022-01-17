import React from "react";
import GreenCheckmark from "./GreenCheckmark";
import { IcoinInfoDataBoolean } from "./ItemPage";
import RedCheckmark from "./RedCheckmark";

const CheckIconComponent: React.FC<IcoinInfoDataBoolean> = ({
  is_new,
  hardware_wallet,
  is_active,
  open_source,
}) => {
  return (
    <>
      {is_new ? (
        <GreenCheckmark labelProp="New:" />
      ) : (
        <RedCheckmark labelProp="New: " />
      )}
      {hardware_wallet ? (
        <GreenCheckmark labelProp="Hardware wallet:" />
      ) : (
        <RedCheckmark labelProp="Hardware wallet:" />
      )}
      {is_active ? (
        <GreenCheckmark labelProp="Active:" />
      ) : (
        <RedCheckmark labelProp="Active:" />
      )}
      {open_source ? (
        <GreenCheckmark labelProp="Open source:" />
      ) : (
        <RedCheckmark labelProp="Open source:" />
      )}
    </>
  );
};

export default CheckIconComponent;
