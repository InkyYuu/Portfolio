import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Router from "./router";
import "./i18n";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <Router />
    </I18nextProvider>
  </React.StrictMode>
);
