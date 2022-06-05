import React from "react";
import "bulma/css/bulma.min.css";
import TableWrapper from "./table/TableWrapper";
//import { ItableContextProps } from "../types";

const MainPage: React.FC = () => {

  //const tableContext = createContext<ItableContextProps>({} as ItableContextProps);

  return (
    <div className="hero is-fullheight">
      <div className="control">
        
          <TableWrapper />
        
      </div>
    </div>
  );
};

export default MainPage;
