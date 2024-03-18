import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";

import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";

import { ConvexProviderWithAuth0 } from "convex/react-auth0";
import { Auth0Provider } from "@auth0/auth0-react";
import { ConvexReactClient } from "convex/react";

const container = document.getElementById("root");
const root = createRoot(container);
const convex = new ConvexReactClient(process.env.REACT_APP_CONVEX_URL);


root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Auth0Provider
          domain="dev-hwoexjx1vjnxdmni.us.auth0.com"
          clientId="In6dLD8Nem9wZubgqoZOUnSCyA3oklhK"
          authorizationParams={{
            redirect_uri: window.location.origin,
          }}
        >
          <ConvexProviderWithAuth0 client={convex}>
            <App />
          </ConvexProviderWithAuth0>
        </Auth0Provider>
      </Router>
    </Provider>
  </React.StrictMode>
);
