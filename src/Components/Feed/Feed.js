import React, { useState, useEffect, useContext } from "react";
import { FirebaseContext, UserContext } from "../Firebase";
import Post from "./Post";
import { useSnackbar } from "notistack";
import { Container, makeStyles } from "@material-ui/core";
import PostUpload from "./PostUpload";
import { v4 as uuidv4 } from "uuid";

const useStyles = makeStyles((theme) => ({
  flexContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    padding: "20px 40px 20px 40px",
  },
}));

export default function Feed() {
  const [pending, setPending] = useState(true);
  const [Posts, setPosts] = useState(null);
  const Firebase = useContext(FirebaseContext);
  const { currentUser } = useContext(UserContext);
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    const firestoreCall = Firebase.firestore()
      .collection("posts")
      .onSnapshot(
        (snapShot) => {
          setPosts(
            snapShot.docs.map((doc) => ({ id: doc.id, post: doc.data() }))
          );
          setPending(false);
        },
        () => enqueueSnackbar("Unable to fetch Post data at the moment.")
      );

    return () => firestoreCall();
  }, []);
  const classes = useStyles();
  if (pending) {
    return <h3>Loading...</h3>;
  } else
    return (
      <Container className={classes.flexContainer}>
        <div style={{ width: "100%" }}>
          <PostUpload postID={uuidv4()} />
        </div>
        <Container maxWidth='sm' disableGutters>
          {Posts.map(({ id, post }) => (
            <Post key={id} post={post} isUserPost={false} />
          ))}
        </Container>
      </Container>
    );
}
