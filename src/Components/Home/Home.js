import React from "react";
import classNames from "classnames";
import { makeStyles, Grid, Typography, Paper,Container } from "@material-ui/core";
import Parallax from "../Parallax/Parallax.js";
const useStyles = makeStyles((theme) => ({
  grid: {
    marginRight: "-15px",
    marginLeft: "-15px",
    width: "auto",
  },
  flexContainer: {
        flexWrap: "wrap",
        justifyContent: "space-around",
        overflow: "hidden",
        padding: "0px 0px 0px 0px",
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
      textShadow:" 3.5px 2.8px 3.5px white",
    },
  },
  main: {
    position: "relative",
    zIndex: "3",
    backgroundColor: "#1e1e1e"
  },
  mainRaised: {
    margin: "-3px 50px -4px 30px",
    borderRadius: "50px",
  },
  typo :{
    fontFamily: 'Verdana, sans-serif',
    textShadow:" 1.5px 1.5px 1.5px #149c8d",
    color: '#adadad',
  },
  img:{
    width: 350,
    borderRadius: 50,
    boxShadow: "0 40px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    marginBottom: 25,
    display:'block',
    marginLeft: 'auto',
    marginRight: 'auto' ,

  },
  img2:
  {
    borderRadius: 300,
    boxShadow: "0 30px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    display:'block',
    marginLeft: 'auto',
    marginRight: 'auto' ,
  },
}));

export default function Home(props) {
  const classes = useStyles();
  return (
    <Container className={classes.flexContainer} maxWidth={false}>
    <div style={{backgroundColor:"#0a665b"}}>
      <Parallax filter image={require("../Images/bg.svg")}>
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
                Clava
              </Typography>
            </Grid>
          </Grid>
          <br />
        </div>
      </Parallax>
      {/* style={{backgroundImage : `url(${imp})` }} */}
      <Paper className={classNames(classes.main, classes.mainRaised )} >
      
        <div className={classes.container}>
          <div>
              <br></br> <br></br>
              <Typography variant='h5'className={classes.typo} >Clava is an integrated solution which enables the organisation to coordinate and manage a club. A user friendly and flexible user interface ensures personalised member history and activity tracking.
        </Typography>
        <br/>  <br/>  <br/> 
        
        <Grid container>
            <Grid item xs={5}>
                
                <br/> <br/>
            <img src={require("../Images/1.jpg") } height="300px" width="400px" alt="xyz" className={classes.img2} /> 
           
            </Grid>
           <Grid item xs={7}>
           <Typography variant='h5'className={classes.typo} >
             <br/> 
        All-in-one branded event management software that syncs all necessary technologies to help you run and promote your events. There is no need for it skills here; the event management software platform is easy to use, and you will be supported by our caring, fast-response customer service team. Eventscase is modular, customisable and supports any languages including chinese, russian and arabic.
        </Typography>
       </Grid> 
        </Grid>
        <Grid container>
          <Grid item xs={7}>
        <br/> <br/>
        <Typography variant='h5' className={classes.typo} >
          Clava offers you a productive approach to manage all the club events happening in your college, manage student's data, manage a feed where users can post and what not. All this within Clava!
          </Typography>
          <br/> <br/>
          <br/> <br/>
          </Grid>
          <Grid item xs={5}>
  <img src={require("../Images/2.jpg") } height="250px" width="400px"  alt="xyz" className={classes.img2} /> 
          </Grid>
          </Grid>
          <br/> <br/>
          <hr/>
          <Typography variant='h4' className={classes.typo} > <b><center>Our Events</center></b> </Typography>
          <Grid container>
            <Grid item xs={4}>
                
                <br/> <br/>
            <img src={require("../Images/a.jpeg") } height="230px"   alt="xyz"  className={classes.img}/> 
           
            </Grid>
            <Grid item xs={4}>
               
                <br/> <br/>
            <img src={require("../Images/b.jpg") } height="230px" alt="xyz"  className={classes.img}/> 
           
            </Grid>
            <Grid item xs={4}>
                
                <br/> <br/>
            <img src={require("../Images/c.jpg") } height="230px"  alt="xyz" className={classes.img}/> 
           
            </Grid>
        </Grid>
          </div>
      <br/> <br/>   
</div>      
      </Paper>
    </div>
    </Container>
  );
}
