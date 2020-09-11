import React from "react";
import Post from "./Post";
import { Container, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  flexContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    padding: "20px 40px 20px 40px",
  },
}));

const clavaPosts = [
  {
    username: "Ramanatha",
    date: new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    }).format(new Date()),
    img: "faces/card-profile1-square.jpg",
    caption: "Dei TOC assignment annupu da!",
    description:
      "A grade is not as good as S grade because S grade is better and I like to Tango with Django!",
  },
  {
    username: "Mayank",
    date: new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    }).format(new Date()),
    img: "faces/card-profile2-square.jpg",
    caption: "Damn thats amazing!",
    description:
      "Someday I'm going to get to eat Gol Gappe with Guchchu, hopefully that day will come soon ...",
  },
  {
    username: "Jigyasa",
    date: new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    }).format(new Date()),
    img: "faces/card-profile4-square.jpg",
    caption: "Minkuuuuuuuuuu MINKU!",
    description:
      "Haye Raaam yeh Ladka , Bhagwaaaanjii mujhe utha loooo. YOU GOOOOO",
  },
];

export default function Feed() {
  const classes = useStyles();

  return (
    <Container className={classes.flexContainer}>
      <Container maxWidth='sm'>
        {clavaPosts.map((post) => (
          <Post post={post} />
        ))}
      </Container>
    </Container>
  );
}
