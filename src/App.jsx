import React from "react";
import "./App.css";

import Calculator from "./components/Calculator/Calculator";
import { HistoryProvider } from "./context/HistoryContext";

function App() {
  return (
    <HistoryProvider>
      <main className="container">
        <Calculator />
      </main>
    </HistoryProvider>
  );
}

export default App;
