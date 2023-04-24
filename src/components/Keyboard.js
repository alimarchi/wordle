import { useCallback, useEffect, useContext } from "react";
import { AppContext } from "../App";
import Key from "./Key";

const Keyboard = () => {
  const { onDelete, onEnter, onSelectLetter, disabledLetters } =
    useContext(AppContext);

  const keys1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const keys2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  const keys3 = ["Z", "X", "C", "V", "B", "N", "M"];

  // The function is called whenever a key is pressed on the keyboard. If the key pressed is Enter or Backspace, the corresponding function is called. If it is any other key, it is compared against each key in keys1, keys2, and keys3 using a loop. If a match is found, the onSelectLetter function is called with the corresponding letter.
  const handleKeyboard = useCallback((event) => {
    if (event.key === "Enter") {
      onEnter();
    } else if (event.key === "Backspace") {
      onDelete();
    } else {
      keys1.forEach((key) => {
        if (event.key.toLowerCase() === key.toLowerCase()) {
          onSelectLetter(key);
        }
      });
      keys2.forEach((key) => {
        if (event.key.toLowerCase() === key.toLowerCase()) {
          onSelectLetter(key);
        }
      });
      keys3.forEach((key) => {
        if (event.key.toLowerCase() === key.toLowerCase()) {
          onSelectLetter(key);
        }
      });
    }
  });

  // The useEffect hook is used to add and remove an event listener for keyboard input whenever the handleKeyboard function changes. This ensures that the correct handleKeyboard function is always used to handle keyboard input.
  useEffect(() => {
    document.addEventListener("keydown", handleKeyboard);

    return () => {
      document.removeEventListener("keydown", handleKeyboard);
    };
  }, [handleKeyboard]);
  return (
    <div className="keyboard" onKeyDown={handleKeyboard}>
      <div className="line1">
        {keys1.map((key) => {
          return (
            <Key
              key={key}
              keyValue={key}
              disabled={disabledLetters.includes(key)}
            />
          );
        })}
      </div>
      <div className="line2">
        {keys2.map((key) => {
          return (
            <Key
              key={key}
              keyValue={key}
              disabled={disabledLetters.includes(key)}
            />
          );
        })}
      </div>
      <div className="line3">
        <Key keyValue={"ENTER"} bigKey={true} />
        {keys3.map((key) => {
          return (
            <Key
              key={key}
              keyValue={key}
              disabled={disabledLetters.includes(key)}
            />
          );
        })}
        <Key keyValue={"DELETE"} bigKey={true} />
      </div>
    </div>
  );
};

export default Keyboard;
