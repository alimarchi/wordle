import "../style/Statistics.css";
import { useContext, useState, useEffect } from "react";
import { AppContext } from "../App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

const Statistics = ({ isVisible }) => {
  const { theme, setIsVisible } = useContext(AppContext);

  // Set state for number of matches played and games won
  const [match, setMatch] = useState(0);
  const [won, setWon] = useState(0);

  // Reset state when the Reset Stats button is clicked
  const [reset, setReset] = useState(false);

  // Load stats from local storage
  useEffect(() => {
    const storedStats = JSON.parse(localStorage.getItem("stats"));
    if (storedStats) {
      setMatch(storedStats.match);
      setWon(storedStats.won);
    } else {
      setMatch(0);
      setWon(0);
    }
  }, [reset, isVisible]);

  // Close modal when close button is clicked
  const onClose = () => {
    setIsVisible(false);
  };

  // Calculate percentage of games won
  const getPercent = (totalMatches, totalWon) => {
    let result = Math.round((totalWon * 100) / totalMatches);
    if (totalMatches === 0) {
      return 0;
    } else {
      return result;
    }
  };

  // Reset stats when Reset Stats button is clicked
  const onReset = () => {
    localStorage.clear();
    setReset(!reset);
  };

  return (
    <>
      <div className={`${"modal"} ${isVisible && "modal-show"}`}>
        <div
          className={`${"modal-dialog"} ${theme === "dark" ? "dark" : "light"}`}
        >
          <div className="close">
            <FontAwesomeIcon
              icon={faCircleXmark}
              size="xl"
              className="close-button"
              onClick={onClose}
            />
          </div>
          <div className="modal-body">
            <h2>Statistics</h2>
            <div className="cards-container">
              <div
                className={`${"card"} ${
                  theme === "dark" ? "card-dark" : "card-light"
                }`}
              >
                <h1>{match}</h1>
                <h4>&#128377; GAMES PLAYED</h4>
              </div>
              <div
                className={`${"card"} ${
                  theme === "dark" ? "card-dark" : "card-light"
                }`}
              >
                <h1>{won}</h1>
                <h4>&#127942; GAMES WON</h4>
              </div>
              <div
                className={`${"card"} ${
                  theme === "dark" ? "card-dark" : "card-light"
                }`}
              >
                <h1>{getPercent(match, won)}</h1>
                <h4>&#128200; % OF WINS</h4>
              </div>
            </div>
            <button
              onClick={onReset}
              className={`${"stats-button"} ${
                theme === "dark" ? "stats-dark" : "stats-light"
              }`}
            >
              Reset stats
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Statistics;
