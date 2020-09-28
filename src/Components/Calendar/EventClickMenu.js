import React, { useState } from "react";
import {
  Dialog,
  IconButton,
  Toolbar,
  Tabs,
  Tab,
  Paper,
  DialogContent,
  Grid,
  Typography,
  makeStyles,
  TextField,
  Button,
} from "@material-ui/core";
import { v4 as uuidv4 } from "uuid";
import { CloseIcon } from "../Icons";

const useStyles = makeStyles({
  gridItem: {
    padding: "10px 20px 15px 20px",
  },
  itemSpacing: {
    padding: "10px 20px 10px 20px",
    margin: "15px 0px 15px 0px",
  },
});

export default function EventClickMenu({ toggle, eventElem, Event }) {
  const [tabVal, setTabVal] = useState(0);
  const open = Boolean(eventElem);
  const classes = useStyles();

  const handleMenuClose = () => {
    toggle(null);
  };

  const handleTabChange = (event, newValue) => {
    setTabVal(newValue);
  };

  const getTime = (dateStr) => {
    let date = new Date(dateStr);
    return `${date.getHours()}:${
      String(date.getMinutes()).length === 1
        ? `0${date.getMinutes()}`
        : date.getMinutes()
    }`;
  };

  const getDate = (dateStr, isEnd) => {
    const options = {
      weekday: "short",
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    let date = new Date(dateStr);
    if (isEnd) {
      date.setDate(date.getDate() - 1);
    }
    return date.toLocaleDateString(undefined, options);
  };

  const toProperCase = (string) => {
    return string.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };

  return (
    <Dialog open={open} onClose={handleMenuClose} scroll={"paper"}>
      <Toolbar>
        <Tabs value={tabVal} onChange={handleTabChange}>
          <Tab label='Event Details' />
          <Tab label='Delete Event' />
        </Tabs>
        <div style={{ flexGrow: 1 }} />
        <IconButton onClick={handleMenuClose} color='secondary'>
          <CloseIcon />
        </IconButton>
      </Toolbar>
      <DialogContent>
        <TabPanel value={tabVal} index={0}>
          <EventDetails
            title={toProperCase(Event.title)}
            description={Event.extendedProps.description}
            startDate={getDate(Event.extendedProps.eventStart, false)}
            endDate={getDate(Event.extendedProps.eventEnd, true)}
            startTime={getTime(Event.start)}
            endTime={getTime(Event.end)}
          />
        </TabPanel>
        <TabPanel value={tabVal} index={1}>
          <Grid item xs={12} align='center'>
            <Typography variant='h5'>{"Delete this Event?"}</Typography>
          </Grid>
          <Grid item xs={12}>
            <ul>
              <li key={uuidv4()}>The Event Tag Will Be Removed</li>
              <li key={uuidv4()}>All Event Data Will Lost</li>
              <li key={uuidv4()}>Click DELETE To Remove Event</li>
            </ul>
          </Grid>
          <Grid item xs={12} className={classes.gridItem} align='center'>
            <Button
              fullWidth
              onClick={() => {
                Event.remove();
                handleMenuClose();
              }}
            >
              DELETE
            </Button>
          </Grid>
        </TabPanel>
      </DialogContent>
    </Dialog>
  );
}

function TabPanel({ children, value, index }) {
  return (
    <Paper role='tabpanel' square hidden={value !== index}>
      <Grid container alignItems='center' justify='space-evenly'>
        {children}
      </Grid>
    </Paper>
  );
}

function EventDetails(props) {
  const classes = useStyles();
  const { title, description, startDate, endDate, startTime, endTime } = props;

  return (
    <>
      <Grid item xs={12} align='center'>
        <Typography className={classes.itemSpacing} variant='h4'>
          {title}
        </Typography>
      </Grid>
      <Grid item xs={12} className={classes.gridItem} align='center'>
        {description}
      </Grid>
      <Grid item xs={6} className={classes.gridItem}>
        <TextField
          label='Event Start'
          variant='outlined'
          fullWidth
          value={startDate}
          InputProps={{ readOnly: true }}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={6} className={classes.gridItem}>
        <TextField
          label='Event End'
          variant='outlined'
          fullWidth
          value={endDate !== "" ? endDate : "unspecified"}
          InputProps={{ readOnly: true }}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={6} className={classes.gridItem}>
        <TextField
          label='Start Time'
          variant='outlined'
          fullWidth
          value={startTime !== "" ? startTime : "unspecified"}
          InputProps={{ readOnly: true }}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={6} className={classes.gridItem}>
        <TextField
          label='End Time'
          variant='outlined'
          fullWidth
          value={endTime !== "" ? endTime : "unspecified"}
          InputProps={{ readOnly: true }}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
    </>
  );
}
