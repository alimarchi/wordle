import { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";

const Letter = ({ letterPosition, attemptValue }) => {
  const { board, correctWord, currentAttempt, setDisabledLetters, theme } =
    useContext(AppContext);
  const letter = board[attemptValue][letterPosition];

  const [typed, setTyped] = useState(false);

  const correct = correctWord.toUpperCase()[letterPosition] === letter;
  const almost =
    !correct && letter !== "" && correctWord.toUpperCase().includes(letter);

  const letterState =
    currentAttempt.attempt > attemptValue &&
    (correct ? "correct" : almost ? "almost" : "error");

  useEffect(() => {
    if (letter !== "" && !correct && !almost) {
      setDisabledLetters((previous) => [...previous, letter]);
    }
  }, [currentAttempt.attempt]);

  useEffect(() => {
    if (letter !== "") {
      setTyped(true)
    } else {
      setTyped(false)
    }
  }, [letter])

  return (
    <div
      className={`letter ${typed ? theme === "dark" ? "typed-dark" : "typed-light" : ""}`}
      id={letterState.toString()}
      style={{ "--position": letterPosition }}
    >
      {letter}
    </div>
  );
};

export default Letter;
