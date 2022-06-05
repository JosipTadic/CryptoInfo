import React, { useState } from "react";
import "bulma/css/bulma.min.css";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import TableFooter from "./TableFooter";

const TableWrapper: React.FC = () => {
  const [value, setValue] = useState("");
  const [skipPage, setSkipPage] = useState([0, 20]);

  return (
    <>
      <div className="field m-2">
        <p className="control has-icons-right"></p>
        <input
          className="input"
          type="search"
          placeholder="Search by name or symbol..."
          onChange={(e) => setValue(e.target.value.toLowerCase())}
        />
      </div>
      <div className="m-2 table-container">
        <table className="table is-striped is-hoverable is-fullwidth">
          <TableHeader />
          <TableBody value={value} skipPage={skipPage} />
          <TableFooter skipPage={skipPage} setSkipPage={setSkipPage} />
        </table>
      </div>
    </>
  );
};

export default TableWrapper;
