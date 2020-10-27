import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { UserContext, FirebaseContext } from "../Firebase";
import { useSnackbar } from "notistack";
import {
  TextField,
  Grid,
  Dialog,
  DialogContent,
  Button,
  Toolbar,
  Typography,
  IconButton,
  makeStyles,
  Box,
  LinearProgress,
} from "@material-ui/core";
import { CloseIcon, AddIcon } from "../Icons";

const useStyles = makeStyles((theme) => ({
  formItem: {
    padding: "10px 20px 10px 20px",
  },
  newPostButton: {
    borderRadius: "2em",
  },
}));

export default function EventUpload({ eventID }) {
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [imageURL, setImageURL] = useState({ URL: null, hasDownloaded: false });
  const { register, handleSubmit } = useForm();
  const Firebase = useContext(FirebaseContext);
  const { currentUser } = useContext(UserContext);
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const alterDate = (date, op) => {
    date.setDate(date.getDate() + Number(op));
    return date.toISOString().substr(0, 10);
  };

  const handleUpload = (event) => {
    let selectedFile = event.target.files[0];
    const uploadTask = Firebase.storage()
      .ref(`Events/${eventID}`)
      .put(selectedFile);
    uploadTask.on(
      "state_changed",
      (snapShot) => {
        //Progress Function
        let progress = Math.round(
          (snapShot.bytesTransferred / snapShot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        //Error Handler
        console.log(error);
        enqueueSnackbar("Error while Uploading, please try again.");
      },
      () => {
        //on Complete
        Firebase.storage()
          .ref("Events")
          .child(eventID)
          .getDownloadURL()
          .then((url) => {
            setImageURL({ URL: url, hasDownloaded: true });
            enqueueSnackbar("Poster uploaded Successfully!");
          })
          .catch((err) => {
            console.log(err);
            enqueueSnackbar("Poster upload failed, please try again.");
          });
      }
    );
  };

  function handleEventPostDetails(data) {
    let eventPost = {
      id: eventID,
      timestamp: Firebase.firestore.FieldValue.serverTimestamp(),
      userName: currentUser.firstName,
      date: new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
      }).format(new Date()),
      imageURL: imageURL.URL,
      eventData: {
        id: eventID,
        startRecur: data.startDate,
        endRecur: alterDate(new Date(data.endDate), 1),
        startTime: data.startTime,
        endTime: data.endTime,
        title: data.title,
        extendedProps: {
          eventStart: data.startDate,
          eventEnd: data.endDate,
          description: data.description,
        },
      },
    };
    console.log(eventPost);
    Firebase.firestore()
      .collection("events")
      .doc(eventPost.id)
      .set(eventPost)
      .then(() => enqueueSnackbar("Event Posted!"))
      .catch(() =>
        enqueueSnackbar("Error while posting Event, please try again.")
      );
    handleClose();
  }

  const newEvent = () => {
    return (
      <form onSubmit={handleSubmit((data) => handleEventPostDetails(data))}>
        <Grid container alignItems='center' justify='space-evenly'>
          <Grid item xs={12} className={classes.formItem}>
            <TextField
              id='event-upload'
              name='image'
              label='Event Poster'
              helperText='Select the image to be uploaded (required)'
              type='file'
              required
              inputRef={register}
              fullWidth
              autoComplete='off'
              onChange={handleUpload}
              InputLabelProps={{ shrink: true }}
            />
            <Box display='flex' alignItems='center'>
              <Box width='100%' mr={1}>
                <LinearProgress variant='determinate' value={progress} />
              </Box>
              <Box minWidth={35}>
                <Typography variant='body2' color='textSecondary'>
                  {progress}%
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} className={classes.formItem}>
            <TextField
              id='event-title'
              name='title'
              label='Event Title'
              inputProps={{ maxLength: 70 }}
              helperText='Max 11 words'
              type='text'
              inputRef={register}
              fullWidth
              autoComplete='off'
            />
          </Grid>
          <Grid item xs={12} className={classes.formItem}>
            <TextField
              id='event-description'
              name='description'
              label='Event Description'
              helperText='Describe the Event'
              type='text'
              inputRef={register}
              multiline
              rows={4}
              variant='filled'
              fullWidth
              autoComplete='off'
            />
          </Grid>
          <Grid item xs={6} className={classes.formItem}>
            <TextField
              id='event-start-date'
              name='startDate'
              label='Start Date'
              type='date'
              inputRef={register}
              InputLabelProps={{ shrink: true }}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={6} className={classes.formItem}>
            <TextField
              id='event-end-date'
              name='endDate'
              label='End Date'
              type='date'
              inputRef={register}
              InputLabelProps={{ shrink: true }}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={6} className={classes.formItem}>
            <TextField
              id='event-start-time'
              name='startTime'
              label='Start Time'
              type='time'
              inputRef={register}
              InputLabelProps={{ shrink: true }}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={6} className={classes.formItem}>
            <TextField
              id='event-end-time'
              name='endTime'
              label='End Time'
              type='time'
              inputRef={register}
              InputLabelProps={{ shrink: true }}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12} className={classes.formItem} align='center'>
            <Button type='submit' disabled={!imageURL.hasDownloaded}>
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    );
  };

  return (
    <>
      <Button
        variant='contained'
        onClick={handleClickOpen}
        startIcon={<AddIcon />}
        className={classes.newPostButton}
      >
        Add new Event
      </Button>
      <Dialog open={open} scroll={"paper"}>
        <Toolbar>
          <Typography variant='h5'>Post to Clava's Events</Typography>
          <div style={{ flexGrow: 1 }} />
          <IconButton
            onClick={() => {
              handleClose();
            }}
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
        <DialogContent>{newEvent()}</DialogContent>
      </Dialog>
    </>
  );
}
