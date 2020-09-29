import React from "react";
import EditPost from "./EditPost";
import {
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  Button,
} from "@material-ui/core";
import { MoreIcon, DeleteIcon } from "../Icons";
import { FirebaseContext } from "../Firebase";

export default function PostMenu({ post }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const Firebase = React.useContext(FirebaseContext);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const openDeleteMenu = () => {
    setOpen(true);
    handleClose();
  };
  const closeDeleteMenu = () => {
    setOpen(false);
    handleClose();
  };

  const deletePost = (id, url) => {
    Firebase.firestore().collection("posts").doc(post.id).delete();

    Firebase.storage()
      .ref("Posts")
      .child(id)
      .delete()
      .then(() => alert("deleteed from storage"))
      .catch((err) => alert(err));
  };

  return (
    <>
      <IconButton onClick={handleClick}>
        <MoreIcon />
      </IconButton>
      <Menu
        id='post-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <EditPost post={post} close={handleClose} />
        <MenuItem
          onClick={() => {
            openDeleteMenu();
            handleClose();
          }}
        >
          <DeleteIcon />
          Delete
        </MenuItem>
      </Menu>
      <Dialog open={open} onClose={closeDeleteMenu}>
        <DialogTitle>Delete this Post?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            The Selected Post will be deleted Permanentely.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteMenu} color='primary'>
            Disagree
          </Button>
          <Button
            onClick={() => deletePost(post.id, post.imageURL)}
            color='primary'
            autoFocus
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
