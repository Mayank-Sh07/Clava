import React from "react";
import { Container, makeStyles, Typography } from "@material-ui/core";
import { v4 as uuidv4 } from "uuid";
import PostUpload from "../Firebase/PostUpload";

const useStyles = makeStyles((theme) => ({}));

export default function Dashboard() {
  const classes = useStyles();
  return (
    <Container>
      <PostUpload postID={uuidv4()} />
    </Container>
  );
}
