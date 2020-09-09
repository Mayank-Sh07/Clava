import React from "react";
import { Container } from "@material-ui/core";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import {
  Home,
  About,
  Gallery,
  Upcoming,
  Feed,
  Blog,
  Calendar,
  Attendance,
  Alumni,
  Navbar,
} from "./Components";
import { PrivateRoute, UserContextProvider } from "./Components/Firebase";

function Clava() {
  console.log("clava render");
  return (
    <Container disableGutters>
      <UserContextProvider>
        <BrowserRouter>
          <Navbar />
          <Switch>
            <Route path='/Home' exact component={Home} />
            <Route path='/About' exact component={About} />
            <Route path='/Gallery' exact component={Gallery} />
            <Route path='/Upcoming' exact component={Upcoming} />
            <Route path='/Alumni' exact component={Alumni} />
            <PrivateRoute path='/Feed' exact component={Feed} />
            <PrivateRoute path='/Blog' exact component={Blog} />
            <PrivateRoute path='/Calendar' exact component={Calendar} />
            <PrivateRoute path='/Attendance' exact component={Attendance} />
            <Route path='/' component={Home} />
          </Switch>
        </BrowserRouter>
      </UserContextProvider>
    </Container>
  );
}

export default Clava;
