import React from "react";
import { IcoinInfoDataString } from "../types";

const AdditionalInfoString: React.FC<IcoinInfoDataString> = ({
  contract,
  development_status,
  org_structure,
  platform,
  proof_type,
  type,
}) => {
  return (
    <div>
      {contract ? (
        <div className="m-2">
          <p>Contract: {contract}</p>
        </div>
      ) : (
        <></>
      )}
      {development_status ? (
        <div className="m-2">
          <p>Development status: {development_status}</p>
        </div>
      ) : (
        <></>
      )}
      {org_structure ? (
        <div className="m-2">
          <p>Organization structure: {org_structure}</p>
        </div>
      ) : (
        <></>
      )}
      {platform ? (
        <div className="m-2">
          <p>Platform: {platform}</p>
        </div>
      ) : (
        <></>
      )}
      {proof_type ? (
        <div className="m-2">
          <p>Proof type: {proof_type}</p>
        </div>
      ) : (
        <></>
      )}
      {type ? (
        <div className="m-2">
          <p>Type: {type}</p>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default AdditionalInfoString;
