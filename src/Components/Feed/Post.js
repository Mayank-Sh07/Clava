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
    height: 0,
    paddingTop: "100%",
    objectFit: "contain",
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
}));

export default function Post({ post, userPost }) {
  console.log(userPost);
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={<Avatar className={classes.avatar}>{post.userName}</Avatar>}
        action={userPost ? <PostMenu post={post} /> : <></>}
        title={post.userName}
        subheader={post.date}
      />
      <CardMedia className={classes.media} image={post.imageURL} />
      <CardContent>
        <Typography variant='body2' color='textSecondary' component='p'>
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
          <Typography paragraph>{post.description}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
