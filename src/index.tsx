import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App";
import CreateNew from "./pages/CreateNew";
import "./index.css";
import CelebritiesStore from "./stores/Celebrities";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={CelebritiesStore}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/create" element={<CreateNew />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
