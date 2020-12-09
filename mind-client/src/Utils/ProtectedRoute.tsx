import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../Context/auth";

const ProtectedRoute = ({ component: Component, ...others }) => {
  const { user } = useContext(AuthContext);

  return (
    <Route
      {...others}
      render={(props) => user ? <Component {...props} /> : <Redirect to="/login" />}
    />
  );
};

export default ProtectedRoute;
