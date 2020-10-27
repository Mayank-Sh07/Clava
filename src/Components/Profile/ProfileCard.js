import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { green } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 360,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  avatar: {
    backgroundColor: green[500],
  },
}));

export default function ProfileCard({ user }) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label='recipe' className={classes.avatar}>
            C
          </Avatar>
        }
        title={"NAME : " + user.name}
        subheader={"REGS-NO : " + user.regsNumber}
        titleTypographyProps={{ variant: "h6", align: "start" }}
        subheaderTypographyProps={{ align: "start" }}
      />
      <CardMedia className={classes.media} image={user.photoURL} title='user' />
      <CardContent>
        <Typography variant='caption'>{"USER-ID : " + user.uid}</Typography>
        <br />
        <Typography variant='caption'>{"E-MAIL : " + user.email}</Typography>
      </CardContent>
    </Card>
  );
}
