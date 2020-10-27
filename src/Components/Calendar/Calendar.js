/*
1) Click a date (and drag) to add Event , Show a Modal for getting all Info
2) View Details, Modify or Delete existing event by clicking
3) Button to toggle weekends on or off
4) adding state events list to state and a set Calendar method for writing to db
5) refactoring code
 */

import React, { useState, useEffect, createRef, useContext } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { UserContext, FirebaseContext } from "../Firebase";
import { Container, makeStyles, Switch } from "@material-ui/core";
import NewEventDialog from "./NewEventDialog";
import EventClickMenu from "./EventClickMenu";
import { useSnackbar } from "notistack";
import "./fc-style-overrides.css";

const useStyles = makeStyles((theme) => ({
  calendarContainer: {
    paddingTop: 20,
    paddingBottom: 30,
  },
}));

export default function Calendar() {
  const calendarRef = createRef();
  const { currentUser } = useContext(UserContext);
  const Firebase = useContext(FirebaseContext);
  const [showWeekends, toggleWeekends] = useState(true);
  const [events, setEvents] = useState(null);
  const [selectInfo, setSelectInfo] = useState(null);
  const [eventInfo, setEventInfo] = useState(null);
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();

  useEffect(() => {
    const firestoreCall = currentUser.userDoc
      .collection("userEvents")
      .onSnapshot(
        (snapShot) => {
          setEvents(snapShot.docs.map((doc) => doc.data()));
        },
        () => enqueueSnackbar("Unable to fetch Post data at the moment.")
      );

    return () => firestoreCall();
  }, []);

  const handleEventChange = (currentEvents) => {
    setEvents(currentEvents.map((event) => event.toPlainObject()));
  };

  if (events === null) {
    return <h3>Loading...</h3>;
  }

  return (
    <Container maxWidth='md' className={classes.calendarContainer}>
      <Switch
        checked={showWeekends}
        onChange={() => toggleWeekends(!showWeekends)}
      />
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridDay",
        }}
        initialView='dayGridMonth'
        weekends={showWeekends}
        editable={false}
        selectable
        selectMirror
        dayMaxEvents={1}
        initialEvents={events}
        eventsSet={handleEventChange}
        select={(info) =>
          setSelectInfo({
            start: info.startStr,
            end: info.endStr,
            calendar: info.view.calendar,
          })
        }
        eventClick={(info) => setEventInfo({ el: info.el, event: info.event })}
        contentHeight='auto'
      />
      {!!selectInfo ? (
        <NewEventDialog
          selectInfo={selectInfo}
          toggle={setSelectInfo}
          currentUser={currentUser}
          enqueueSnackbar={enqueueSnackbar}
          Firebase={Firebase}
        />
      ) : (
        <></>
      )}
      {!!eventInfo ? (
        <EventClickMenu
          eventElem={eventInfo.el}
          Event={eventInfo.event}
          toggle={setEventInfo}
          currentUser={currentUser}
          enqueueSnackbar={enqueueSnackbar}
          Firebase={Firebase}
        />
      ) : (
        <></>
      )}
    </Container>
  );
}
