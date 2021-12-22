import React from "react";
import "./App.css";

import Calculator from "./components/Calculator/Calculator";
import { HistoryProvider } from "./context/HistoryContext";

function App() {
  return (
    <HistoryProvider>
      <main className="container">
        <h3 className="header-app">
          Calculator App{" "}
          <img
            src="https://d29fhpw069ctt2.cloudfront.net/icon/image/84736/preview.svg"
            alt="calculator icon"
            height="20rem"
          />
        </h3>

        <Calculator />
      </main>
    </HistoryProvider>
  );
}

export default App;
