import React from "react";
import Square from "./Square";


/*creating a functional component*/

/*here we are going over each square and then passing the square in the board into the Square component */
const Board = ({ squares, onClick}) => (
    <div className="board">
        {squares.map((square, i) => (
            <Square key={i} value={square} onClick={() => onClick(i)} />

        ))}
    </div>
);

export default Board;