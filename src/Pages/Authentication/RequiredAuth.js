import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const AuthRequire = ({ children }) => {
  const {
    user: { token },
  } = useSelector((state) => state.auth);

  const location = useLocation();

  return token ? (
    children
  ) : (
    <Navigate replace to="/Login" state={{ from: location }} />
  );
};

export default AuthRequire;
