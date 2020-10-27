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
}));

export default function PostUpload({ postID }) {
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
      .ref(`Posts/${postID}`)
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
          .ref("Posts")
          .child(postID)
          .getDownloadURL()
          .then((url) => {
            setImageURL({ URL: url, hasDownloaded: true });
            enqueueSnackbar("Image uploaded Successfully!");
          })
          .catch((err) => {
            console.log(err);
            enqueueSnackbar("Image upload failed, please try again.");
          });
      }
    );
  };

  function handleEventPostDetails(data) {
    let postData = {
      id: postID,
      timestamp: Firebase.firestore.FieldValue.serverTimestamp(),
      userName: currentUser.firstName,
      userId: currentUser.uid,
      date: new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
      }).format(new Date()),
      imageURL: imageURL.URL,
      caption: data.caption,
      description: data.description,
      avatarPhotoURL: currentUser.photoURL,
    };
    Firebase.addPost(postID, postData)
      .then(() => enqueueSnackbar("Post Uploaded!"))
      .catch(() =>
        enqueueSnackbar("Error while uploading Post, please try again.")
      );
    setImageURL({ URL: null, hasDownloaded: false });
    handleClose();
  }

  const NewPost = () => {
    return (
      <form onSubmit={handleSubmit((data) => handleEventPostDetails(data))}>
        <Grid container alignItems='center' justify='space-evenly'>
          <Grid item xs={12} className={classes.formItem}>
            <TextField
              id='post-upload'
              name='image'
              label='Image'
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
              id='post-caption'
              name='caption'
              label='Caption'
              inputProps={{ maxLength: 300 }}
              helperText='Max 50 words'
              type='text'
              inputRef={register}
              fullWidth
              autoComplete='off'
            />
          </Grid>
          <Grid item xs={12} className={classes.formItem}>
            <TextField
              id='post-description'
              name='description'
              label='Description'
              helperText='Add a suitable description'
              type='text'
              inputRef={register}
              multiline
              rows={4}
              variant='filled'
              fullWidth
              autoComplete='off'
            />
          </Grid>
          <Grid item xs={12} className={classes.formItem} align='center'>
            <Button type='submit' disabled={!imageURL.hasDownloaded}>
              POST
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
      >
        Add new Post
      </Button>
      <Dialog open={open} scroll={"paper"}>
        <Toolbar>
          <Typography variant='h5'>Post to Clava's Feed</Typography>
          <div style={{ flexGrow: 1 }} />
          <IconButton
            onClick={() => {
              handleClose();
            }}
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
        <DialogContent>{NewPost()}</DialogContent>
      </Dialog>
    </>
  );
}
