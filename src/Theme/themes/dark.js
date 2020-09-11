import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";

// Dark theme
const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#056156",
    },
    secondary: {
      main: "#e2f2d5",
    },
    background: { default: "#1e1e1e" },
  },
  typography: {
    fontFamily: "Montserrat",
  },
});

const dark = responsiveFontSizes(theme);

export default dark;
