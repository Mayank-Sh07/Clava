import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { PrivateRoute, UserContextProvider } from "./Components/Firebase";
import { Container } from "@material-ui/core";
import {
  Home,
  About,
  Gallery,
  Upcoming,
  Feed,
  UserPosts,
  Blog,
  Calendar,
  Attendance,
  Alumni,
  Navbar,
  Profile,
  Dashboard,
} from "./Components";

function Clava() {
  console.log("clava render");
  return (
    <Container disableGutters maxWidth={false}>
      <UserContextProvider>
        <BrowserRouter>
          <Navbar />
          <Switch>
            <Route path='/Home' exact component={Home} />
            <Route path='/About' exact component={About} />
            <Route path='/Gallery' exact component={Gallery} />
            <Route path='/Upcoming' exact component={Upcoming} />
            <Route path='/Heads' exact component={Alumni} />
            <PrivateRoute
              path='/Dashboard'
              exact
              component={Dashboard}
              restricted
              adminOnly
            />
            <PrivateRoute path='/Feed' exact component={Feed} />
            <PrivateRoute path='/Posts' exact component={UserPosts} />
            <PrivateRoute path='/Blog' exact component={Blog} />
            <PrivateRoute path='/Calendar' exact component={Calendar} />
            <PrivateRoute
              path='/Attendance'
              exact
              component={Attendance}
              restricted
              memberOnly
            />
            <PrivateRoute path='/Profile' exact component={Profile} />
            <Route path='/' component={Home} />
          </Switch>
        </BrowserRouter>
      </UserContextProvider>
    </Container>
  );
}

export default Clava;
