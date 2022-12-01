import React from "react";
import "./RockPaper.css";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import rock from "./rock.png";
import paper from "./paper.png";
import scissor from "./scissor.png";
import Footer from "../Footer.js";
import Axios from "axios";

const RockPaper = () => {
  const [userChoice, setUserChoice] = useState(null); //to get user's choice
  const [computerChoice, setComputerChoice] = useState(null); //to get computer's choice
  const [result, setResult] = useState(null); //to get result
  const [score, setScore] = useState(0);
  const choices = ["rock", "paper", "scissor"];
  //choices we have in total

  const handleClick = (value) => {
    //on clicking any choices
    setUserChoice(value); // the selected choice goes to userchoice
    generateComputerChoice(); // function to generate computer's choice
  };

  const generateComputerChoice = () => {
    const randomChoice = choices[Math.floor(Math.random() * choices.length)];
    // it generates random index from 0 to length of choices array and then the element in choices array present in that index
    setComputerChoice(randomChoice); // the randomchoice goes to computerchoice
  };

  useEffect(() => {
    // to check the result
    {
      switch (userChoice + computerChoice) {
        //switch case concatinating both userchoice and computerchoice arrays for each cases
        case "scissorpaper":
        case "rockscissor":
        case "paperrock":
          setResult("YOU WIN!");
          setScore((score) => score + 1);
          break;
        case "paperscissor":
        case "scissorrock":
        case "rockpaper":
          setResult("YOU LOSE!");
          setScore((score) => score - 1);
          break;
        case "rockrock":
        case "paperpaper":
        case "scissorscissor":
          setResult("ITS A DRAW!");
          break;
      }
    }
  }, [computerChoice, userChoice]); //pass in user and computer choice array as props

  const onClicking = () => {
    setUserChoice(null);
    setComputerChoice(null);
    setResult(null);
    setScore(0);
  };
  useEffect(() => {
    if (score > sessionStorage.getItem("rockPaperScissor")) {
      sessionStorage.setItem("rockPaperScissor", score);

      Axios.post(
        "http://gamesserver.fkc9b4c8fze2dre0.centralindia.azurecontainer.io/api/updategamerockpaperscissor",
        {
          username: sessionStorage.getItem("userName"),
          // game: "rockPaperScissor",
          score: score,
        }
      ).then((e) => console.log(e));
    }
  }, [score, userChoice, sessionStorage.getItem("rockPaperScissor")]);

  return (
    <div className="rockpaper">
      <header>
        <h1>ROCK-PAPER-SCISSOR</h1>
      </header>
      <div className="subheader">
        <h3>Score : {score}</h3>
        <h3>Highest Score : {sessionStorage.getItem("rockPaperScissor")}</h3>
      </div>
      <div className="choic">
        <h2>Your choice is : {userChoice}</h2>
        <h2>Computer's choice is : {computerChoice}</h2>
      </div>
      <div className="main">
        <Container>
          <Row>
            <Col>
              <button className="click" onClick={() => handleClick("rock")}>
                {" "}
                <img src={rock} alt="" />
              </button>
            </Col>
            <Col>
              <button className="click" onClick={() => handleClick("paper")}>
                {" "}
                <img src={paper} alt="" />
              </button>
            </Col>
            <Col>
              <button className="click" onClick={() => handleClick("scissor")}>
                {" "}
                <img src={scissor} alt="" />
              </button>
            </Col>
          </Row>
        </Container>
      </div>

      <h1 className="res">{result}</h1>
      <button className="again" onClick={() => onClicking()}>
        PLAY AGAIN
      </button>

      <Footer />
    </div>
  );
};

export default RockPaper;
