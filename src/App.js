import React, { Suspense, useEffect, useState } from "react";

import "./App.css";
import Loader from "./Components/Common/Loader";
import DefaultLayout from "./Components/DefaultLayout/DefaultLayout";
import { Navigate, Route, Routes } from "react-router-dom";

import routes from "./routes";

import { useDispatch, useSelector } from "react-redux";
import Converse from "./pages/Chat/Converse";
import SignIn from "./pages/Auth/Signin";
import { userActions } from "./features/user/user-slice";
import { useConvexAuth } from "convex/react";
import axios from "axios";

function App() {
  const [loading, setLoading] = useState(true);
  const { isLoading, isAuthenticated } = useConvexAuth();

  axios.defaults.headers.common['ngrok-skip-browser-warning'] = 'false'; // for all requests

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      {!isAuthenticated ? (
        <Routes>
          <Route index element={<SignIn />} />
          {/* <Route path="*" element={<Navigate to="/" />} /> */}
        </Routes>
      ) : (
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route index element={<Converse />} />
            {routes.map(({ path, component: Component }) => (
              <Route
                path={path}
                element={
                  <Suspense fallback={<Loader />}>
                    <Component />
                  </Suspense>
                }
              />
            ))}
            <Route path="*" element={<Navigate to="/" />} />
          </Route>
        </Routes>
      )}
    </>
  );
}

export default App;
