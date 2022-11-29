import React, { useState , useEffect , useRef } from 'react'
import { Col, Container, Row } from "react-bootstrap";
import "./CardMemory.css"
import uniqueCardsArray from './Carddata.js';
import Card from './Card.js'
import Header from './CardHeader.js';
import Finish from './CardFinish.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from '../Footer.js';

// FisherYates Modern Shuffle Algorithm
function swap(array, i, j) {
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  function shuffleCards(array) {
    const length = array.length;
    for (let i = length; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * i);
      const currentIndex = i - 1;
      swap(array, currentIndex, randomIndex);
    }
    return array;
  }

const CardMemory = () => {
const [cards,setCards]= useState(()=>
shuffleCards(uniqueCardsArray.concat(uniqueCardsArray)));  
//concat function adds two arrays and gives another array containing elements of both

const [openCards, setOpencards] = useState([]);  //for flipped cards
  const [matchedCards, setMatchedcards] = useState({});  //for matched pairs
  const [moves, setMoves] = useState(0);   //for no of moves
  const [showModal, setShowModal] = useState(false);   //for pop up after game completion
  const [shouldDisableAllCards, setShouldDisableAllCards] = useState(false);  
  //disable when 1 card is selected enable when both cards are selected
  const [bestScore, setBestScore] = useState(
    JSON.parse(localStorage.getItem("bestScore")) || Number.POSITIVE_INFINITY // for 1st time bestscore is infinity
  ); //to store best score in local storage
  
  const timeout = useRef(null);
  
  const disable = () =>{
    setShouldDisableAllCards(true);
  }
  const enable = () =>{
    setShouldDisableAllCards(false);
  }

  const checkCompletion = () => {
    if (Object.keys(matchedCards).length === uniqueCardsArray.length) //if all cards are matched
    {
      setShowModal(true);                  //completion pop up will show
      const highScore = Math.min(moves, bestScore);    //calculate highScore
      setBestScore(highScore);                         //set Best Score
      localStorage.setItem("bestScore", highScore);    //store in local storage
    }
  };

  const evaluate = () => {
    const [first, second] = openCards;   //2 cards selected
    enable();                            // enable since 2 cards are selected
    if (cards[first].type === cards[second].type)   // if both cards match
    {
      setMatchedcards((prev) => ({ ...prev, [cards[first].type]: true }));   //set true value for the type
      setOpencards([]);                          // initial value again
      // alert("you have found a match");
      return;
    }
    timeout.current = setTimeout(() => {      // else not matched
      setOpencards([]);                       //initial value again
    }, 500);
  };

  const Handleclick = (index)=> {           // on clicking a card pass index
    if(openCards.length===1){               // check the length of opencards i.e. 0 initially
      setOpencards((prev)=>[...prev,index]);   // if lenght is 1 add next index to opencards array
      setMoves((moves)=>moves+1);              // increment moves
      disable();                               // disable the card to check matching when 1 card is selected
    }
    else{
      clearTimeout(timeout.current);          // clear running function if any
      setOpencards([index]);                  // insert index in opencards array if 1st card
    }
  }

  useEffect(() => {                           // to call evaluate
    let timeout = null;
    if (openCards.length === 2) {              // if both cards clicked
      timeout = setTimeout(evaluate, 300);     // calls evaluate function after 3s
    }
    return () => {
      clearTimeout(timeout);                   // clear timeout if any
    };
  }, [openCards]);                             // passing opencards array

  useEffect(() => {
    checkCompletion();                        // calls checkcompletion function
  }, [matchedCards]);                         // passing matchedcards array

  const checkIsFlipped = (index) => {        //passing index
    return openCards.includes(index);   // checking if opencards array contains this index then it is flipped
  };
  const checkIsInactive = (card) => {
    return Boolean(matchedCards[card.type]); //returns boolean if the element in matchedcards array is true for that type
  };
  const handleRestart = () => {           // for restarts sets all usestates to its initial state
    setMatchedcards({});
    setOpencards([]);
    setShowModal(false);
    setMoves(0);
    setShouldDisableAllCards(false);
    setCards(shuffleCards(uniqueCardsArray.concat(uniqueCardsArray)));
  };


    return (
        <div class="CardMemory">
            
        <Header 
        moves={moves}              //pass moves in header(props)
        bestScore={bestScore}      //pass best score
        handleRestart={handleRestart} //pass handlestart function for refresh
        />
        <Container className="point">
        <Row>
          {cards.map((card, index) => {
            return (
              <Col xs={6} md={3} lg={2}>
                <Card
                  key={index}
                  card={card}
                  index={index}
                isDisabled={shouldDisableAllCards}
                isInactive={checkIsInactive(card)}
                isFlipped={checkIsFlipped(index)}
                onClick={Handleclick}
                />
              </Col>
            );
          })}
        </Row>
      </Container>
      <Finish
        showModal={showModal}
        moves={moves}
        bestScore={bestScore}
        handleRestart={handleRestart}
      />
      <Footer />
        </div>
    )
}

export default CardMemory;
