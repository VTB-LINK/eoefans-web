//@ts-nocheck
import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { ReactChildrenType } from "./type";
declare module "@mui/material/styles" {
  interface Palette {
    palette: {
      luzao: Palette["primary"];
      minuo: Palette["primary"];
      waner: Palette["primary"];
      yumo: Palette["primary"];
      youen: Palette["primary"];
      yituo: Palette["primary"];
    };
  }
  interface PaletteOptions {
    luzao: Palette["primary"];
    minuo: Palette["primary"];
    waner: Palette["primary"];
    yumo: Palette["primary"];
    youen: Palette["primary"];
    yituo: Palette["primary"];
  }
}
declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    luzao: true;
    minuo: true;
    waner: true;
    yumo: true;
    youen: true;
    yituo: true;
  }
}
const theme = createTheme({
  typography: {
    fontFamily: "Proxima Soft",
  },
  palette: {
    luzao: { main: "#3dff9e", contrastText: "#fff" },
    minuo: { main: "#f068B0", contrastText: "#fff" },
    waner: { main: "#1eafe4", contrastText: "#fff" },
    yumo: { main: "#b77fdd", contrastText: "#fff" },
    youen: { main: "#EB6346", contrastText: "#fff" },
    yituo: { main: "#49d4ba", contrastText: "#fff" },
  },
});

const MUIThemePreview = ({ children }: ReactChildrenType) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default MUIThemePreview;
