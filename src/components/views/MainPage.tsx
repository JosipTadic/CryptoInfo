import React from "react";
import "bulma/css/bulma.min.css";
import TableWrapper from "../table/TableWrapper";

const MainPage: React.FC = () => {

  return (
    <div className="hero is-fullheight">
      <div className="control">
        <TableWrapper />
      </div>
    </div>
  );
};

export default MainPage;
