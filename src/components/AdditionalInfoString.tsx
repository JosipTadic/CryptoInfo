import React from "react";
import { IcoinInfoDataString } from "./ItemPage";

const AdditionalInfoString: React.FC<IcoinInfoDataString> = ({
  contract,
  development_status,
  org_structure,
  platform,
  proof_type,
  type,
}) => {
  return (
    <>
      {contract ? (
        <div className="m-2">
          <h4>Contract: {contract}</h4>
        </div>
      ) : (
        <></>
      )}
      {development_status ? (
        <div className="m-2">
          <h4>Development status: {development_status}</h4>
        </div>
      ) : (
        <></>
      )}
      {org_structure ? (
        <div className="m-2">
          <h4>Organization structure: {org_structure}</h4>
        </div>
      ) : (
        <></>
      )}
      {platform ? (
        <div className="m-2">
          <h4>Platform: {platform}</h4>
        </div>
      ) : (
        <></>
      )}
      {proof_type ? (
        <div className="m-2">
          <h4>Proof type: {proof_type}</h4>
        </div>
      ) : (
        <></>
      )}
      {type ? (
        <div className="m-2">
          <h4>Type: {type}</h4>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default AdditionalInfoString;
