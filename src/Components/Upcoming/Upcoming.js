import React, { useState, useEffect, useContext } from "react";
import { Container, makeStyles } from "@material-ui/core";
import { FirebaseContext, UserContext } from "../Firebase";
import EventPost from "./EventPost";
import { useSnackbar } from "notistack";

const useStyles = makeStyles((theme) => ({
  flexContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    padding: "20px 40px 20px 40px",
  },
}));

export default function Upcoming() {
  const [Events, setEvents] = useState(null);
  const Firebase = useContext(FirebaseContext);
  const { currentUser } = useContext(UserContext);
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    console.log("here");
    const firestoreCall = Firebase.firestore()
      .collection("events")
      .onSnapshot(
        (snapShot) =>
          setEvents(snapShot.docs.map((doc) => ({ ...doc.data() }))),
        (error) => {
          console.log(error);
          enqueueSnackbar("Unable to fetch Events at the moment.");
        }
      );

    return () => firestoreCall();
  }, []);

  console.log(Events);

  const classes = useStyles();

  if (Events === null) {
    return <h3>Loading...</h3>;
  }

  return (
    <Container className={classes.flexContainer}>
      <Container maxWidth='md'>
        {Events.map((eventPost) => (
          <EventPost
            key={eventPost.id}
            eventPost={eventPost}
            currentUser={currentUser}
            enqueueSnackbar={enqueueSnackbar}
          />
        ))}
      </Container>
    </Container>
  );
}
