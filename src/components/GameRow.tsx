import { useCallback } from "react";

const GameRow = ({
  guess,
  isGuessed,
  soltion,
  setGameResult,
  setIsGameOver,
}: {
  guess: string;
  isGuessed: boolean;
  soltion: string;
  setGameResult: React.Dispatch<
    React.SetStateAction<"" | "failed" | "success">
  >;
  setIsGameOver: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const generateClassName = useCallback(
    (value: string, index: number) => {
      const lowerCaseSoltion = soltion.toLowerCase();
      let className = "gameTile";
      if (isGuessed) {
        if (guess.toLowerCase() === soltion.toLowerCase()) {
          className += " correct";
          setIsGameOver(true);
          setGameResult("success");
        } else if (lowerCaseSoltion.charAt(index) === value.toLowerCase()) {
          className += " existInSoltion";
        } else if (lowerCaseSoltion.includes(value.toLowerCase())) {
          className += " partialCorrect";
        } else {
          className += " inCorrect";
        }
      }
      return className;
    },
    [isGuessed, guess, soltion, setGameResult, setIsGameOver]
  );

  const generateRowValue = (rowValue: string, index: number) => {
    return rowValue[index] ?? "";
  };

  return (
    <div className="gameRow">
      {[0, 1, 2, 3, 4].map((item) => (
        <div className={generateClassName(generateRowValue(guess, item), item)}>
          {generateRowValue(guess, item)}
        </div>
      ))}
    </div>
  );
};

export default GameRow;
