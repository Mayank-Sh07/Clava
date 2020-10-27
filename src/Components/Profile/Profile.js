import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Container,
  makeStyles,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";
import { UserContext, FirebaseContext } from "../Firebase";
import ProfileCard from "./ProfileCard";
import MyEventsGrid from "./MyEventsGrid";
import Loading from "../Loading";

const useStyles = makeStyles((theme) => ({
  avatar: {
    height: 280,
    width: 280,
  },
  description: {
    height: 280,
    padding: 20,
    [theme.breakpoints.only("xs")]: {
      textAlign: "center",
    },
  },
}));

export default function Profile() {
  const classes = useStyles();
  const [events, setEvents] = useState(null);
  const Firebase = React.useContext(FirebaseContext);
  const { currentUser } = React.useContext(UserContext);
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    const unsubscribeEvent = currentUser.userDoc
      .collection("userEvents")
      .onSnapshot((snap) => {
        setEvents(
          snap.docs.map((doc) => {
            let data = doc.data();
            return {
              title: data.title,
              start: data.extendedProps.eventStart,
              end: data.extendedProps.eventEnd,
              id: data.id,
              startTime: data.startTime,
              endTime: data.endTime,
            };
          })
        );
      });
    return () => {
      unsubscribeEvent();
    };
  }, []);

  const handleEmailSubmit = (data) => {
    if (!data.email.endsWith("@vitstudent.ac.in") || data.email.length < 23) {
      alert("INVALID EMAIL");
    } else {
      console.log(data.email);
      Firebase.promoteUser(data.email);
    }
  };

  if (events === null) return <Loading />;

  return (
    <Container style={{ marginTop: "70px" }}>
      <Paper elevation={10}>
        <Grid container spacing={2} justify='center'>
          <Grid item xs={12} sm={4} align='center'>
            <ProfileCard user={currentUser} />
            <div hidden={!currentUser.isAdmin}>
              <form
                noValidate
                onSubmit={handleSubmit((data) => handleEmailSubmit(data))}
                style={{ padding: "5px 10px" }}
              >
                <TextField
                  variant='outlined'
                  margin='normal'
                  required
                  inputRef={register}
                  fullWidth
                  label='Email Address'
                  name='email'
                  id='email'
                />
                <Button type='submit'>SUBMIT</Button>
              </form>
            </div>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Typography
              variant='h5'
              gutterBottom
              align='center'
              style={{ width: "100%" }}
            >
              My Events
            </Typography>
            <MyEventsGrid data={events} />
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
