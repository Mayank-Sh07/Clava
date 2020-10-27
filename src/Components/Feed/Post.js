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
} from "@material-ui/core";
import { ExpandIcon } from "../Icons";
import PostMenu from "./PostMenu";

const useStyles = makeStyles((theme) => ({
  card: {
    marginTop: "30px",
  },
  media: {
    width: "100%",
    height: 550,
    [theme.breakpoints.only("sm")]: {
      height: 450,
    },
    [theme.breakpoints.only("xs")]: {
      height: 300,
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
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

export default function Post({ post, isUserPost }) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar
            className={clsx(classes.avatar, classes.large)}
            src={post.avatarPhotoURL}
          />
        }
        action={isUserPost ? <PostMenu post={post} /> : <></>}
        title={post.userName}
        titleTypographyProps={{ variant: "h5" }}
        subheader={post.date}
      />
      <CardMedia
        component='img'
        className={classes.media}
        src={post.imageURL}
      />
      <CardContent>
        <Typography variant='h6' color='textSecondary' component='p'>
          {post.caption}
        </Typography>
      </CardContent>

      <CardActions disableSpacing>
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
          <Typography variant='body1' paragraph>
            {post.description}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
