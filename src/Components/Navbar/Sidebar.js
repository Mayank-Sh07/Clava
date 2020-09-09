import React from "react";
import {
  makeStyles,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Badge,
  Typography,
} from "@material-ui/core";
import { v4 as uuidv4 } from "uuid";
import {
  AccountIcon,
  LogoutIcon,
  MenuIcon,
  FeedIcon,
  CalendarIcon,
  EventsIcon,
  BlogIcon,
  AlumniIcon,
  AttendanceIcon,
  EditIcon,
} from "../Icons";

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: 220,
    height: "100vh",
    backgroundColor: theme.palette.primary.light,
  },
  profileAvatar: {
    width: theme.spacing(8),
    height: theme.spacing(8),
    marginLeft: 0,
  },
  roundedAvatar: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
  drawerItem: {
    marginTop: theme.spacing(2),
  },
  drawerFooter: {
    position: "absolute",
    bottom: 0,
  },
  marginHorizontal: {
    margin: "0 10px 0 10px",
  },
  badgeContent: {
    height: "20px",
    width: "20px",
    backgroundColor: theme.palette.primary.main,
  },
}));

export default function SideDrawer({ handleMenuClick, currentUser, Firebase }) {
  const classes = useStyles();
  const [state, setState] = React.useState({ left: false });
  const toggleDrawer = (anchor, open) => (event) => {
    setState({ [anchor]: open });
  };
  const closeDrawer = () => {
    setState({ left: false });
  };
  const listItems = [
    { icon: <EventsIcon />, tag: "Upcoming" },
    { icon: <FeedIcon />, tag: "Feed" },
    { icon: <BlogIcon />, tag: "Blog" },
    { icon: <CalendarIcon />, tag: "Calendar" },
    { icon: <AttendanceIcon />, tag: "Attendance" },
    { icon: <AlumniIcon />, tag: "Alumni" },
  ];

  return (
    <React.Fragment key={uuidv4()}>
      <IconButton
        key={uuidv4()}
        onClick={toggleDrawer("left", true)}
        className={classes.marginHorizontal}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        key={uuidv4()}
        anchor={"left"}
        open={state["left"]}
        onClose={toggleDrawer("left", false)}
        className={classes.drawer}
      >
        <List className={classes.drawer}>
          {!!currentUser ? (
            <ListItem divider key={uuidv4()}>
              <ListItemAvatar>
                <Badge
                  overlap='circle'
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  badgeContent={
                    <Avatar className={classes.badgeContent} alt='Edit'>
                      <EditIcon
                        style={{
                          fontSize: "15px",
                        }}
                      />
                    </Avatar>
                  }
                >
                  <Avatar
                    className={classes.profileAvatar}
                    src={currentUser.photoURL}
                    alt={currentUser.displayName}
                  />
                </Badge>
              </ListItemAvatar>
              <ListItemText
                primary={currentUser.displayName}
                className={classes.marginHorizontal}
              />
            </ListItem>
          ) : (
            <ListItem divider key={uuidv4()}>
              <Typography variant='h4'>Clava</Typography>
            </ListItem>
          )}
          {listItems.map((item) => (
            <ListItem
              key={uuidv4()}
              button
              className={classes.drawerItem}
              onClick={() => {
                closeDrawer();
                handleMenuClick(item.tag);
              }}
            >
              <ListItemAvatar>
                <Avatar variant='rounded' className={classes.roundedAvatar}>
                  {item.icon}
                </Avatar>
              </ListItemAvatar>
              <ListItemText>{item.tag}</ListItemText>
            </ListItem>
          ))}
          <ListItem
            className={classes.drawerFooter}
            button
            onClick={() => {
              !!currentUser
                ? Firebase.doSignOut()
                : Firebase.doSignInWithGoogle();
            }}
          >
            {!!currentUser ? (
              <>
                <LogoutIcon className={classes.marginHorizontal} />
                <ListItemText>Logout</ListItemText>
              </>
            ) : (
              <>
                <AccountIcon className={classes.marginHorizontal} />
                <ListItemText>Login</ListItemText>
              </>
            )}
          </ListItem>
        </List>
      </Drawer>
    </React.Fragment>
  );
}
