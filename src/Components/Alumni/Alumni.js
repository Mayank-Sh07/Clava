import React from "react";
import clsx from "clsx";
import {
  makeStyles,
  Grid,
  Typography,
  Paper,
  Container,
} from "@material-ui/core";
import Parallax from "./Parallax/Parallax";
import ParallaxCarousel from "./Parallax/Carousel";

const useStyles = makeStyles((theme) => ({
  grid: {
    marginRight: "-15px",
    marginLeft: "-15px",
    width: "auto",
  },
  gridItem: {
    position: "relative",
    width: "100%",
    minHeight: "1px",
    paddingRight: "15px",
    paddingLeft: "15px",
    flexBasis: "auto",
  },
  container: {
    zIndex: "12",
    color: "#FFFFFF",
    paddingRight: "15px",
    paddingLeft: "15px",
    marginRight: "auto",
    marginLeft: "auto",
    width: "100%",
    "@media (min-width: 576px)": {
      maxWidth: "540px",
    },
    "@media (min-width: 768px)": {
      maxWidth: "720px",
    },
    "@media (min-width: 992px)": {
      maxWidth: "960px",
    },
    "@media (min-width: 1200px)": {
      maxWidth: "1140px",
    },
  },
  title: {
    color: "#ffffff",
    margin: "1.75rem 0 2.45rem",
    textDecoration: "none",
    fontWeight: "300",
    fontFamily: `"Roboto", "Times New Roman", serif`,
    fontSize: "4em",
    display: "inline-block",
    position: "relative",
    marginTop: "30px",
    minHeight: "32px",
    textShadow: "-2px 1px 4px rgba(150, 149, 150, 1)",
    [theme.breakpoints.up("sm")]: {
      fontSize: "8em",
    },
  },
  main: {
    position: "relative",
    zIndex: "3",
    backgroundColor: "#1e1e1e",
  },
  mainRaised: {
    margin: "-60px 20px 0px",
    borderRadius: "6px",
  },
}));

export default function Home(props) {
  const classes = useStyles();
  return (
    <>
      <Parallax filter image={require("../Images/stars.svg")}>
        <div className={classes.container}>
          <Grid container className={classes.grid} justify='center'>
            <Grid
              item
              className={classes.gridItem}
              xs={12}
              sm={12}
              md={6}
              style={{ textAlign: "center" }}
            >
              <Typography variant='h1' className={classes.title}>
                Heads
              </Typography>
            </Grid>
          </Grid>
          <br />
        </div>
      </Parallax>
      <Paper className={clsx(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <Container maxWidth='md' style={{ paddingTop: 100 }}>
            <ParallaxCarousel />
          </Container>
        </div>
      </Paper>
    </>
  );
}
