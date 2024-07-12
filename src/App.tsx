import GameBoard from "./components/GameBoard";
import useGame from "./hooks/useGame";
import "./App.css";
import Modal from "./components/Modal";

const App = () => {
  const {
    guesses,
    currentGuess,
    currentInputIndex,
    soltion,
    setGameResult,
    setIsGameOver,
    gameResult,
    isGameOver,
    restartGame,
  } = useGame();

  return (
    <div className="app">
      <div className="header">
        <div className="guessTitle">Guess the Word!</div>
        <button onClick={restartGame}>Restart</button>
      </div>
      <GameBoard
        guesses={guesses}
        currentGuess={currentGuess}
        currentInputIndex={currentInputIndex}
        soltion={soltion}
        setGameResult={setGameResult}
        setIsGameOver={setIsGameOver}
      />

      <div className="legends">
        <div className="legendBox">
          <div className="legend correct"></div>
          <span>Indicates letter is at correct postion</span>
        </div>
        <div className="legendBox">
          <div className="legend partialCorrect"></div>
          <span>Indicates correct letter but wrong location</span>
        </div>
        <div className="legendBox">
          <div className="legend inCorrect"></div>
          <span>Indicates letter does not exist in solution</span>
        </div>
      </div>

      <Modal onClose={restartGame} isOpen={isGameOver}>
        <div>
          <h3>
            {gameResult === "success"
              ? "Congratulations you guessed the word"
              : `Oops! The word was ${soltion}, please try again.`}
          </h3>
        </div>
      </Modal>
    </div>
  );
};

export default App;
