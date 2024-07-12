import { useCallback, useEffect, useState } from "react";
import { mockWords } from "../data";
const intitalGuess = ["", "", "", "", ""];

const START_CHARACTER_INDEX = 65;
const END_CHARACTER_INDEX = 90;
const useGame = () => {
  const [soltion, setSoltion] = useState("");
  const [guesses, setGuesses] = useState(intitalGuess);
  const [currentInputIndex, setCurrentInputIndex] = useState(0);
  const [currentGuess, setCurrentGuess] = useState("");

  const [isGameOver, setIsGameOver] = useState(false);
  const [gameResult, setGameResult] = useState<"failed" | "success" | "">("");

  useEffect(() => {
    restartGame();
  }, []);

  const onChangeHandler = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Backspace") {
        setCurrentGuess((prev) => prev.slice(0, -1));
      } else if (event.key === "Enter") {
        if (currentGuess.length === 5 && currentInputIndex < 5) {
          setGuesses((prev) => {
            const newGuesses = [...prev];
            newGuesses[currentInputIndex] = currentGuess;
            return newGuesses;
          });
          setCurrentInputIndex((prev) => prev + 1);
          setCurrentGuess("");
        }

        if (currentInputIndex === 4) {
          setIsGameOver(true);
          setGameResult("failed");
        }
      } else if (
        currentGuess.length < 5 &&
        START_CHARACTER_INDEX <= event.keyCode &&
        event.keyCode <= END_CHARACTER_INDEX
      ) {
        setCurrentGuess((prev) => prev + event.key);
      }
    },
    [currentGuess, currentInputIndex]
  );

  useEffect(() => {
    window.addEventListener("keydown", onChangeHandler);
    return () => window.removeEventListener("keydown", onChangeHandler);
  }, [currentGuess, guesses, currentInputIndex, onChangeHandler]);

  const restartGame = () => {
    setCurrentInputIndex(0);
    setGuesses(intitalGuess);
    setCurrentGuess("");
    setIsGameOver(false);
    setSoltion(mockWords[Math.floor(Math.random() * mockWords.length)]);
    setGameResult("");
  };

  return {
    guesses,
    currentGuess,
    currentInputIndex,
    soltion,
    setGameResult,
    setIsGameOver,
    isGameOver,
    gameResult,
    restartGame,
  };
};

export default useGame;
