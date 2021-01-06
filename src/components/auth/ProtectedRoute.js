import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { currentUser } = useAuth();

  return (
    <>
      <Route
        {...rest}
        render={(props) => {
          return currentUser ? (
            <Redirect to="/dashboard" />
          ) : (
            <Component {...props} />
          );
        }}
      ></Route>
    </>
  );
};

export default ProtectedRoute;
