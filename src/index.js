// src/index.js or main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "./Context/ThemeContext"; // ⬅️ Import

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider> {/* ⬅️ Wrap App */}
      <App />
      <Toaster position="top-right" reverseOrder={false} />
    </ThemeProvider>
  </React.StrictMode>
);
