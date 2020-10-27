import React from "react";
import { Container, makeStyles } from "@material-ui/core";
import { v4 as uuidv4 } from "uuid";
import EventUpload from "./EventUpload";
import GalleryUpload from "./GalleryUpload";

const useStyles = makeStyles((theme) => ({}));

export default function Dashboard() {
  const classes = useStyles();
  return (
    <Container>
      <EventUpload eventID={uuidv4()} />
      <GalleryUpload picID={uuidv4()} />
    </Container>
  );
}
