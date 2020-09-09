import React from "react";
import ReactDOM from "react-dom";
import ClavaThemeProvider from "./Theme/ClavaThemeProvider";
import CssBaseline from "@material-ui/core/CssBaseline";
import Clava from "./Clava";
import Firebase, { FirebaseContext } from "./Components/Firebase/init";

ReactDOM.render(
  <ClavaThemeProvider>
    <CssBaseline />
    <FirebaseContext.Provider value={new Firebase()}>
      <Clava />
    </FirebaseContext.Provider>
  </ClavaThemeProvider>,
  document.getElementById("root")
);
