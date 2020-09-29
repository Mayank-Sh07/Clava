import React, { useState, useEffect, useContext } from "react";
import { FirebaseContext, UserContext } from "../Firebase";
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

export default function Feed() {
  const [pending, setPending] = useState(true);
  const [Posts, setPosts] = useState(null);
  const Firebase = useContext(FirebaseContext);
  const { currentUser } = useContext(UserContext);
  useEffect(() => {
    const firestoreCall = Firebase.firestore()
      .collection("posts")
      .onSnapshot((snapShot) => {
        setPosts(
          snapShot.docs.map((doc) => ({ id: doc.id, post: doc.data() }))
        );
        setPending(false);
      });

    return () => firestoreCall();
  }, []);
  const classes = useStyles();
  console.log(Posts);
  if (pending) {
    return <h3>Loading...</h3>;
  } else
    return (
      <Container className={classes.flexContainer}>
        <Container maxWidth='sm'>
          {Posts.map(({ id, post }) => (
            <Post
              key={id}
              post={post}
              userPost={
                currentUser.isAdmin ? true : currentUser.userPosts.includes(id)
              }
            />
          ))}
        </Container>
      </Container>
    );
}
