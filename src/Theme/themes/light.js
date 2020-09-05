import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";

// Light theme
const theme = createMuiTheme({
  palette: {
    type: "light",
    secondary: {
      main: "#ffff00",
    },
  },
  typography: {
    fontFamily: "Montserrat",
  },
});

const light = responsiveFontSizes(theme);

export default light;
