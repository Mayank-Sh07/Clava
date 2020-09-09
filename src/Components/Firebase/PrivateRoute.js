import React, { useContext } from "react";
import { Route } from "react-router-dom";
import { UserContext } from "./UserContextProvider";
import LoginDialog from "./LoginDialog";

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  console.log("PRIVATE ROUTE CALLED");
  const { currentUser } = useContext(UserContext);
  return (
    <Route
      {...rest}
      render={(routeProps) =>
        !!currentUser ? (
          <RouteComponent {...routeProps} />
        ) : (
          <LoginDialog redirect />
        )
      }
    />
  );
};

export default PrivateRoute;
