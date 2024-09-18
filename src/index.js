import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { IbrahimStudioProvider } from "@ibrahimstudio/react";
import { ApiProvider } from "./libs/plugins/apis";
import { LoadingProvider } from "./components/feedback/loader";
import { AuthProvider } from "./libs/guards/auth";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import "./index.css";

const sendtoGA = ({ name, delta, id }) => {
  if (typeof window.gtag === "function") {
    window.gtag("event", name, {
      event_category: "Web Vitals",
      event_label: id,
      value: Math.round(name === "CLS" ? delta * 1000 : delta),
      non_interaction: true,
    });
  } else {
    console.warn("gtag function is not available");
  }
};

const sendtoLog = ({ name, delta, id }) => {
  console.log(`[DEV] ${name}:`, { id, delta });
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <IbrahimStudioProvider>
        <BrowserRouter>
          <ApiProvider>
            <LoadingProvider>
              <AuthProvider>
                <App />
              </AuthProvider>
            </LoadingProvider>
          </ApiProvider>
        </BrowserRouter>
      </IbrahimStudioProvider>
    </HelmetProvider>
  </React.StrictMode>
);

serviceWorkerRegistration.register();

if (process.env.NODE_ENV === "production") {
  reportWebVitals(sendtoGA);
} else {
  reportWebVitals(sendtoLog);
}
