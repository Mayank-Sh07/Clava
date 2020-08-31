import React from "react";
import {
  makeStyles,
  Paper,
  Typography,
  Button,
  Container,
} from "@material-ui/core";
import { ClavaThemeContext } from "./Theme/ClavaThemeProvider";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

function Clava() {
  const classes = useStyles();
  const { currentTheme, setTheme } = React.useContext(ClavaThemeContext);
  return (
    <Container fluid>
      <Paper square className={classes.root}>
        <Typography variant='h1'>Test</Typography>
        <Button
          onClick={() => {
            currentTheme === "dark" ? setTheme("light") : setTheme("dark");
          }}
        >
          Change Theme
        </Button>
      </Paper>
    </Container>
  );
}

export default Clava;
