import { createTheme } from "@mui/material";
import { ruRU } from "@mui/material/locale";
import { ruRU as dataGridRuRU } from "@mui/x-data-grid";
import { ruRU as dataPickerRuRU } from "@mui/x-date-pickers";

enum Colors {
  Main = "#af194e",
  MainDark = "#802042",
  MainLight = "#dbadbd",
  Secondary = "#49bf51",
  White = "#fff",
}

const theme = createTheme(
  {
    components: {
      MuiButton: {
        variants: [
          {
            props: { color: "inherit", variant: "contained" },
            style: {
              background: Colors.White,
              color: Colors.Main,

              "&:hover": {
                background: Colors.MainLight,
              },
            },
          },
          {
            props: { color: "inherit", variant: "outlined" },
            style: {
              "&:hover": {
                background: Colors.MainDark,
              },
            },
          },
        ],
      },
    },
    palette: {
      mode: "light",
      primary: {
        main: Colors.Main,
      },
      secondary: {
        main: Colors.Secondary,
      },
    },
    typography: {
      h1: {
        fontWeight: 700,
      },
      h2: {
        fontWeight: 700,
      },
      h3: {
        fontWeight: 700,
      },
      h4: {
        fontWeight: 700,
      },
    },
  },
  ruRU,
  dataGridRuRU,
  dataPickerRuRU
);

export default theme;
