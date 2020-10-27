import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { v4 as uuid } from "uuid";
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TreeItem from "@material-ui/lab/TreeItem";

const useStyles = makeStyles({
  TreeViewContainer: {
    flexGrow: 1,
    maxWidth: 400,
    color: "#FFFFFF",
    padding: "10px",
  },
});

export default function TreeViewList({ listData }) {
  const classes = useStyles();

  return (
    <TreeView
      className={classes.TreeViewContainer}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
    >
      <TreeItem nodeId={uuid()} label={listData.head}>
        {listData.nodes.map((name) => (
          <TreeItem nodeId={uuid()} label={name} />
        ))}
      </TreeItem>
    </TreeView>
  );
}
