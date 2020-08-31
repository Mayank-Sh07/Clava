import React from "react";
import ReactDOM from "react-dom";
import ClavaThemeProvider from "./Theme/ClavaThemeProvider";
import CssBaseline from "@material-ui/core/CssBaseline";
import Clava from "./Clava";

ReactDOM.render(
  <ClavaThemeProvider>
    <CssBaseline />
    <Clava />
  </ClavaThemeProvider>,
  document.getElementById("root")
);
