import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { SystemProvider } from "./context/SystemContext";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
    <SystemProvider>
  <AuthProvider>
          <App />
        </AuthProvider>
    </SystemProvider>
    </BrowserRouter>
  </React.StrictMode>
);
