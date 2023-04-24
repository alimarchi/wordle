# React Wordle
____

This is a clone project of the popular word guessing game, Wordle. The main difference with the real application is that you can play endlessly; you're not limited to one word per day. The project is made using React and JavaScript and is based on the tutorial by [PedroTech](https://github.com/machadop1407/Wordle-Clone-React), with customized features and personalized CSS styles.

#### Features

Here are the main new features that have been implemented:

- **Statistics Button**: A new button has been added that allows the user to check the number of games played, the games won, and the percentage of wins. The data is stored in the local storage, and the user can reset the statistics. Statistics will be displayed in a modal window.
- **Random Word API**: The 5 letter word to guess is generated through the call of an external API: [Random Words API](https://rapidapi.com/sheharyar566/api/random-words5).
- **Word Dictionary API**: Each time the user makes an attempt with a new word, the app calls an external API, [Word Dictionary API](https://rapidapi.com/twinword/api/word-dictionary), to check if the inserted word exists or not.
- **Light and Dark Mode**: A switch button has been added that allows changing between light mode and dark mode.
- **Animation**: Animations have been added each time the user types a letter (bounce animation) and after clicking on enter (flip animation).
- **Modal Window**: A GameOver component will be displayed in a modal window. It will render if the user guesses the correct word or if the user fails to guess the word after six attempts. The correct word will be displayed in the modal. In both cases, there will be a "New Game" button, which will reset the game so that the user can play again.
- **Confetti Animation**: A confetti animation is displayed when the user wins the game. The React-confetti library has been used to implement this feature.

#### How to run the project locally:

To run the project locally, clone the repository and perform the following command-line actions:
```
cd wordle
npm install
npm run start
```

The application will automatically open in your browser at http://localhost:3000.

___
This repository is open sourced for learning purposes only - the original creator(s) of Wordle own all applicable rights to the game itself.
