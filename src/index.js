import React from "react";
import ReactDOM from "react-dom";
import ClavaThemeProvider from "./Theme/ClavaThemeProvider";
import CssBaseline from "@material-ui/core/CssBaseline";
import Clava from "./Clava";
import Firebase, { FirebaseContext } from "./Components/Firebase/init";
import { SnackbarProvider } from "notistack";

ReactDOM.render(
  <ClavaThemeProvider>
    <CssBaseline />
    <FirebaseContext.Provider value={new Firebase()}>
      <SnackbarProvider>
        <Clava />
      </SnackbarProvider>
    </FirebaseContext.Provider>
  </ClavaThemeProvider>,
  document.getElementById("root")
);
