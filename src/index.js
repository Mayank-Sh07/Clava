import React from "react";
import ReactDOM from "react-dom";
import ClavaThemeProvider from "./Theme/ClavaThemeProvider";
import CssBaseline from "@material-ui/core/CssBaseline";
import Clava from "./Clava";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <ClavaThemeProvider>
      <CssBaseline />
      <Clava />
    </ClavaThemeProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
