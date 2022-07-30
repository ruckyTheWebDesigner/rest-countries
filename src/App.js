import React, { useEffect, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Navbar from "./components/Navbar";
import { amber, blue, grey } from "@mui/material/colors";
import Country from "./pages/Country";

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    background: {
      default: mode === "light" ? "hsl(0, 0%, 98%)" : "hsl(207, 26%, 17%)",
      paper: mode === "light" ? "hsl(0, 0%, 98%)" : "hsl(207, 26%, 17%)",
    },

    default: {
      main: mode === "light" ? grey[50] : grey[900],
      light: mode === "light" ? grey[200] : grey[900],
      dark: mode === "light" ? grey[900] : grey[200],
      contrastText: mode === "light" ? grey[900] : grey[50],
      text: mode === "light" ? grey[900] : grey[50],
      primary: mode === "light" ? blue[500] : amber[500],
      secondary: mode === "light" ? blue[500] : amber[500],
      paper: mode === "light" ? grey[50] : grey[900],
    },
    primary: {
      main: mode === "light" ? blue[500] : blue[900],
      ...(mode === "dark" && {
        main: amber[300],
      }),
    },
    ...(mode === "dark" && {
      background: {
        default: "hsl(207, 26%, 17%)",
        paper: "hsl(209, 23%, 22%)",
      },
    }),
    text: {
      ...(mode === "light"
        ? {
            primary: "hsl(200, 15%, 8%)",
            secondary: grey[800],
          }
        : {
            primary: "#fff",
            secondary: grey[500],
          }),
    },
    input: {
      ...(mode === "light" && { background: "hsl(0, 0%, 100%)" }),
    },
  },
});

const localTheme = localStorage.getItem("theme");

function App() {
  const [mode, setmode] = useState(localTheme || "light");

  const toogleMode = () => {
    if (mode === "light") {
      setmode("dark");
      localStorage.setItem("theme", "dark");
    } else if (mode === "dark") {
      setmode("light");

      localStorage.setItem("theme", "light");
    }
  };

  const customTheme = React.useMemo(
    () => createTheme(getDesignTokens(mode)),
    [mode]
  );

  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      <Navbar toggleMode={toogleMode} mode={mode} />
      <Router>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/country/:countryname' exact element={<Country />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
