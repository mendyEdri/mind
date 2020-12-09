import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../Context/auth";

const AuthRoute = ({ component: Component, ...others }) => {
  const { user } = useContext(AuthContext);

  return (
    <Route
      {...others}
      render={(props) => user ? <Redirect to="/" /> : <Component {...props} />}
    />
  );
};

export default AuthRoute;
