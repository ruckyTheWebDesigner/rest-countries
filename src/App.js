import React, { useState } from "react";
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
  const [mode, setmode] = useState(localTheme);

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
