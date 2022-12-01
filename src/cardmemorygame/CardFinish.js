import React, { useEffect } from "react";
import "./CardFinish.css";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Axios from "axios";

const Finish = ({ handleRestart, showModal, bestScore, moves }) => {
  useEffect(() => {
    if (sessionStorage.getItem("memorygame") == -1)
      Axios.post("http://localhost:3003/api/updatememorygame", {
        score: bestScore,
        username: sessionStorage.getItem("userName"),
      }).then(() => sessionStorage.setItem("memorygame", bestScore));
    else if (sessionStorage.getItem("memorygame") > bestScore)
      Axios.post("http://localhost:3003/api/updatememorygame", {
        score: bestScore,
        username: sessionStorage.getItem("userName"),
      }).then(() => sessionStorage.setItem("memorygame", bestScore));
  }, []);
  return (
    <div>
      <Dialog
        open={showModal}
        disableBackdropClick
        disableEscapeKeyDown
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <h2 className="head">Memory Game</h2>
        <DialogTitle id="alert-dialog-title">
          YAY!!! GAME COMPLETED!!!
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You have {moves} moves. The best score is {bestScore}.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRestart} color="primary">
            Restart
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Finish;
