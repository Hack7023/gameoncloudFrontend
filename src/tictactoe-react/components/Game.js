import React, { useState } from "react";
import { calculateWinner } from "../helper";
import Board from "./Board";
import "./Game.css";
import Footer from '../../Footer.js';




const Game = () => {
  const [history, setHistory] = useState([Array(9).fill(null)]); //array of 9 squares in the board whose initial values will be null
  const [stepNumber, setStepNumber] = useState(0); // this will be the step number of the game
  const [xIsNext, setXisNext] = useState(true);  
  const winner = calculateWinner(history[stepNumber]); 
  const xO = xIsNext ? "X" : "O"; //this is to put an X or an O in the square

  const handleClick = (i) => {
    const historyPoint = history.slice(0, stepNumber + 1); //to check the present step number
    const current = historyPoint[stepNumber]; 
    const squares = [...current];
    if (winner || squares[i]) return;  //return if there is a winner or the square is occupied
    squares[i] = xO; //if there is no winner and the square is not occupied then put 'X' or 'O'
    setHistory([...historyPoint, squares]); 
    setStepNumber(historyPoint.length);
    setXisNext(!xIsNext);
  };

  const jumpTo = (step) => {  //if the step is not divisible by 2 it would be at X and if it is divisible by 2 the step would be at O
    setStepNumber(step);
    setXisNext(step % 2 === 0);
  };

// here we are mapping through each move of the game
  const renderMoves = () =>
    history.map((_step, move) => {
      const destination = move ? null : "Restart"; //if the move here is 0 then it would go to play again
      <div key={move}>
          <p onClick={() => jumpTo(move)}>{destination}</p>
        </div>

        if(destination === "Restart"){

      return (
         <div key={move}>
          <button onClick={() => jumpTo(move)}>{destination}</button>
        </div>

      );
    }
    });

  return (
    <>
      <h1>tic tac toe</h1>
       <Board squares={history[stepNumber]} onClick={handleClick} />
      <div className="info-wrapper">
        <div className="winner">
          {renderMoves()}
          <h3>{winner ? "Winner: " + winner : ""}</h3>
        </div>
         
        
      </div>
      <Footer />
    </>
  );
};

export default Game;