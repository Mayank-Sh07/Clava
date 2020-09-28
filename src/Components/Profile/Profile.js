import React from "react";
import { useForm } from "react-hook-form";
import {
  Container,
  makeStyles,
  Grid,
  Avatar,
  Paper,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";
import { UserContext, FirebaseContext } from "../Firebase";

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
  const Firebase = React.useContext(FirebaseContext);
  const { currentUser } = React.useContext(UserContext);
  const { register, handleSubmit } = useForm();

  const handleEmailSubmit = (data) => {
    if (!data.email.endsWith("@vitstudent.ac.in") || data.email.length < 23) {
      alert("INVALID EMAIL");
    } else {
      console.log(data.email);
      Firebase.promoteUser(data.email);
    }
  };

  return (
    <Container style={{ marginTop: "70px" }}>
      <Paper elevation={10}>
        <Grid container spacing={2} justify='center'>
          <Grid item xs={12} sm={4} align='center'>
            <Avatar
              className={classes.avatar}
              src={currentUser.photoURL}
              alt={currentUser.firstName}
              imgProps={{ style: { objectFit: "contain" } }}
              variant='rounded'
            />
          </Grid>
          <Grid item xs={12} sm={8}>
            <Paper className={classes.description} elevation={0}>
              <Typography variant='h2'>{currentUser.name}</Typography>
              <Typography variant='h4'>{currentUser.regsNumber}</Typography>
              <Typography variant='h6'>{currentUser.email}</Typography>
            </Paper>
          </Grid>
          <Grid item>
            <form
              noValidate
              onSubmit={handleSubmit((data) => handleEmailSubmit(data))}
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
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
