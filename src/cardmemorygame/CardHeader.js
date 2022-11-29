import React from 'react'
import "./CardHeader.css"
import { Container } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
const Header = ({ moves, bestScore, handleRestart }) => {
    return (
        <div>
            <h1>MEMORY GAME</h1>
            <Container>
                <div className="sub-header">
                    <div className="moves">
                        <span className="bold">MOVES : </span>{moves}
                    </div>
                    <div className="refresh">
                        <Button variant="outline-info" onClick={handleRestart}>
                            REFRESH
                        </Button>
                    </div>
                    {localStorage.getItem("bestScore") && (
                    <div className="highscore">
                        <span>BEST SCORE : </span>{bestScore}
                    </div>)}
                </div>
            </Container>
        </div>
    )
}
export default Header