import React from "react";
import { makeStyles, Container } from "@material-ui/core";
import Navbar from "./Components/Navbar/Navbar";
// const useStyles = makeStyles((theme) => ({}));

function Clava() {
  // const classes = useStyles();
  console.log("clava render");
  return (
    <>
      <Container disableGutters>
        <Navbar />
      </Container>
    </>
  );
}

export default Clava;
