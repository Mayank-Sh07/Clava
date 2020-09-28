import React, { useContext } from "react";
import { FirebaseContext } from "./init";
import { useHistory } from "react-router-dom";
import {
  Button,
  IconButton,
  Toolbar,
  Dialog,
  DialogContent,
  DialogContentText,
  Slide,
  Typography,
} from "@material-ui/core";
import { GoogleIcon, CloseIcon, SecurityIcon } from "../Icons";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const handleLogin = (Firebase, history) => {
  Firebase.doSignInWithGoogle();
};

export default function LoginDialog({ redirect, accessDenied }) {
  const Firebase = useContext(FirebaseContext);
  const history = useHistory();
  const [open, setOpen] = React.useState(true);
  const handleClose = () => {
    setOpen(false);
    if (redirect) history.push("/");
  };

  return (
    <>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        transitionDuration={1000}
        keepMounted
        onClose={handleClose}
      >
        {!!accessDenied ? (
          <>
            <Toolbar>
              <SecurityIcon style={{ fontSize: 30, marginRight: 25 }} />
              <Typography variant='h5'>Unauthorised User</Typography>
              <div style={{ flexGrow: 1 }} />
              <IconButton
                onClick={() => {
                  handleClose();
                }}
                color='secondary'
              >
                <CloseIcon />
              </IconButton>
            </Toolbar>
            <DialogContent>
              <Typography variant='h3'>Access Denied</Typography>
            </DialogContent>
          </>
        ) : (
          <>
            <Toolbar>
              <GoogleIcon
                height='32px'
                width='32px'
                style={{ margin: "0px 16px 0px 16px" }}
              />

              <Typography variant='h4'>Sign in to Clava</Typography>
              <div style={{ flexGrow: 1 }} />
              <IconButton
                onClick={() => {
                  handleClose();
                }}
                color='secondary'
              >
                <CloseIcon />
              </IconButton>
            </Toolbar>
            <DialogContent>
              <DialogContentText>
                <Typography variant='h6'>
                  Select your <b>'@vitstudent.ac.in'</b> account to Sign in.
                </Typography>
              </DialogContentText>
            </DialogContent>
            <Toolbar>
              <Button
                onClick={() => {
                  handleClose();
                  handleLogin(Firebase, history);
                }}
                color='secondary'
                variant='contained'
                fullWidth
              >
                Sign in
              </Button>
            </Toolbar>
          </>
        )}
      </Dialog>
    </>
  );
}
