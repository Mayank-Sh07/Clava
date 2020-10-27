import React, { useState, useEffect, useContext } from "react";
import { Container, makeStyles, Typography } from "@material-ui/core";
import { v4 as uuidv4 } from "uuid";
import EventUpload from "./EventUpload";
import GalleryUpload from "./GalleryUpload";
import { FirebaseContext, UserContext } from "../Firebase";
import UserGrid from "./UserGrid";
import EventGrid from "./EventGrid";
import Loading from "../Loading";

const useStyles = makeStyles((theme) => ({
  btnContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    padding: "30px 25px",
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  const Firebase = useContext(FirebaseContext);
  const { currentUser } = useContext(UserContext);
  const [usersData, setUsersData] = useState(null);
  const [eventsData, setEventsData] = useState(null);

  useEffect(() => {
    const unsubscribe = Firebase.firestore()
      .collection("users")
      .onSnapshot((snap) => {
        setUsersData(
          snap.docs.map((doc) => {
            let data = doc.data();
            return {
              id: data.uid,
              name: data.displayName,
              role: data.role,
              email: data.email,
              createdAt: data.createdAt,
            };
          })
        );
      });

    const unsubscribeEvent = Firebase.firestore()
      .collection("events")
      .onSnapshot((snap) => {
        setEventsData(
          snap.docs.map((doc) => {
            let data = doc.data();
            return {
              title: data.eventData.title,
              start: data.eventData.extendedProps.eventStart,
              end: data.eventData.extendedProps.eventEnd,
              id: data.id,
              uploadDate: data.timestamp.toDate(),
              uploadName: data.userName,
            };
          })
        );
      });
    return () => {
      unsubscribe();
      unsubscribeEvent();
    };
  }, []);

  console.log(usersData);

  if (usersData === null || eventsData === null) return <Loading />;
  return (
    <Container>
      <br />
      <br />
      <Typography variant='h3' component='h1' align='center' gutterBottom>
        Welcome, {currentUser.name}
      </Typography>
      <div className={classes.btnContainer}>
        <EventUpload eventID={uuidv4()} />
        <GalleryUpload picID={uuidv4()} />
      </div>
      <br />
      <hr />
      <Typography variant='h4' component='h1' align='center' gutterBottom>
        USER DATA
      </Typography>
      <hr />
      <UserGrid data={usersData.slice(1)} />
      <br />
      <hr />
      <Typography variant='h4' component='h1' align='center' gutterBottom>
        EVENT DATA
      </Typography>
      <hr />
      <EventGrid data={eventsData} />
    </Container>
  );
}
