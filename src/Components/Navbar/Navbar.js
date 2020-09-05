import React from "react";
// Hook to use history object from Router
import { useHistory } from "react-router-dom";
// To apply multiple classes
import clsx from "clsx";
// Function to Generate unique ID's
import { v4 as uuidv4 } from "uuid";
// Theme Context
import { ClavaThemeContext } from "../../Theme/ClavaThemeProvider";
// Style for Appbar
import Waves from "../Svg/Waves";
//
import SideDrawer from "./Sidebar";
// MUI Core Components
import {
  makeStyles,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Grow,
  useScrollTrigger,
  Zoom,
  Fab,
  Tabs,
  Tab,
} from "@material-ui/core";

// MUI Icons
import AccountIcon from "@material-ui/icons/AccountCircle";
import ProfileIcon from "@material-ui/icons/PersonSharp";
import LogoutIcon from "@material-ui/icons/ExitToAppSharp";
import DarkThemeIcon from "@material-ui/icons/Brightness4";
import LightThemeIcon from "@material-ui/icons/Brightness7";
import AboutIcon from "@material-ui/icons/InfoOutlined";
import HomeIcon from "@material-ui/icons/Home";
import GalleryIcon from "@material-ui/icons/PhotoSizeSelectActual";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MenuIcon from "@material-ui/icons/MoreVert";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

// JSS Styles Used
const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuSpacing: {
    marginRight: theme.spacing(2.15),
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  root: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  tab: {
    minWidth: 95,
    width: 95,
  },
  mobileTab: {
    minWidth: 0,
    width: 0,
  },
  mobileIcon: {
    padding: "12px 0px 12px 0px",
  },
}));

