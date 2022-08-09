import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { renewToken } from "actions/auth";
import Layout from "components/Layout/Layout";
import LoginScreen from "../LoginScreen/LoginScreen";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import PublicRoute from "./PublicRoute/PublicRoute";

const AppRouter: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(renewToken());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route
            path="/auth/*"
            element={
              <PublicRoute>
                <LoginScreen />
              </PublicRoute>
            }
          />

          <Route
            path="/*"
            element={
              <PrivateRoute>
                <Layout />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default AppRouter;
