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
    margin: "0 15px 0 15px",
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
  const signIn = () => {
    Firebase.doSignInWithGoogle();
    closeDrawer();
  };
  const signOut = () => {
    Firebase.doSignOut();
    closeDrawer();
  };
  // const listItems = [
  //   { icon: <FeedIcon />, tag: "Dashboard", adminOnly: true, default: true },
  //   { icon: <EventsIcon />, tag: "Upcoming", default: false },
  //   { icon: <FeedIcon />, tag: "Feed", default: false },
  //   { icon: <BlogIcon />, tag: "Blog", default: false },
  //   {
  //     icon: <CalendarIcon />,
  //     tag: "Calendar",
  //     memberOnly: true,
  //     default: true,
  //   },
  //   {
  //     icon: <AttendanceIcon />,
  //     tag: "Attendance",
  //     memberOnly: true,
  //     default: true,
  //   },
  //   { icon: <AlumniIcon />, tag: "Alumni", default: false },
  // ];

  // const checkAuth = (item) => {
  //   if (currentUser === null) {
  //     return item.default;
  //   } else if (!!item.adminOnly) {
  //     if (currentUser.isAdmin) return false;
  //     else return true;
  //   } else if (!!item.memberOnly) {
  //     if (currentUser.isMember || currentUser.isAdmin) return false;
  //     else return true;
  //   } else return false;
  // };
  // const listItems = [
  //   { icon: <FeedIcon />, tag: "Dashboard" },
  //   { icon: <EventsIcon />, tag: "Upcoming" },
  //   { icon: <FeedIcon />, tag: "Feed" },
  //   { icon: <BlogIcon />, tag: "Blog" },
  //   { icon: <CalendarIcon />, tag: "Calendar" },
  //   { icon: <AttendanceIcon />, tag: "Attendance" },
  //   { icon: <AlumniIcon />, tag: "Alumni" },
  // ];

  const sidebarItems = (currentUser) => {
    if (currentUser === null) {
      return [
        { icon: <EventsIcon />, tag: "Upcoming" },
        { icon: <AlumniIcon />, tag: "Alumni" },
      ];
    } else if (currentUser.isAdmin) {
      return [
        { icon: <FeedIcon />, tag: "Dashboard" },
        { icon: <EventsIcon />, tag: "Upcoming" },
        { icon: <FeedIcon />, tag: "Feed" },
        { icon: <BlogIcon />, tag: "Blog" },
        { icon: <CalendarIcon />, tag: "Calendar" },
        { icon: <AttendanceIcon />, tag: "Attendance" },
        { icon: <AlumniIcon />, tag: "Alumni" },
      ];
    } else if (currentUser.isMember) {
      return [
        { icon: <EventsIcon />, tag: "Upcoming" },
        { icon: <FeedIcon />, tag: "Feed" },
        { icon: <BlogIcon />, tag: "Blog" },
        { icon: <CalendarIcon />, tag: "Calendar" },
        { icon: <AttendanceIcon />, tag: "Attendance" },
        { icon: <AlumniIcon />, tag: "Alumni" },
      ];
    } else
      return [
        { icon: <EventsIcon />, tag: "Upcoming" },
        { icon: <FeedIcon />, tag: "Feed" },
        { icon: <BlogIcon />, tag: "Blog" },
        { icon: <CalendarIcon />, tag: "Calendar" },
        { icon: <AlumniIcon />, tag: "Alumni" },
      ];
  };

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
                <Avatar
                  className={classes.profileAvatar}
                  src={currentUser.photoURL}
                  alt={currentUser.firstName}
                />
              </ListItemAvatar>
              <ListItemText
                primary={currentUser.firstName}
                secondary={currentUser.regsNumber}
                className={classes.marginHorizontal}
              />
            </ListItem>
          ) : (
            <ListItem divider key={uuidv4()}>
              <Typography variant='h4'>Clava</Typography>
            </ListItem>
          )}
          {sidebarItems(currentUser).map((item) => (
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
              !!currentUser ? signOut() : signIn();
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
