import React from "react";
import Waves from "../Svg/Waves";
import SideDrawer from "./Sidebar";
import clsx from "clsx";
import { useHistory } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { FirebaseContext, UserContext } from "../Firebase";
import { ClavaThemeContext } from "../../Theme/ClavaThemeProvider";
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
  useTheme,
} from "@material-ui/core";
import {
  AccountIcon,
  ProfileIcon,
  LogoutIcon,
  DarkThemeIcon,
  LightThemeIcon,
  AboutIcon,
  HomeIcon,
  GalleryIcon,
  NotificationsIcon,
  KeyboardArrowUpIcon,
} from "../Icons";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuSpacing: {
    marginRight: theme.spacing(2.15),
  },
  menuSpacingMobile: {
    marginRight: theme.spacing(1.2),
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
    zIndex: 1500,
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
    padding: "8px 5px 8px 5px",
  },
}));

function ScrollToTop() {
  const classes = useStyles();
  const trigger = useScrollTrigger();
  const handleClick = (event) => {
    const anchor = document.querySelector("#back-to-top-anchor");
    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };
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

export default function Navbar(props) {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();
  const Firebase = React.useContext(FirebaseContext);
  const { currentUser } = React.useContext(UserContext);
  const { currentTheme, setTheme } = React.useContext(ClavaThemeContext);
  const isDark = Boolean(currentTheme === "dark");
  const [anchor, setAnchor] = React.useState(false);
  const [value, setValue] = React.useState(undefined);
  console.log(currentUser);
  const menuTabs = [
    { tag: "Home", icon: <HomeIcon /> },
    { tag: "About", icon: <AboutIcon /> },
    { tag: "Gallery", icon: <GalleryIcon /> },
  ];

  const profileMenu = (
    <Menu
      anchorEl={anchor}
      id={uuidv4()}
      keepMounted
      open={anchor}
      TransitionComponent={Grow}
      transitionDuration={300}
      onClose={() => handleMenuClick(null)}
    >
      <MenuItem onClick={() => handleMenuClick("/Profile")}>
        <ProfileIcon />
        <p>Profile</p>
      </MenuItem>
      <MenuItem
        onClick={() => {
          Firebase.doSignOut();
          handleMenuClick(null);
        }}
      >
        <LogoutIcon />
        <p> Logout</p>
      </MenuItem>
    </Menu>
  );

  const handleProfileMenuOpen = (event) => {
    setAnchor(event.currentTarget);
  };

  const handleMenuClick = (url) => {
    setAnchor(false);
    if (url !== null) {
      history.push(url);
      setValue(null);
    }
  };

  const handleIconClick = (url) => {
    if (url !== null) history.push(url);
  };

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.grow} id='back-to-top-anchor'>
      <AppBar elevation={0}>
        <Toolbar disableGutters>
          <SideDrawer
            handleMenuClick={handleMenuClick}
            currentUser={currentUser}
            Firebase={Firebase}
          />
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
              {menuTabs.map((item) => (
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
              onClick={(event) => {
                !!currentUser
                  ? handleProfileMenuOpen(event)
                  : Firebase.doSignInWithGoogle();
              }}
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
              {menuTabs.map((item) => (
                <Tab
                  icon={item.icon}
                  value={item.tag}
                  classes={{
                    root: clsx(classes.mobileTab, classes.menuSpacingMobile),
                  }}
                  onClick={() => handleIconClick(item.tag)}
                />
              ))}
            </Tabs>
            <IconButton
              color='inherit'
              className={clsx(classes.mobileIcon, classes.menuSpacingMobile)}
              onClick={() => {
                isDark ? setTheme("light") : setTheme("dark");
              }}
            >
              {isDark ? <LightThemeIcon /> : <DarkThemeIcon />}
            </IconButton>
            <IconButton
              edge='end'
              onClick={(event) => {
                !!currentUser
                  ? handleProfileMenuOpen(event)
                  : Firebase.doSignInWithGoogle();
              }}
              color='inherit'
              className={clsx(classes.mobileIcon, classes.menuSpacingMobile)}
            >
              <AccountIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Waves color={theme.palette.primary.main} />
      <ScrollToTop />
      {profileMenu}
    </div>
  );
}
