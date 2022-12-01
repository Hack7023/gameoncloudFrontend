import "./Footer.css";
import React from "react";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="footer">
    <div className="link">
      <Link to="/">
        {" "}
        <a className="home">HOME</a>
      </Link>

      <DropdownButton id="dropdown-basic-button" title="GAMES">
        <ul>
          <li>
            <Link to="/cardmemory">
              <Dropdown.Item href="#/action-1">Memory Game</Dropdown.Item>
            </Link>
          </li>
          <li>
            <Link to="/tictactoe">
              <Dropdown.Item href="#/action-2">Tic-Tac-Toe</Dropdown.Item>
            </Link>
          </li>
          <li>
            <Link to="/rockpaper">
              <Dropdown.Item href="#/action-3">
                Rock-Paper-Scissor
              </Dropdown.Item>
            </Link>
          </li>
          <li>
            <Link to="/shapes">
              <Dropdown.Item href="#/action-4">Shapes Game</Dropdown.Item>
            </Link>
          </li>
        </ul>
      </DropdownButton>
    </div>
    <div className="rights">
      <a className="insta" href="App /">
        <i class="fab fa-instagram"></i>
      </a>
      <p className="all">Copyright@2022</p>
    </div>
  </footer>
);

export default Footer;
