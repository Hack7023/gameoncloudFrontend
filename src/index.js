import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
// import { BrowserRouter as Router, Route } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import CardMemory from "./cardmemorygame/CardMemory.js";
import RockPaper from "./rock-paper/RockPaper.js";
import Game from "./tictactoe-react/components/Game.js";
import Shapes from "./shapes/Shapes.js";
import Login from "./login/Login";
import Signup from "./login/Signup";

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />

      <Route path="/signup" element={<Signup />} />

      <Route path="/login" element={<Login />} />

      <Route path="/cardmemory" element={<CardMemory />} />

      <Route path="/rockpaper" element={<RockPaper />} />

      <Route path="/tictactoe" element={<Game />} />

      <Route path="/shapes" element={<Shapes />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);
