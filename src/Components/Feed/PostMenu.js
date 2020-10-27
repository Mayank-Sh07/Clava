import React from "react";
import EditPost from "./EditPost";
import { useSnackbar } from "notistack";
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
  const { enqueueSnackbar } = useSnackbar();

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

  const deletePost = (id) => {
    Firebase.deletePost(id)
      .then(() => enqueueSnackbar("Post Deleted Successfully!"))
      .catch(() => enqueueSnackbar("Could not Delete Post, please try again"));
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
          <Button onClick={() => deletePost(post.id)} color='primary' autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
