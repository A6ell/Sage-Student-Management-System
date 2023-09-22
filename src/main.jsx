import React from "react";
import { createRoot } from "react-dom/client"; // Import createRoot from "react-dom/client" instead of "react-dom"
import App from "./App.jsx";
import "./index.css";
import { AuthContextProvider } from "./utils/Authcontext.jsx";

// Use createRoot instead of ReactDOM.render
createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </React.StrictMode>
);
