import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";

// Light theme
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#8bc34a",
      light: "#d0efad",
    },
    secondary: {
      main: "#ff0000",
    },
    background: { default: "#e0e0e0" },
  },
  typography: {
    fontFamily: "Montserrat",
  },
});

const light = responsiveFontSizes(theme);

export default light;
