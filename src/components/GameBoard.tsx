import GameRow from "./GameRow";

const GameBoard = ({
  guesses,
  currentGuess,
  currentInputIndex,
  soltion,
  setGameResult,
  setIsGameOver,
}: {
  guesses: string[];
  currentGuess: string;
  currentInputIndex: number;
  soltion: string;
  setGameResult: React.Dispatch<
    React.SetStateAction<"" | "failed" | "success">
  >;
  setIsGameOver: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div className="gameBoard">
      {guesses.map((guess: string, index: number) => (
        <GameRow
          key={index}
          guess={
            guess ? guess : currentInputIndex === index ? currentGuess : ""
          }
          isGuessed={guess.length > 0}
          soltion={soltion}
          setGameResult={setGameResult}
          setIsGameOver={setIsGameOver}
        />
      ))}
    </div>
  );
};

export default GameBoard;
