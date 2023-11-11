import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#af194e",
    },
    secondary: {
      main: "#49bf51",
    },
  },
  typography: {
    h1: {
      fontWeight: 700,
    },
  },
});

export default theme;
