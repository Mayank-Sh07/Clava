/*
1) Click a date (and drag) to add Event , Show a Modal for getting all Info
2) View Details, Modify or Delete existing event by clicking
3) Button to toggle weekends on or off
4) adding state events list to state and a set Calendar method for writing to db
5) refactoring code
 */

import React, { useState, createRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Container, Switch } from "@material-ui/core";
import NewEventDialog from "./NewEventDialog";
import EventClickMenu from "./EventClickMenu";

export default function Calendar() {
  const calendarRef = createRef();
  const [showWeekends, toggleWeekends] = useState(true);
  const [events, setEvents] = useState([
    { title: "event 1", date: "2020-09-26" },
  ]);
  const [selectInfo, setSelectInfo] = useState(null);
  const [eventInfo, setEventInfo] = useState(null);
  console.log(events);

  const handleEventChange = (currentEvents) => {
    setEvents(currentEvents.map((event) => event.toPlainObject()));
  };

  return (
    <Container maxWidth='md'>
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
      />
      {!!selectInfo ? (
        <NewEventDialog selectInfo={selectInfo} toggle={setSelectInfo} />
      ) : (
        <></>
      )}
      {!!eventInfo ? (
        <EventClickMenu
          eventElem={eventInfo.el}
          Event={eventInfo.event}
          toggle={setEventInfo}
        />
      ) : (
        <></>
      )}
    </Container>
  );
}
