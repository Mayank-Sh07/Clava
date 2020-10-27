import React from "react";
import clsx from "clsx";
import {
  makeStyles,
  Card,
  CardHeader,
  IconButton,
  Avatar,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  Typography,
  Button,
  Grid,
} from "@material-ui/core";
import { ExpandIcon } from "../Icons";
import EditEvent from "./EditEvent";

const useStyles = makeStyles((theme) => ({
  card: {
    marginTop: "30px",
  },
  media: {
    width: "100%",
    height: 720,
    [theme.breakpoints.only("sm")]: {
      height: 600,
    },
    [theme.breakpoints.only("xs")]: {
      height: 320,
    },
    objectFit: "cover",
    objectPosition: "50% 30%",
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  large: {
    width: theme.spacing(9),
    height: theme.spacing(9),
  },
}));

export default function EventPost({ eventPost, currentUser, enqueueSnackbar }) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const addEventToCalendar = () => {
    currentUser.userDoc
      .collection("userEvents")
      .doc(eventPost.id)
      .set(eventPost.eventData)
      .then(() => enqueueSnackbar("Event successfully added!"))
      .catch(() => enqueueSnackbar("Error while linking Event to user"));
  };

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar
            className={clsx(classes.avatar, classes.large)}
            src={eventPost.avatarPhotoURL}
          />
        }
        title={eventPost.userName}
        titleTypographyProps={{ variant: "h5" }}
        subheaderTypographyProps={{ variant: "body2" }}
        subheader={eventPost.date}
        action={<EditEvent Event={eventPost.eventData} />}
      />
      <CardMedia
        component='img'
        className={classes.media}
        src={eventPost.imageURL}
      />
      <CardContent>
        <Typography variant='h3' align='center' color='textSecondary'>
          {eventPost.eventData.title}
        </Typography>
        <Grid
          container
          alignItems='center'
          justify='space-around'
          style={{
            padding: "20px 0px 20px 65px",
            maxWidth: "600px",
            margin: "auto",
          }}
        >
          <Grid item xs={12} sm={6}>
            <Typography variant='subtitle1'>
              Start Date: {eventPost.eventData.extendedProps.eventStart}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant='subtitle1'>
              End Date: {eventPost.eventData.extendedProps.eventEnd}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant='subtitle1'>
              Start Time: {eventPost.eventData.startTime}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant='subtitle1'>
              End Time: {eventPost.eventData.endTime}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>

      <CardActions disableSpacing>
        <Button variant='contained' onClick={() => addEventToCalendar()}>
          Add to Calendar
        </Button>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
        >
          <ExpandIcon />
        </IconButton>
      </CardActions>

      <Collapse in={expanded} timeout='auto' unmountOnExit>
        <CardContent style={{ padding: "25px" }}>
          <Typography variant='h6' paragraph>
            {eventPost.eventData.extendedProps.description}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
