import "../style/GameOver.css";
import { useContext } from "react";
import { AppContext } from "../App";

const GameOver = ({ visible, onClose }) => {
  const { gameOver, correctWord, currentAttempt, theme } = useContext(AppContext);

  return (
    <>
      <div className={`${"modal"} ${visible && "modal-show"}`}>
        <div className={`${"modal-dialog"} ${theme === "dark" ? "dark" : "light"}`}>
          <div className="modal-body">
            <div className={gameOver.guessedWord ? "right" : "wrong"}>
              <h2>{gameOver.guessedWord ? "You Won!" : "You Lost!"}</h2>
            </div>
            {!gameOver.guessedWord && (
              <>
                <h5 className="answer">The answer was:</h5>
                <div className={`${"correct-word"} ${theme === "dark" ? "correct-dark" : "correct-light"}`}>{correctWord}</div>
              </>
            )}
            {gameOver.guessedWord && (
              <h5>You guessed in {currentAttempt.attempt} attempts.</h5>
            )}
            <button className="new-game" onClick={onClose}>
              NEW GAME
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default GameOver;
