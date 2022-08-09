import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "store";

interface Props {
  children: JSX.Element;
}

const PublicRoute: React.FC<Props> = ({ children }) => {
  const { uid } = useSelector((state: RootState) => state.auth);
  const isAuthenticated = Boolean(uid);
  return isAuthenticated ? <Navigate to="/" /> : children;
};

export default PublicRoute;
