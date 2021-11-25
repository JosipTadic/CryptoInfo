import React, { useEffect, useState } from "react";
import "bulma/css/bulma.min.css";
import "./App.css";
import ItemPage from "./components/ItemPage";
import MainPage from "./components/MainPage";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <nav>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="historical/:id" element={<ItemPage />} />
        </Routes>
      </nav>
    </div>
  );
}

export default App;
