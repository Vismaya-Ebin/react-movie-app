import "./App.css";

import Home from "./components/Home.js";
import { Switch, Route, Link, Redirect } from "react-router-dom";
import Notfound from "./components/Notfound.js";
import { useState } from "react";

import GetTrailorDetails from "./components/GetTrailorDetails.js";
import { AddMovies } from "./components/AddMovies.js";
import { ShowMovieDetails } from "./components/ShowMovieDetails.js";
import { EditDetails } from "./EditDetails";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";

import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

import { useHistory } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import { BasicForm } from "./components/BasicForm";

function App() {
  /**Context creation */
  const [mode, Setmode] = useState("light");
  const context = createTheme({
    palette: {
      mode: mode,
    },
  });
  const history = useHistory();

  const [movieDetails, updateMovieDetails] = useState([]);

  const style = {
    minHeight: "100vh",
    borderRadius: "0px",
  };

  const btnStyle = {
    marginLeft: "auto",
  };
  return (
    <ThemeProvider theme={context}>
      <div className="App">
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>

            <Button
              color="inherit"
              onClick={() => {
                history.push("/");
              }}
            >
              HOME
            </Button>
            <Button
              color="inherit"
              onClick={() => {
                history.push("/movies/add");
              }}
            >
              Add Movie
            </Button>
            <Button  color="inherit" onClick={() => {history.push("/forms")}}>Form</Button>
            <Button
              color="inherit"
              onClick={() => {
                history.push("/show");
              }}
            >
              Show Movie{" "}
            </Button>
            <Button
              style={btnStyle}
              color="inherit"
              startIcon={
                mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />
              }
              onClick={() => {
                Setmode(mode === "light" ? "dark" : "light");
              }}
            >
              CHANGE MODE
            </Button>
          
          </Toolbar>
        </AppBar>

        <Link to="/films"> </Link>

        <hr />
        <Paper style={style} elevation={0}>
          <Switch>
            <Route path="/add/:id">
              <GetTrailorDetails />
            </Route>
            <Route path="/movies/edit/:id">
              <EditDetails />
            </Route>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/films">
              <Redirect to="/movies/add" />
            </Route>
            <Route path="/movies/add">
              <AddMovies />
            </Route>

            <Route path="/show">
              <ShowMovieDetails />
            </Route>
            <Route path="/forms"><BasicForm/></Route>
            <Route path="/**">
              <Notfound />
            </Route>
          </Switch>
        </Paper>
      </div>
    </ThemeProvider>
  );
}
export default App;
