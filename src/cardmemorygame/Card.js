import React from 'react'
import "./Card.css"
// import fpic from "./images/i1.png"
import classnames from "classnames";

const Card = ({ onClick, card, index, isInactive, isFlipped, isDisabled }) => {
    const handleClick = () => {
        !isFlipped && !isDisabled && onClick(index);
      };
    return (
        <div
      className={classnames("card", {
        "is-flipped": isFlipped,
        "is-inactive": isInactive,
      })}
      onClick={handleClick}
    >
          <div className="card-face card-front-face"></div> 
          <div className="card-face card-back-face">
              <img src={card.image} alt="" className="img" />
          </div>
        </div>
    )
}

export default Card
