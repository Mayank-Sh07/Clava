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
} from "@material-ui/core";
import { ExpandIcon } from "../Icons";
import EditEvent from "./EditEvent";

const useStyles = makeStyles((theme) => ({
  card: {
    marginTop: "30px",
  },
  media: {
    width: "100%",
    height: 850,
    [theme.breakpoints.only("sm")]: {
      height: 650,
    },
    [theme.breakpoints.only("xs")]: {
      height: 350,
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
            src={currentUser.photoURL}
          >
            {/* {eventPost.userName} */}
          </Avatar>
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
        <CardContent>
          <Typography variant='h6' paragraph>
            {eventPost.eventData.extendedProps.description}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
