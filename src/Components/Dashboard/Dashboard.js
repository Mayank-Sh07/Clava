import React, { useState, useEffect, useContext } from "react";
import { Container, makeStyles } from "@material-ui/core";
import { v4 as uuidv4 } from "uuid";
import EventUpload from "./EventUpload";
import GalleryUpload from "./GalleryUpload";
import { FirebaseContext, UserContext } from "../Firebase";
import UserGrid from "./UserGrid";

const useStyles = makeStyles((theme) => ({}));

export default function Dashboard() {
  const classes = useStyles();
  const Firebase = useContext(FirebaseContext);
  const { currentUser } = useContext(UserContext);
  const [usersData, setUsersData] = useState(null);

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
    return () => unsubscribe();
  }, []);

  console.log(usersData);

  if (usersData === null) return <h3>Loading...</h3>;
  return (
    <Container>
      <EventUpload eventID={uuidv4()} />
      <GalleryUpload picID={uuidv4()} />
      <UserGrid data={usersData.slice(1)} />
    </Container>
  );
}
