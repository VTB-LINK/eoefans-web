import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { ReactChildrenType } from "./type";
const theme = createTheme({
  typography: {
    fontFamily: "Proxima Soft",
  },
});

const MUIThemePreview = ({ children }: ReactChildrenType) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default MUIThemePreview;
