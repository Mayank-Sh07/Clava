import React, { useContext } from "react";
import { Route } from "react-router-dom";
import { UserContext } from "./UserContextProvider";
import LoginDialog from "./LoginDialog";

const checkAuth = (RouteComponent, adminOnly, memberOnly, currentUser) => {
  if (!!adminOnly) {
    if (currentUser.isAdmin) return <RouteComponent />;
    else return <LoginDialog redirect accessDenied />;
  } else if (!!memberOnly) {
    if (currentUser.isMember || currentUser.isAdmin) return <RouteComponent />;
    else return <LoginDialog redirect accessDenied />;
  } else return <LoginDialog redirect accessDenied />;
};

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  const { currentUser } = useContext(UserContext);
  return (
    <Route
      {...rest}
      render={() =>
        !!currentUser ? (
          rest.restricted ? (
            checkAuth(
              RouteComponent,
              rest.adminOnly,
              rest.memberOnly,
              currentUser
            )
          ) : (
            <RouteComponent />
          )
        ) : (
          <LoginDialog redirect />
        )
      }
    />
  );
};

export default PrivateRoute;
