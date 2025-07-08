import React from "react";
import { Navigate } from "react-router-dom";

type Props = {
  children: React.ReactElement;
};

const PrivateRoute: React.FC<Props> = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/auth" replace />;
  }

  return children;
};

export default PrivateRoute;
