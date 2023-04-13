import "./App.css";
import ReactDOM from "react-dom";
import { createContext, useState, useEffect } from "react";
import { boardDefault, generateWordSet } from "./Words";
import Board from "./components/Board";
import Keyboard from "./components/Keyboard";
import GameOver from "./components/GameOver";
import Confetti from "react-confetti";

export const AppContext = createContext();

const App = () => {
  const [board, setBoard] = useState(boardDefault);
  const [currentAttempt, setCurrentAttempt] = useState({
    attempt: 0,
    letterPosition: 0,
  });
  const [wordSet, setWordSet] = useState(new Set());
  const [disabledLetters, setDisabledLetters] = useState([]);
  const [gameOver, setGameOver] = useState({
    gameOver: false,
    guessedWord: false,
  });
  const [correctWord, setCorrectWord] = useState("");
  const [alert, setAlert] = useState(false);
  const [visible, setVisible] = useState(false);
  const [newGame, setNewGame] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleVisibility = () => {
    setVisible(false);
    setShowConfetti(false);
    setNewGame(true);
    const newBoardDefault = [
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
    ];
    setBoard(newBoardDefault);
    setCurrentAttempt({
      attempt: 0,
      letterPosition: 0,
    });
    setDisabledLetters([]);
  };

  useEffect(() => {
    generateWordSet().then((words) => {
      setWordSet(words.wordSet);
      setCorrectWord(words.todaysWord);
    });
  }, [newGame]);

  const onSelectLetter = (keyValue) => {
    if (currentAttempt.letterPosition > 4) return;
    const newBoard = [...board];
    newBoard[currentAttempt.attempt][currentAttempt.letterPosition] = keyValue;
    setBoard(newBoard);
    setCurrentAttempt({
      ...currentAttempt,
      letterPosition: currentAttempt.letterPosition + 1,
    });
  };

  const onDelete = () => {
    if (currentAttempt.letterPosition === 0) return;
    const newBoard = [...board];
    newBoard[currentAttempt.attempt][currentAttempt.letterPosition - 1] = "";
    setBoard(newBoard);
    setCurrentAttempt({
      ...currentAttempt,
      letterPosition: currentAttempt.letterPosition - 1,
    });
  };

  const onEnter = () => {
    if (currentAttempt.letterPosition !== 5) return;

    let currentWord = "";
    for (let i = 0; i < 5; i++) {
      currentWord += board[currentAttempt.attempt][i];
    }

    if (wordSet.has(currentWord.toLowerCase())) {
      setCurrentAttempt({
        attempt: currentAttempt.attempt + 1,
        letterPosition: 0,
      });
    } else {
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, "3000");
    }

    if (currentWord.toLowerCase() === correctWord.toLowerCase()) {
      setGameOver({ gameOver: true, guessedWord: true });
      setVisible(true);
      setShowConfetti(true);
      return;
    }

    if (currentAttempt.attempt === 5 && wordSet.has(currentWord.toLowerCase())) {
      setGameOver({ gameOver: true, guessedWord: false });
      setVisible(true);
    }
  };

  console.log(correctWord)

  return (
    <>
      <div className="App">
        {showConfetti && <Confetti />}
        <nav>
          <h1>Alice's Wordle</h1>
        </nav>
        <AppContext.Provider
          value={{
            board,
            setBoard,
            currentAttempt,
            setCurrentAttempt,
            onEnter,
            onDelete,
            onSelectLetter,
            correctWord,
            disabledLetters,
            setDisabledLetters,
            gameOver,
            setGameOver,
          }}
        >
          {ReactDOM.createPortal(
            <GameOver visible={visible} onClose={handleVisibility} />,
            document.querySelector("#modal")
          )}
          <div className="game">
            <div className={alert ? "alert" : "not-visible"}>
              Word not found
            </div>
            <Board />
            <Keyboard />
          </div>
        </AppContext.Provider>
      </div>
    </>
  );
};

export default App;
