import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import App from "./App";
import "./index.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import { Globalstate } from "./components/state/provider";
import reducer, { initialstate } from "./components/state/reducer";

axios.defaults.baseURL = "http://localhost:8000/";

ReactDOM.render(
  <React.StrictMode>
    <Globalstate initialstate={initialstate} reducer={reducer}>
      <App />
    </Globalstate>
  </React.StrictMode>,
  document.getElementById("root")
);
