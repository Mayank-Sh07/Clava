import React from "react";
import { Container, makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  flexContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    padding: "20px 40px 20px 40px",
  },
}));

export default function Alumni() {
  const classes = useStyles();
  return (
    <Container className={classes.flexContainer}>
      <Typography variant='h1'>Alumni</Typography>
    </Container>
  );
}
