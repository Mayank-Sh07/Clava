import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";

// Dark theme
const theme = createMuiTheme({
  palette: {
    type: "dark",
  },
  typography: {
    fontFamily: "Montserrat",
  },
});

const dark = responsiveFontSizes(theme);

export default dark;
