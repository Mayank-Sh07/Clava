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
} from "@material-ui/core";
import { v4 as uuidv4 } from "uuid";
import MenuIcon from "@material-ui/icons/Menu";
import ProfileIcon from "@material-ui/icons/PersonSharp";
import FeedIcon from "@material-ui/icons/Timeline";
import CalendarIcon from "@material-ui/icons/Event";
import EventsIcon from "@material-ui/icons/FormatListNumberedSharp";
import BlogIcon from "@material-ui/icons/Book";
import AlumniIcon from "@material-ui/icons/Group";
import AttendanceIcon from "@material-ui/icons/FormatShapes";
import LogoutIcon from "@material-ui/icons/ExitToAppSharp";
import EditIcon from "@material-ui/icons/Edit";

// Style Classes Used for the Components
const useStyles = makeStyles((theme) => ({
  drawer: {
    width: 230,
    height: "100vh",
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

// SIDEDRAWER Function
export default function SideDrawer({ handleIconClick }) {
  const classes = useStyles();
  // Stores the State and Anchor for the Drawer
  const [state, setState] = React.useState({ left: false });
  // Function to Toggle the Drawer
  const toggleDrawer = (anchor, open) => (event) => {
    setState({ [anchor]: open });
  };
  //
  const closeDrawer = () => {
    setState({ left: false });
  };
  //
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
                <Avatar className={classes.profileAvatar} alt='USER NAME'>
                  <ProfileIcon />
                </Avatar>
              </Badge>
            </ListItemAvatar>
            <ListItemText
              primary='User Name'
              secondary='designation'
              className={classes.marginHorizontal}
            />
          </ListItem>
          {listItems.map((item) => (
            <ListItem
              key={uuidv4()}
              button
              className={classes.drawerItem}
              onClick={() => {
                handleIconClick(item.tag);
                closeDrawer();
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
          <ListItem className={classes.drawerFooter} button>
            <LogoutIcon className={classes.marginHorizontal} />
            <ListItemText>Logout</ListItemText>
          </ListItem>
        </List>
      </Drawer>
    </React.Fragment>
  );
}
