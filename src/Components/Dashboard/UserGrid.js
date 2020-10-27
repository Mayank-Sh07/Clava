import React from "react";
import { DataGrid } from "@material-ui/data-grid";
import { Container, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  DataContainer: {
    backgroundColor: "black",
    height: "400px",
    width: "100%",
  },
}));

const columns = [
  { field: "col1", headerName: "User Name", width: 230 },
  { field: "col2", headerName: "User Email", width: 230 },
  { field: "col3", headerName: "User Role", width: 100 },
  { field: "col4", headerName: "User ID", width: 280 },
  { field: "col5", headerName: "Created At", width: 320 },
];

export default function UserGrid({ data }) {
  const classes = useStyles();
  const rows = data.map((user, indx) => ({
    id: indx + 1,
    col1: user.name,
    col2: user.email,
    col3: user.role,
    col4: user.id,
    col5: user.createdAt.toDate(),
  }));
  return (
    <Container className={classes.DataContainer} disableGutters>
      <DataGrid rows={rows} columns={columns} />
    </Container>
  );
}
