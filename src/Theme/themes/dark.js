import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";

// Dark theme
const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#056156",
    },
    secondary: {
      main: "#ffffff",
    },
    background: { default: "#1e1e1e" },
  },
  typography: {
    fontFamily: "Montserrat",
  },
});

const dark = responsiveFontSizes(theme);

export default dark;

// Green Black
// palette: {
//   type: "dark",
//   primary: {
//     main: "#00675b",
//   },
//   secondary: {
//     main: "#ffffff",
//   },
//   background: { default: "#1c1c1b" },
// },
