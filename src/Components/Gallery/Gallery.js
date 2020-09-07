import React from "react";
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
} from "@material-ui/core";
import InfoIcon from "@material-ui/icons/Info";

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

const tileData = [
  {
    img: "faces/card-profile1-square.jpg",
    title: "TEST1",
    author: "author",
  },
  {
    img: "faces/card-profile2-square.jpg",
    title: "Image2",
    author: "author",
  },
  {
    img: "faces/card-profile5-square.jpg",
    title: "TEST3",
    author: "author",
  },
  {
    img: "faces/card-profile4-square.jpg",
    title: "Image4",
    author: "author",
  },
];

export default function Gallery() {
  const theme = useTheme();
  var xs = useMediaQuery(theme.breakpoints.only("xs"));
  var sm = useMediaQuery(theme.breakpoints.only("sm"));
  const responsiveCellHeight = () => {
    if (xs) return 150;
    else if (sm) return 250;
    else return 350;
  };
  const classes = useStyles();
  return (
    <Container className={classes.flexContainer}>
      <GridList cellHeight={responsiveCellHeight()} cols={3} spacing={8}>
        <GridListTile cols={3} style={{ height: "auto", textAlign: "center" }}>
          <Typography variant='h3'>December</Typography>
        </GridListTile>
        {tileData.map((tile) => (
          <GridListTile classes={{ tile: classes.rounded }}>
            <img src={tile.img} alt={tile.title} />
            <GridListTileBar
              title={tile.title}
              subtitle={
                <Typography variant='caption'>by: {tile.author}</Typography>
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
