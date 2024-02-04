import React, { Suspense, useEffect, useState } from "react";

import "./App.css";
import Loader from "./Components/Common/Loader";
import DefaultLayout from "./Components/DefaultLayout/DefaultLayout";
import { Navigate, Route, Routes } from "react-router-dom";


import routes from "./routes";

import { useSelector } from "react-redux";
import Converse from "./pages/Chat/Converse";
import SignIn from "./pages/Auth/Signin";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  console.log(isLoggedIn);

  return loading ? (
    <Loader />
  ) : (
    <>
      {!isLoggedIn ? (
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
