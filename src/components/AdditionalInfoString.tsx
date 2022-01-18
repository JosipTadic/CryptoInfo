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
        <div>
          <h4>Contract: </h4>
          <h4>{contract}</h4>
        </div>
      ) : (
        <></>
      )}
      {development_status ? (
        <div>
          <h4>Development status: </h4>
          <h4>{development_status}</h4>
        </div>
      ) : (
        <></>
      )}
      {org_structure ? (
        <div>
          <h4>Organization structure: </h4>
          <h4>{org_structure}</h4>
        </div>
      ) : (
        <></>
      )}
      {platform ? (
        <div>
          <h4>Platform: </h4>
          <h4>{platform}</h4>
        </div>
      ) : (
        <></>
      )}
      {proof_type ? (
        <div>
          <h4>Proof type: </h4>
          <h4>{proof_type}</h4>
        </div>
      ) : (
        <></>
      )}
      {type ? (
        <div>
          <h4>Type: </h4>
          <h4>{type}</h4>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default AdditionalInfoString;
