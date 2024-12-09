import React from "react";
import logo from "./logo.svg";
//import './App.css';
import Labs from "./Labs";
import Kanbas from "./Kanbas";
import { HashRouter, Route, Routes, Navigate } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <h1 style={{ textAlign: "center" }}>Smithi Saladi</h1>
      <HashRouter>
        <div>
          <Routes>
            <Route path="/" element={<Navigate to="/Kanbas" />} />
            <Route path="/Labs/*" element={<Labs />} />
            <Route path="/Kanbas/*" element={<Kanbas />} />
          </Routes>
        </div>
      </HashRouter>
    </div>
  );
}

export default App;
