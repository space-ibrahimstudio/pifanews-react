import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { IbrahimStudioProvider } from "@ibrahimstudio/react";
import { ApiProvider } from "./libs/plugins/api";
import { LoadingProvider } from "./components/contents/loader";
import { FetchProvider } from "./libs/plugins/fetch";
import { Document } from "./libs/plugins/document";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <IbrahimStudioProvider>
        <BrowserRouter>
          <Document>
            <ApiProvider>
              <LoadingProvider>
                <FetchProvider>
                  <App />
                </FetchProvider>
              </LoadingProvider>
            </ApiProvider>
          </Document>
        </BrowserRouter>
      </IbrahimStudioProvider>
    </HelmetProvider>
  </React.StrictMode>
);

reportWebVitals();
