import React from "react";
import { Container, makeStyles, Typography } from "@material-ui/core";
import { UserContext } from "../Firebase";

const useStyles = makeStyles((theme) => ({
  flexContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    padding: "20px 40px 20px 40px",
  },
}));

export default function Calendar() {
  const classes = useStyles();
  const { currentUser } = React.useContext(UserContext);
  return (
    <Container className={classes.flexContainer}>
      <Typography variant='h1'>Calendar</Typography>
    </Container>
  );
}
