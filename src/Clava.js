import React from "react";
import { Container } from "@material-ui/core";
import Navbar from "./Components/Navbar/Navbar";
import { Switch, Route } from "react-router-dom";
import Home from "./Components/Home/Home";
import About from "./Components/About/About";
import Gallery from "./Components/Gallery/Gallery";
import Upcoming from "./Components/Upcoming/Upcoming";
import Feed from "./Components/Feed/Feed";
import Blog from "./Components/Blog/Blog";
import Calendar from "./Components/Calendar/Calendar";
import Attendance from "./Components/Attendance/Attendance";
import Alumni from "./Components/Alumni/Alumni";

// const useStyles = makeStyles((theme) => ({}));

function Clava() {
  // const classes = useStyles();
  console.log("clava render");

  return (
    <Container disableGutters>
      <Navbar />
      <Switch>
        <Route path='/Home'>
          <Home />
        </Route>
        <Route path='/About'>
          <About />
        </Route>
        <Route path='/Gallery'>
          <Gallery />
        </Route>
        <Route path='/Upcoming'>
          <Upcoming />
        </Route>
        <Route path='/Feed'>
          <Feed />
        </Route>
        <Route path='/Blog'>
          <Blog />
        </Route>
        <Route path='/Calendar'>
          <Calendar />
        </Route>
        <Route path='/Attendance'>
          <Attendance />
        </Route>
        <Route path='/Alumni'>
          <Alumni />
        </Route>
      </Switch>
    </Container>
  );
}

export default Clava;
