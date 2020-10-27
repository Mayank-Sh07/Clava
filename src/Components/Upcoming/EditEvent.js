import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { FirebaseContext } from "../Firebase";
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
} from "@material-ui/core";
import { CloseIcon, EditIcon } from "../Icons";

const useStyles = makeStyles((theme) => ({
  formItem: {
    padding: "10px 20px 10px 20px",
  },
  card: {
    marginTop: "30px",
  },
  media: {
    height: 0,
    paddingTop: "100%",
    objectFit: "contain",
  },
}));

export default function EditEvent({ Event }) {
  const [open, setOpen] = useState(false);
  const { register, handleSubmit } = useForm();
  const Firebase = useContext(FirebaseContext);
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

  function handleSubmittedDetails(data) {
    let newEventData = {
      id: Event.id,
      startRecur:
        !!data.startDate || data.startDate !== ""
          ? data.startDate
          : Event.startRecur,
      endRecur:
        !!data.endDate || data.endDate !== ""
          ? alterDate(new Date(data.endDate), 1)
          : Event.endRecur,
      startTime: data.startTime,
      endTime: data.endTime,
      title: data.title,
      extendedProps: {
        eventStart:
          !!data.startDate || data.startDate !== ""
            ? data.startDate
            : Event.extendedProps.eventStart,
        eventEnd:
          !!data.endDate || data.endDate !== ""
            ? data.endDate
            : Event.extendedProps.eventEnd,
        description: data.description,
      },
    };

    Firebase.firestore()
      .collection("events")
      .doc(Event.id)
      .update({ eventData: newEventData })
      .then(() => enqueueSnackbar("Event Updated!"))
      .catch((err) => {
        console.log(err);
        enqueueSnackbar("Error while Updating Event, please try again");
      });
  }

  const editEventForm = () => {
    return (
      <form onSubmit={handleSubmit((data) => handleSubmittedDetails(data))}>
        <Grid container alignItems='center' justify='space-evenly'>
          <Grid item xs={12} className={classes.formItem}>
            <TextField
              id='edit-event-title'
              name='title'
              label='New Event Title'
              defaultValue={Event.title}
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
              id='edit-event-description'
              name='description'
              label='New Event Description'
              defaultValue={Event.extendedProps.description}
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
              id='edit-event-start-date'
              name='startDate'
              label='New Start Date'
              type='date'
              value={Event.extendedProps.startDate}
              inputRef={register}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
          </Grid>
          <Grid item xs={6} className={classes.formItem}>
            <TextField
              id='edit-event-end-date'
              name='endDate'
              label='New End Date'
              type='date'
              value={Event.extendedProps.endDate}
              inputRef={register}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
          </Grid>
          <Grid item xs={6} className={classes.formItem}>
            <TextField
              id='edit-event-start-time'
              name='startTime'
              label='New Start Time'
              type='time'
              defaultValue={Event.startTime}
              inputRef={register}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
          </Grid>
          <Grid item xs={6} className={classes.formItem}>
            <TextField
              id='edit-event-end-time'
              name='endTime'
              label='New End Time'
              type='time'
              defaultValue={Event.endTime}
              inputRef={register}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} className={classes.formItem} align='center'>
            <Button type='submit'>Update</Button>
          </Grid>
        </Grid>
      </form>
    );
  };

  return (
    <>
      <IconButton
        onClick={(event) => {
          handleClickOpen(event);
        }}
      >
        <EditIcon />
      </IconButton>
      <Dialog open={open} scroll={"paper"}>
        <Toolbar>
          <Typography variant='h5'>Edit Event Details</Typography>
          <div style={{ flexGrow: 1 }} />
          <IconButton
            onClick={() => {
              handleClose();
            }}
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
        <DialogContent>{editEventForm()}</DialogContent>
      </Dialog>
    </>
  );
}
