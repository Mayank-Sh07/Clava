import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { FirebaseContext } from "../Firebase";
import { useSnackbar } from "notistack";
import {
  TextField,
  Grid,
  Card,
  CardMedia,
  Dialog,
  DialogContent,
  Button,
  MenuItem,
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

export default function EditPost({ post, close }) {
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

  function handleSubmittedDetails(data) {
    let newData = {
      caption: data.caption,
      description: data.description,
    };
    Firebase.editPost(post.id, newData)
      .then(() => enqueueSnackbar("Post Updated Successfully"))
      .catch(() => enqueueSnackbar("Failed to Update Post, please try again"));
    handleClose();
  }

  const EditPost = () => {
    return (
      <form onSubmit={handleSubmit((data) => handleSubmittedDetails(data))}>
        <Grid container alignItems='center' justify='space-evenly'>
          <Grid item xs={12} className={classes.formItem}>
            <Card className={classes.card}>
              <CardMedia className={classes.media} image={post.imageURL} />
            </Card>
          </Grid>
          <Grid item xs={12} className={classes.formItem}>
            <TextField
              id='edit-post-caption'
              name='caption'
              label='New Caption'
              defaultValue={post.caption}
              inputProps={{ maxLength: 55 }}
              helperText='Max 50 words'
              type='text'
              inputRef={register}
              fullWidth
              autoComplete='off'
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} className={classes.formItem}>
            <TextField
              id='edit-post-description'
              name='description'
              label='New Description'
              defaultValue={post.description}
              helperText='Edit Post Description'
              type='text'
              inputRef={register}
              multiline
              rows={4}
              variant='filled'
              fullWidth
              autoComplete='off'
              InputLabelProps={{ shrink: true }}
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
      <MenuItem
        variant='contained'
        onClick={(event) => {
          handleClickOpen(event);
          close();
        }}
      >
        <EditIcon />
        Edit
      </MenuItem>
      <Dialog open={open} scroll={"paper"}>
        <Toolbar>
          <Typography variant='h5'>Edit Post Details</Typography>
          <div style={{ flexGrow: 1 }} />
          <IconButton
            onClick={() => {
              handleClose();
            }}
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
        <DialogContent>{EditPost()}</DialogContent>
      </Dialog>
    </>
  );
}
