import "bulma/css/bulma.min.css";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import ItemPage from "./components/views/ItemPage";
import MainPage from "./components/views/MainPage";

function App() {
  return (
    <div>
      <nav className="max-width">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="historical/:id" element={<ItemPage />} />
        </Routes>
      </nav>
    </div>
  );
}

export default App;
