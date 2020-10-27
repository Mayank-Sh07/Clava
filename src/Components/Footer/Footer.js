import React from "react";
import {
  makeStyles,
  Grid,
  Button,
  IconButton,
  Avatar,
} from "@material-ui/core";
import {
  Mail,
  Phone,
  Instagram,
  Facebook,
  YouTube,
  Twitter,
  LinkedIn,
} from "@material-ui/icons";
import TreeViewList from "../TreeView/TreeView";

const useStyles = makeStyles((theme) => ({
  footerContainer: {
    backgroundColor: theme.palette.primary.main,
    padding: "40px",
    [theme.breakpoints.only("xs")]: {
      padding: "20px",
    },
  },
  socialIcons: {
    [theme.breakpoints.only("xs")]: {
      display: "flex",
      justifyContent: "space-evenly",
    },
  },
}));

const list1 = {
  head: "Venue Types",
  nodes: ["banquets", "resorts", "pubs", "hotels"],
};

const list2 = {
  head: "Premium Services",
  nodes: ["private jets", "cruise ships", "yatchs"],
};

const list3 = {
  head: "Services Provided",
  nodes: [
    "disc jockey (DJ)",
    "photographers",
    "make-up artists",
    "mehandi artists",
    "florists",
    "decorators",
    "caterers",
    "+ more...",
  ],
};

function HomeServices() {
  const classes = useStyles();
  return (
    <div className={classes.footerContainer}>
      <Grid
        container
        alignItems='flex-start'
        justify='space-evenly'
        spacing={4}
      >
        <Grid item xs={6} sm={4}>
          <TreeViewList listData={list1} />
          <TreeViewList listData={list2} />
        </Grid>
        <Grid item xs={6} sm={4}>
          <TreeViewList listData={list3} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Grid item container direction='column' alignItems='center'>
            <Grid item xs={12}>
              <img src='imgs/vflogo.PNG' alt='Venuefy' />
            </Grid>
            <Grid item xs={6} sm={12}>
              <Button startIcon={<Mail />}>info@venuefy.in</Button>
            </Grid>
            <Grid item xs={6} sm={12}>
              <Button startIcon={<Phone />}>+91 90079-67777</Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={8} className={classes.socialIcons}>
          <a
            href='https://www.facebook.com/venuefy'
            target='_blank'
            rel='noopener noreferrer'
          >
            <IconButton>
              <Avatar>
                <Facebook />
              </Avatar>
            </IconButton>
          </a>
          <a
            href='https://www.instagram.com/venuefy'
            target='_blank'
            rel='noopener noreferrer'
          >
            <IconButton>
              <Avatar>
                <Instagram />
              </Avatar>
            </IconButton>
          </a>
          <a
            href='https://www.linkedin.com/company/venuefy/'
            target='_blank'
            rel='noopener noreferrer'
          >
            <IconButton>
              <Avatar>
                <LinkedIn />
              </Avatar>
            </IconButton>
          </a>
          <a
            href='https://www.youtube.com/channel/UCN9YvB4PzFtlNazmnaJUrAA'
            target='_blank'
            rel='noopener noreferrer'
          >
            <IconButton>
              <Avatar>
                <YouTube />
              </Avatar>
            </IconButton>
          </a>
          <a
            href='https://www.twitter.com/venuefy'
            target='_blank'
            rel='noopener noreferrer'
          >
            <IconButton>
              <Avatar>
                <Twitter />
              </Avatar>
            </IconButton>
          </a>
        </Grid>
        <Grid item xs={12} sm={4} align='center'>
          <a
            href='https://www.wdievents.in/'
            target='_blank'
            rel='noopener noreferrer'
          >
            <img
              src='https://static.wixstatic.com/media/0cbda3_6d68eb4cafc241d08c837a2bfd5021b4~mv2.jpg/v1/fill/w_364,h_89,al_c,q_80,usm_0.66_1.00_0.01/0001%2520(3)_edited.webp'
              alt='WDI Events'
              height='70px'
              width='180px'
            />
          </a>
        </Grid>
      </Grid>
    </div>
  );
}

export default HomeServices;
