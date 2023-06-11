import React, { useState, useEffect } from "react";
import moon from "./moon.png";
import star1 from "./star1.png";
import star3 from "./star3.png";
import title from "./Layer 1.png";
import "./App.css";
import Footer from "./Footer.js";
import memorycloud from "./memorygamecloud.png";
import shapesgamecloud from "./shapesgamecloud.png";
import rockpaperscissorscloud from "./rockpaperscissorscloud.png";
import sudokusolver from "./sudokucloud.png";

import tictactoecloud from "./tictactoecloud.png";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";

function App() {
  const navigate = useNavigate();
  const [offsetY, setOffsetY] = useState(0); //No of pixels moved from top
  const handleScroll = () => setOffsetY(window.scrollY);
  const [usercount, setUsercount] = useState(100);

  useEffect(() => {
    Axios.post(
      "https://gamesoncloudserver.azurewebsites.net/api/counttotaluser"
    ).then(
      (e) => setUsercount(e.data[0]["count(*)"])
      // console.log()
    );
  }, []);

  useEffect(() => {
    // fires whenever page is scrolled and provide y axis
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [signin, setSignin] = useState(sessionStorage.getItem("signedIn"));
  useEffect(() => {
    setSignin(sessionStorage.getItem("signedIn"));
  }, [sessionStorage.getItem("signedIn"), signin]);

  return (
    <div>
      <div style={{ alignItems: "flex-end", textAlign: "right" }}>
        {signin === "true" ? (
          <button
            style={{
              padding: "10px",
              marginTop: "15px",
              marginRight: "35px",
              fontSize: "25px",
            }}
            onClick={() => (
              sessionStorage.setItem("signedIn", "false"),
              sessionStorage.clear(),
              setSignin(sessionStorage.getItem("signedIn"))
            )}
          >
            LogOut
          </button>
        ) : (
          <button
            style={{
              padding: "10px",
              marginTop: "15px",
              marginRight: "35px",
              fontSize: "25px",
            }}
            onClick={() => navigate("/login")}
          >
            LogIn
          </button>
        )}
      </div>

      <div className="App">
        <header>
          <img src={moon} className="moon" alt="moon" />
          <img src={star1} className="star1 stars" alt="star1" />
          <img src={star3} className="star4 stars" alt="star4" />
          <img src={star3} className="star5 stars" alt="star5" />
          <img src={star1} className="star2 stars" alt="star2" />
          <img src={star3} className="star3 stars" alt="star3" />
          <img src={star1} className="star6 stars" alt="star6" />
          <img src={star1} className="star7 stars" alt="star7" />
          <img src={star3} className="star8 stars" alt="star8" />
          <img src={star3} className="star9 stars" alt="star9" />
          <div className="titl">
            <img src={title} className="move" alt="title" />
          </div>
        </header>
        <div className="body">
          <div className="App-header">
            <div>
              This place is made to play basic games in your free time . The
              games are designed with the help of reactjs.
            </div>
            <div>
              {" "}
              You can play games like Tic-Tac-Toe, Rock-Paper-Scissors , Memory
              game,Sudoku. We'll keep adding new games.
            </div>
          </div>

          <div className="Game">
            <span
              className="left"
              style={{ transform: `translateX(${offsetY * 0.5}px)` }}
            >
              <div id="memo">
                <Link to="/cardmemory">
                  <img
                    src={memorycloud}
                    className="memory gamecontainer"
                    alt="memory"
                  />
                  <p id="mem">MEMORY GAME</p>
                </Link>
              </div>
            </span>
            <span
              className="right"
              style={{ transform: `translateX(-${offsetY * 0.4}px)` }}
            >
              <div id="tict">
                <Link to="/tictactoe">
                  <img
                    src={tictactoecloud}
                    className="tic-tac-toe gamecontainer"
                    alt="tictactoe"
                  />
                  <p id="tic">TIC-TAC-TOE</p>
                </Link>
              </div>
            </span>
            <span
              className="left"
              style={{ transform: `translateX(${offsetY * 0.3}px)` }}
            >
              <div id="dodg">
                <Link to="/rockpaper">
                  <img
                    src={rockpaperscissorscloud}
                    className="rocket gamecontainer"
                    alt="rocket"
                  />
                  <p id="dod">ROCK-PAPER-SCISSOR</p>
                </Link>
              </div>
            </span>
            <span
              className="right"
              style={{ transform: `translateX(-${offsetY * 0.25}px)` }}
            >
              <div id="sudo">
                <Link to="/shapes">
                  <img
                    src={shapesgamecloud}
                    className="sudoku gamecontainer"
                    alt="sudoku"
                  />
                  <p id="sud">SHAPES GAME</p>
                </Link>
              </div>
            </span>
            <span
              className="left"
              style={{ transform: `translateX(${offsetY * 0.2}px)` }}
            >
              <div id="sudo">
                <Link to="/sudoku">
                  <img
                    src={sudokusolver}
                    className="sudoku gamecontainer"
                    alt="sudoku"
                  />
                  <p id="sud">SUDOKU GAME</p>
                </Link>
              </div>
            </span>
          </div>
          <div style={{}}>
            <h1>User Count : {usercount}</h1>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
