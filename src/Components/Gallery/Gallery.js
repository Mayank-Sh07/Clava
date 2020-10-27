import React, { useEffect, useState, useContext } from "react";
import { FirebaseContext } from "../Firebase";
import {
  Container,
  makeStyles,
  GridList,
  GridListTile,
  GridListTileBar,
  IconButton,
  useMediaQuery,
  useTheme,
  Typography,
  Popover,
} from "@material-ui/core";
import InfoIcon from "@material-ui/icons/Info";
import { useSnackbar } from "notistack";

const useStyles = makeStyles((theme) => ({
  flexContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    padding: "70px 40px 20px 40px",
  },
  rounded: {
    borderRadius: "15px",
  },
}));

export default function Gallery() {
  const theme = useTheme();
  const [Pictures, setPictures] = useState(null);
  const Firebase = useContext(FirebaseContext);
  const { enqueueSnackbar } = useSnackbar();
  var xs = useMediaQuery(theme.breakpoints.only("xs"));
  var sm = useMediaQuery(theme.breakpoints.only("sm"));
  const responsiveCellHeight = () => {
    if (xs) return 150;
    else if (sm) return 250;
    else return 350;
  };

  useEffect(() => {
    Firebase.firestore()
      .collection("gallery")
      .onSnapshot(
        (snapShot) => {
          setPictures(snapShot.docs.map((doc) => doc.data()));
        },
        () => enqueueSnackbar("Unable to fetch Post data at the moment.")
      );
  }, []);

  const classes = useStyles();
  console.log(Pictures);

  if (Pictures === null) {
    return <h3>Loading...</h3>;
  }

  return (
    <Container className={classes.flexContainer}>
      <GridList cellHeight={responsiveCellHeight()} cols={3} spacing={8}>
        <GridListTile cols={3} style={{ height: "auto", textAlign: "center" }}>
          <Typography variant='h3'>December</Typography>
        </GridListTile>
        {Pictures.map((pic) => (
          <GridListTile classes={{ tile: classes.rounded }}>
            <img src={pic.imageURL} alt={pic.title} />
            <GridListTileBar
              title={pic.title}
              subtitle={
                <Typography variant='caption'>pc: {pic.userName}</Typography>
              }
              actionIcon={
                <IconButton className={classes.icon}>
                  <InfoIcon />
                </IconButton>
              }
            />
          </GridListTile>
        ))}
      </GridList>
    </Container>
  );
}
