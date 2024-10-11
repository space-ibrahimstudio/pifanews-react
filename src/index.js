import React from "react";
import ReactDOM, { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { createGenerateId, JssProvider, SheetsRegistry } from "react-jss";
import { IbrahimStudioProvider } from "@ibrahimstudio/react";
import { ApiProvider } from "./libs/plugins/apis";
import { LoadingProvider } from "./components/feedback/loader";
import { AuthProvider } from "./libs/guards/auth";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
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
          <LoadingProvider>
            <ApiProvider>
              <AuthProvider>
                <App />
              </AuthProvider>
            </ApiProvider>
          </LoadingProvider>
        </BrowserRouter>
      </IbrahimStudioProvider>
    </HelmetProvider>
  </React.StrictMode>
);

// const root = document.getElementById("root");
// if (root && root.hasChildNodes()) {
//   hydrateRoot(
//     root,
//     <React.StrictMode>
//       <HelmetProvider>
//         <IbrahimStudioProvider>
//           <BrowserRouter>
//             <LoadingProvider>
//               <ApiProvider>
//                 <AuthProvider>
//                   <App />
//                 </AuthProvider>
//               </ApiProvider>
//             </LoadingProvider>
//           </BrowserRouter>
//         </IbrahimStudioProvider>
//       </HelmetProvider>
//     </React.StrictMode>,
//     () => {
//       const reactSnapStyles = document.getElementById("react-snap-styles");
//       reactSnapStyles?.parentNode?.removeChild(reactSnapStyles);
//     }
//   );
// } else {
//   const registry = new SheetsRegistry();
//   const generateId = createGenerateId();
//   createRoot(root, () => {
//     if (navigator.userAgent === "IbrahimStudio") {
//       const badStyles = document.querySelectorAll("[data-jss]");
//       badStyles.forEach((cssStyle) => cssStyle.parentNode?.removeChild(cssStyle));
//       const style = document.createElement("style");
//       style.innerHTML = registry.toString();
//       style.setAttribute("id", "react-snap-styles");
//       const head = document.querySelector("head");
//       head.appendChild(style);
//     }
//   }).render(
//     <JssProvider registry={registry} generateId={generateId}>
//       <React.StrictMode>
//         <HelmetProvider>
//           <IbrahimStudioProvider>
//             <BrowserRouter>
//               <LoadingProvider>
//                 <ApiProvider>
//                   <AuthProvider>
//                     <App />
//                   </AuthProvider>
//                 </ApiProvider>
//               </LoadingProvider>
//             </BrowserRouter>
//           </IbrahimStudioProvider>
//         </HelmetProvider>
//       </React.StrictMode>
//     </JssProvider>
//   );
// }

if (process.env.NODE_ENV === "production") {
  reportWebVitals(sendtoGA);
} else {
  reportWebVitals(sendtoLog);
}