// Function to Return to Top on Scroll
function ScrollToTop() {
  const classes = useStyles();
  // listens for the scrollbar to go below a certain scroll (default: 100px)
  const trigger = useScrollTrigger();
  // returns user back to the elements supplied ID
  const handleClick = (event) => {
    // anchor stores the element which has the ID passed in the querySelector()
    const anchor = document.querySelector("#back-to-top-anchor");
    if (anchor) {
      // scrollIntoView() is a javaScript function that auto-Scrolls to the attached element
      anchor.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  /* The Zoom Transition is used to show the pop animation of the ^ button, Fab is Floating Action Button */
  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role='presentation' className={classes.root}>
        <Fab color='secondary' size='small'>
          <KeyboardArrowUpIcon />
        </Fab>
      </div>
    </Zoom>
  );
}

// Navbar Functional Component
export default function Navbar(props) {
  const classes = useStyles();

  // Using the useHistory Hook
  const history = useHistory();

  // Context for switching themes
  const { currentTheme, setTheme } = React.useContext(ClavaThemeContext);

  // true if current theme is dark else false
  const isDark = Boolean(currentTheme === "dark");

  // Handles the Menu for screens md and above
  const [anchor, setAnchor] = React.useState(false);

  // Handles the Menu for screens sm and below
  const [mobileAnchor, setMobileAnchor] = React.useState(false);

  // Handles the selection of Tabs
  const [value, setValue] = React.useState(undefined);

  // Opens the profile Menu in Desktop view
  const handleProfileMenuOpen = (event) => {
    setAnchor(event.currentTarget);
  };

  // Closes the profile Menu in Desktop view
  const handleProfileMenuClick = (url) => {
    setAnchor(false);
    if (url !== null) {
      history.push(url);
      setValue(null);
    }
  };

  // Opens the profile Menu in Mobile view
  const handleMobileMenuOpen = (event) => {
    setMobileAnchor(event.currentTarget);
  };

  // Closes the profile Menu in Desktop view
  const handleMobileMenuClick = (url) => {
    setMobileAnchor(false);
    if (url !== null) history.push(url);
  };

  // Handles Appbar Icon Click
  const handleIconClick = (url) => {
    if (url !== null) history.push(url);
  };

  // Changes the active Tab
  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  // Desktop Appbar Tabs
  const DesktopTabs = [
    { tag: "Home", icon: <HomeIcon /> },
    { tag: "About", icon: <AboutIcon /> },
    { tag: "Gallery", icon: <GalleryIcon /> },
  ];

  // Mobile Appbar Tabs
  const MobileTabs = [
    { tag: "Home", icon: <HomeIcon /> },
    { tag: "Gallery", icon: <GalleryIcon /> },
  ];

  // All the Menu items for mobile
  const mobileMenuItems = [
    { icon: <AboutIcon />, tag: "About" },
    { icon: <ProfileIcon />, tag: "Profile" },
  ];

  // Profile Menu (Desktop)
  const profileMenu = (
    <Menu
      anchorEl={anchor}
      id={uuidv4()}
      keepMounted
      open={anchor}
      TransitionComponent={Grow}
      transitionDuration={300}
      onClose={() => handleProfileMenuClick(null)}
    >
      <MenuItem onClick={() => handleProfileMenuClick("/Profile")}>
        <ProfileIcon />
        <p>Profile</p>
      </MenuItem>
      <MenuItem>
        <LogoutIcon />
        <p> Logout</p>
      </MenuItem>
    </Menu>
  );

  // Mobile Menu
  const mobileMenu = (
    <Menu
      anchorEl={mobileAnchor}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={uuidv4()}
      keepMounted
      TransitionComponent={Grow}
      transitionDuration={500}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={mobileAnchor}
      onClose={() => handleMobileMenuClick(null)}
    >
      {mobileMenuItems.map((item) => (
        <MenuItem onClick={() => handleIconClick(item.tag)}>
          <IconButton
            disableRipple
            color='inherit'
            onClick={() => handleIconClick(item.tag)}
          >
            {item.icon}
          </IconButton>
          <p>{item.tag}</p>
        </MenuItem>
      ))}
      <MenuItem>
        <IconButton disableRipple color='inherit'>
          <LogoutIcon />
        </IconButton>
        <p>Logout</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow} id='back-to-top-anchor'>
      <AppBar elevation={0}>
        <Toolbar disableGutters>
          <SideDrawer handleIconClick={handleIconClick} />
          <Typography variant='h3' noWrap>
            Clava
          </Typography>
          <div className={classes.grow} />

          {/* Desktop View */}
          <div className={classes.sectionDesktop}>
            <Tabs
              value={value}
              onChange={handleTabChange}
              selectionFollowsFocus
              indicatorColor='secondary'
              textColor='secondary'
              TabIndicatorProps={{ style: { height: "4px" } }}
            >
              {DesktopTabs.map((item) => (
                <Tab
                  label={<Typography variant='h6'>{item.tag}</Typography>}
                  value={item.tag}
                  classes={{ root: clsx(classes.tab, classes.menuSpacing) }}
                  onClick={() => {
                    handleIconClick(item.tag);
                  }}
                />
              ))}
            </Tabs>
            <IconButton color='inherit' className={classes.menuSpacing}>
              <NotificationsIcon />
            </IconButton>
            <IconButton
              color='inherit'
              className={classes.menuSpacing}
              onClick={() => {
                isDark ? setTheme("light") : setTheme("dark");
              }}
            >
              {isDark ? <LightThemeIcon /> : <DarkThemeIcon />}
            </IconButton>
            <IconButton
              edge='end'
              onClick={handleProfileMenuOpen}
              color='inherit'
              className={classes.menuSpacing}
            >
              <AccountIcon />
            </IconButton>
          </div>

          {/* Mobile View */}
          <div className={classes.sectionMobile}>
            <Tabs
              value={value}
              onChange={handleTabChange}
              indicatorColor='secondary'
              textColor='secondary'
              TabIndicatorProps={{ style: { bottom: "6px" } }}
              variant='fullWidth'
            >
              {MobileTabs.map((item) => (
                <Tab
                  icon={item.icon}
                  value={item.tag}
                  classes={{
                    root: clsx(classes.mobileTab, classes.menuSpacing),
                  }}
                  onClick={() => handleIconClick(item.tag)}
                />
              ))}
            </Tabs>
            <IconButton
              color='inherit'
              className={clsx(classes.mobileIcon, classes.menuSpacing)}
              onClick={() => {
                isDark ? setTheme("light") : setTheme("dark");
              }}
            >
              {isDark ? <LightThemeIcon /> : <DarkThemeIcon />}
            </IconButton>
            <IconButton
              onClick={handleMobileMenuOpen}
              color='inherit'
              className={clsx(classes.mobileIcon, classes.menuSpacing)}
            >
              <MenuIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Waves color='#3f51b5' />
      <ScrollToTop />
      {mobileMenu}
      {profileMenu}
    </div>
  );
}
