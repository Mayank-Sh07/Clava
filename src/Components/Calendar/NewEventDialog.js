import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import {
  makeStyles,
  Dialog,
  Toolbar,
  Typography,
  IconButton,
  DialogContent,
  TextField,
  Grid,
} from "@material-ui/core";
import { CloseIcon, PlusIcon } from "../Icons";

const useStyles = makeStyles((theme) => ({
  formItem: {
    padding: "10px 20px 10px 20px",
  },
}));

export default function NewEventDialog({
  toggle,
  selectInfo,
  currentUser,
  enqueueSnackbar,
}) {
  const { register, handleSubmit } = useForm();
  const [open, setOpen] = useState(true);
  const classes = useStyles();
  const handleClose = () => {
    setOpen(false);
    toggle(null);
  };

  const toProperCase = (string) => {
    return string.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };

  const uploadUserEvent = (eventData) => {
    currentUser.userDoc
      .collection("userEvents")
      .doc(eventData.id)
      .set(eventData)
      .then(() => enqueueSnackbar("Event successfully added!"))
      .catch(() => enqueueSnackbar("Error while linking Event to user"));
  };

  const alterDate = (date, op) => {
    date.setDate(date.getDate() + Number(op));
    return date.toISOString().substr(0, 10);
  };

  const handleEventDetails = (data) => {
    const eventData = {
      id: uuidv4(),
      startRecur: selectInfo.start,
      endRecur: selectInfo.end,
      extendedProps: {
        eventStart: selectInfo.start,
        eventEnd: alterDate(new Date(selectInfo.end), -1),
        description: data.description,
      },
      startTime: data.startTime,
      endTime: data.endTime,
      title: toProperCase(data.title),
    };
    selectInfo.calendar.addEvent(eventData);
    console.log(eventData);
    uploadUserEvent(eventData);
    toggle(null);
  };

  return (
    <Dialog open={open}>
      <Toolbar>
        <Typography variant='h5'>Event details</Typography>
        <div style={{ flexGrow: 1 }} />
        <IconButton onClick={handleClose} color='secondary'>
          <CloseIcon />
        </IconButton>
      </Toolbar>
      <DialogContent>
        <form onSubmit={handleSubmit((data) => handleEventDetails(data))}>
          <Grid container alignItems='center' justify='space-evenly'>
            <Grid item xs={12} className={classes.formItem}>
              <TextField
                id='event-title'
                name='title'
                label='Event Title'
                type='text'
                inputRef={register}
                required
                fullWidth
                autoComplete='off'
              />
            </Grid>
            <Grid item xs={12} className={classes.formItem}>
              <TextField
                id='event-description'
                name='description'
                label='Event Description'
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
                id='start-time'
                name='startTime'
                label='Event Start'
                type='time'
                inputRef={register}
                InputLabelProps={{ shrink: true }}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={6} className={classes.formItem}>
              <TextField
                id='end-time'
                name='endTime'
                label='Event End'
                type='time'
                inputRef={register}
                InputLabelProps={{ shrink: true }}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12} className={classes.formItem}>
              <IconButton size='medium' type='submit'>
                <PlusIcon />
              </IconButton>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
    </Dialog>
  );
}
