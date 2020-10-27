import React, { useContext } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { Container, makeStyles } from "@material-ui/core";
import { useSnackbar } from "notistack";
import { FirebaseContext } from "../Firebase";

const useStyles = makeStyles((theme) => ({
  DataContainer: {
    backgroundColor: "black",
    height: "400px",
    width: "100%",
  },
}));

const columns = [
  { field: "col1", headerName: "Event Title", width: 250 },
  { field: "col2", headerName: "Start Date", width: 110 },
  { field: "col3", headerName: "End Date", width: 110 },
  { field: "col4", headerName: "Event ID", width: 330 },
  { field: "col5", headerName: "Uploaded On", width: 160 },
  { field: "col6", headerName: "Uploader", width: 100 },
  { field: "col7", headerName: "Action", width: 100 },
];

export default function UserGrid({ data }) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const Firebase = useContext(FirebaseContext);
  const rows = data.map((event, indx) => ({
    id: indx + 1,
    col1: event.title,
    col2: event.start,
    col3: event.end,
    col4: event.id,
    col5: event.uploadDate,
    col6: event.uploadName,
    col7: "delete",
  }));

  const deleteEvent = (e) => {
    if (e.field === "col7") {
      Firebase.firestore()
        .collection("events")
        .doc(e.data.col4)
        .delete()
        .then(() => enqueueSnackbar("Event Deleted Successfully"))
        .catch(() => enqueueSnackbar("deletion failed, please try again"));
    }
  };
  return (
    <Container className={classes.DataContainer} disableGutters>
      <DataGrid
        rows={rows}
        columns={columns}
        onCellClick={(e) => deleteEvent(e)}
      />
    </Container>
  );
}
