import React from "react";
import { DataGrid } from "@material-ui/data-grid";
import { Container, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  DataContainer: {
    backgroundColor: "black",
    height: "450px",
    width: "100%",
  },
}));

const columns = [
  { field: "col1", headerName: "Event Title", width: 300 },
  { field: "col2", headerName: "Start Date", width: 110 },
  { field: "col3", headerName: "End Date", width: 110 },
  { field: "col4", headerName: "Timings", width: 160 },
];

export default function UserGrid({ data }) {
  const classes = useStyles();
  const rows = data.map((event, indx) => ({
    id: indx + 1,
    col1: event.title,
    col2: event.start,
    col3: event.end,
    col4: `${event.startTime} - ${event.endTime}`,
  }));

  return (
    <Container className={classes.DataContainer} disableGutters>
      <DataGrid rows={rows} columns={columns} />
    </Container>
  );
}
