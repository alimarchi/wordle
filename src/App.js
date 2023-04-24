import "./App.css";
import ReactDOM from "react-dom";
import { createContext, useState, useEffect } from "react";
import Board from "./components/Board";
import Keyboard from "./components/Keyboard";
import GameOver from "./components/GameOver";
import Statistics from "./components/Statistics";
import Confetti from "react-confetti";
import Loader from "./components/UI/Spinner/Loader";
import { checkWord, getNewWord } from "./services/getWords";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMoon,
  faSun,
  faChartSimple,
} from "@fortawesome/free-solid-svg-icons";

export const AppContext = createContext();

const App = () => {
  // Set the initial state of the board game
  const boardDefault = [
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
  ];
  const [board, setBoard] = useState(boardDefault);
  // Set the initial state of the current attempt
  const [currentAttempt, setCurrentAttempt] = useState({
    attempt: 0,
    letterPosition: 0,
  });
  const [disabledLetters, setDisabledLetters] = useState([]);
  const [gameOver, setGameOver] = useState({
    gameOver: false,
    guessedWord: false,
  });
  const [correctWord, setCorrectWord] = useState("");
  const [alert, setAlert] = useState(false);
  const [visible, setVisible] = useState(false);
  const [newGame, setNewGame] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);

  const [isLoadingWord, setIsLoadingWord] = useState(true);
  const [isLoadingGuess, setIsLoadingGuess] = useState(false);

  const [theme, setTheme] = useState("light");

  const [isVisible, setIsVisible] = useState(false);
  const [stats, setStats] = useState({ match: 0, won: 0 });

  // Load stored game statistics from local storage and update ths stats state accordingly
  useEffect(() => {
    const storedStats = JSON.parse(localStorage.getItem("stats"));
    if (storedStats) {
      setStats({ match: storedStats.match, won: storedStats.won });
    } else {
      setStats({ match: 0, won: 0 });
    }
  }, [isVisible]);

  // Set the body class to the current theme
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  // Toggle between dark and light mode
  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  // Reset the game board and other relevant state when the game is over
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

  // Load a new word when a new game starts
  useEffect(() => {
    const getRandomWord = async () => {
      setIsLoadingWord(true);
      const word = await getNewWord();
      //const word = "party";
      const valid = await checkWord(word);
      if (valid) {
        console.log(word);
        setCorrectWord(word);
        setIsLoadingWord(false);
      } else {
        getRandomWord();
      }
    };
    if (newGame) {
      getRandomWord();
      setNewGame(false);
    }
  }, [newGame]);

  useEffect(() => {
    localStorage.setItem("stats", JSON.stringify(stats));
  }, [stats]);

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

    setIsLoadingGuess(true);
    checkWord(currentWord.toLowerCase()).then((valid) => {
      setIsLoadingGuess(false);
      if (valid) {
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
    });

    if (currentWord.toLowerCase() === correctWord.toLowerCase()) {
      setTimeout(() => {
        setGameOver({ gameOver: true, guessedWord: true });
        setStats((prevStats) => ({
          match: prevStats.match + 1,
          won: prevStats.won + 1,
        }));
        setVisible(true);
        setShowConfetti(true);
      }, "2000");
      return;
    }

    if (currentAttempt.attempt === 5) {
      setIsLoadingGuess(true);
      checkWord(currentWord.toLowerCase()).then((valid) => {
        setIsLoadingGuess(false);
        if (valid) {
          setTimeout(() => {
            setGameOver({ gameOver: true, guessedWord: false });
            setStats((prevStats) => ({
              match: prevStats.match + 1,
              won: prevStats.won,
            }));
            setVisible(true);
          }, "1300");
        }
      });
    }
  };

  return (
    <>
      <div className="App">
        {showConfetti && <Confetti />}

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
            theme,
            setIsVisible,
          }}
        >
          {ReactDOM.createPortal(
            <GameOver visible={visible} onClose={handleVisibility} />,
            document.querySelector("#modal")
          )}
          {ReactDOM.createPortal(
            <Statistics isVisible={isVisible} stats={stats} />,
            document.querySelector("#modal")
          )}
          <nav>
            <div className="nav-container">
              <h1>Alice's Wordle</h1>
              <div className="buttons-container">
                <FontAwesomeIcon
                  icon={faChartSimple}
                  size="lg"
                  className="stats"
                  onClick={() => {
                    setIsVisible(true);
                  }}
                />
                <label className="switch">
                  <input type="checkbox" />
                  <span className="slider round" onClick={toggleTheme}>
                    <FontAwesomeIcon icon={faSun} size="lg" className="sun" />
                    <FontAwesomeIcon icon={faMoon} size="lg" className="moon" />
                  </span>
                </label>
              </div>
            </div>
          </nav>
          <div className="game">
            <div className={alert ? "alert" : "not-visible"}>
              Word not found
            </div>
            {isLoadingWord && <Loader />}
            {!isLoadingWord && (
              <>
                <Board />
                <Keyboard />
              </>
            )}
          </div>
        </AppContext.Provider>
      </div>
    </>
  );
};

export default App;
