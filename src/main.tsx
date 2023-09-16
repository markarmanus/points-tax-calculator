import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import COLORS from "./Constants/Colors.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

const root: HTMLElement = document.documentElement;
root.style.backgroundColor = COLORS.background;
root.style.color = COLORS.text;
