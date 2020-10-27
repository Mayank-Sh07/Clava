import React from "react";
import clsx from "clsx";
import { makeStyles, Grid, Typography, Paper } from "@material-ui/core";
import Parallax from "../Alumni/Parallax/Parallax";
import LocalFloristIcon from "@material-ui/icons/LocalFlorist";

const useStyles = makeStyles((theme) => ({
  grid: {
    marginRight: "-15px",
    marginLeft: "-15px",
    width: "auto",
  },
  below: {
    color: "#adadad",
    fontFamily: "Verdana, sans-serif",
    textShadow: " 2.5px 2px 2.5px #195e47",
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
    color: "#ffffff",
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
    fontWeight: "525",
    fontFamily: "Verdana, sans-serif",
    fontSize: "3em",
    display: "inline-block",
    position: "relative",
    marginTop: "30px",
    minHeight: "32px",
    textShadow: "-2px 1px 4px rgba(150, 149, 150, 1)",
    [theme.breakpoints.up("sm")]: {
      fontSize: "3em",
    },
  },
  smalltext: {
    color: "#adadad",
    margin: "1.75rem 0 2.45rem",
    textDecoration: "none",
    fontWeight: "450",
    fontFamily: "Verdana, sans-serif",
    fontSize: "4em",
    display: "inline-block",
    position: "relative",
    marginTop: "30px",
    minHeight: "32px",
    textShadow: " 3.5px 2.8px 3.5px #195e47",
    [theme.breakpoints.up("sm")]: {
      fontSize: "1.7em",
    },
  },
  pic: {
    color: "#000000",
    borderRadius: "600px",
  },
  main: {
    position: "relative",
    zIndex: "3",
  },
  mainRaised: {
    margin: "-60px 20px 0px",
    borderRadius: "6px",
  },
}));

export default function About(props) {
  const classes = useStyles();
  return (
    <div style={{ backgroundColor: "#072b27" }}>
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
              <Typography variant='h6' className={classes.title}>
                WE ARE BUILT FOR YOU!
              </Typography>
              <Typography variant='h6' className={classes.smalltext}>
                Our mission is to ensure software development teams can do their
                best work. So we created Clubhouse to provide the most intuitive
                and enjoyable project management platform teams actually want to
                use — from project planning to product creation.
              </Typography>
            </Grid>
          </Grid>
          <br />
        </div>
      </Parallax>
      <div></div>

      <Paper
        className={clsx(classes.main, classes.mainRaised)}
        style={{ backgroundColor: "#1e1e1e" }}
      >
        <div className={classes.container}>
          <Grid container className={classes.grid} justify='center'>
            <paper>
              <Grid
                item
                className={classes.gridItem}
                style={{ textAlign: "center" }}
              ></Grid>
              <br /> <br />
              <Typography variant='h4' className={classes.below}>
                <center>
                  <LocalFloristIcon /> <br />
                  <b>
                    {" "}
                    <u> Our Product Philosophy </u>{" "}
                  </b>{" "}
                </center>
              </Typography>
              <br />
              <Typography variant='h5' className={classes.below}>
                We break down barriers so teams can focus on what matters –
                working together to create products their customers love.
              </Typography>
            </paper>
            <br></br> <br></br>
            <paper>
              <Typography variant='h5' className={classes.smalltext}>
                Clava is a full service club management application based in
                India that was created by pairing together our passion for
                business and events. We bring a fresh, unique approach to the
                event management industry.
                <br></br>
                <br></br>Our team understands that a properly executed event can
                be leveraged to support an organization’s strategic vision,
                incorporated into a company’s marketing plan, or used to build
                networks and client loyalty.
              </Typography>
            </paper>
          </Grid>
        </div>
        <Typography variant='h4' className={classes.below}>
          {" "}
          <center>
            <b>
              {" "}
              <u> Core Commitee </u>
            </b>
          </center>
        </Typography>
        <br /> <br />
        <Grid container spacing={2} className={classes.pic}>
          <Grid item xs={4} align='center'>
            <img
              src={require("../Images/alu1.svg")}
              height='200px'
              width='250px'
              alt='xyz'
            />
          </Grid>
          <Grid item xs={4} align='center'>
            <img
              src={require("../Images/alu2.svg")}
              height='200px'
              width='250px'
              alt='xyz'
            />
          </Grid>
          <Grid item xs={4} align='center'>
            <img
              src={require("../Images/alu3.svg")}
              height='200px'
              width='250px'
              alt='xyz'
            />
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
