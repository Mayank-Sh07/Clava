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
    margin: "10px 25px",
  },
}));

export default function GalleryUpload({ picID }) {
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

  const handleUpload = (event) => {
    let selectedFile = event.target.files[0];
    const uploadTask = Firebase.storage()
      .ref(`Gallery/${picID}`)
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
          .ref("Gallery")
          .child(picID)
          .getDownloadURL()
          .then((url) => {
            setImageURL({ URL: url, hasDownloaded: true });
            enqueueSnackbar("Picture uploaded Successfully!");
          })
          .catch((err) => {
            console.log(err);
            enqueueSnackbar("Picture upload failed, please try again.");
          });
      }
    );
  };

  function handlePicPostDetails(data) {
    let picDetails = {
      id: picID,
      timestamp: Firebase.firestore.FieldValue.serverTimestamp(),
      userName: currentUser.firstName,
      uploadDate: new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
      }).format(new Date()),
      imageURL: imageURL.URL,
      title: data.title,
      eventName: data.event,
      dateTaken: data.date,
    };

    Firebase.firestore()
      .collection("gallery")
      .doc(picID)
      .set(picDetails)
      .then(() => enqueueSnackbar("Picture Posted!"))
      .catch(() =>
        enqueueSnackbar("Error while posting Picture, please try again.")
      );
    handleClose();
  }

  const newPicture = () => {
    return (
      <form onSubmit={handleSubmit((data) => handlePicPostDetails(data))}>
        <Grid container alignItems='center' justify='space-evenly'>
          <Grid item xs={12} className={classes.formItem}>
            <TextField
              id='pic-upload'
              name='image'
              label='Gallery Picture'
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
              id='gallery-title'
              name='title'
              label='Picture Title'
              inputProps={{ maxLength: 70 }}
              helperText='Max 10 words'
              type='text'
              inputRef={register}
              fullWidth
              autoComplete='off'
            />
          </Grid>
          <Grid item xs={6} className={classes.formItem}>
            <TextField
              id='picture-event'
              name='event'
              label='Event Name'
              helperText='Event where picture was taken'
              type='text'
              inputRef={register}
              fullWidth
              autoComplete='off'
            />
          </Grid>
          <Grid item xs={6} className={classes.formItem}>
            <TextField
              id='pic-date'
              name='date'
              label='Date'
              type='date'
              inputRef={register}
              helperText='Date when picture was taken'
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
        Add new Picture
      </Button>
      <Dialog open={open} scroll={"paper"}>
        <Toolbar>
          <Typography variant='h5'>Post to Clava's Gallery</Typography>
          <div style={{ flexGrow: 1 }} />
          <IconButton
            onClick={() => {
              handleClose();
            }}
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
        <DialogContent>{newPicture()}</DialogContent>
      </Dialog>
    </>
  );
}
