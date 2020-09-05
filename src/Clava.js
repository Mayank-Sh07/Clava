import React from "react";
import { Container } from "@material-ui/core";
import Navbar from "./Components/Navbar/Navbar";
// const useStyles = makeStyles((theme) => ({}));

function Clava() {
  // const classes = useStyles();
  console.log("clava render");
  return (
    <Container disableGutters>
      <Navbar />
      <Container></Container>
    </Container>
  );
}

export default Clava;
