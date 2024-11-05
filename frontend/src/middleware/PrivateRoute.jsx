import React from "react";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default PrivateRoute;
