import React from "react";

type Props = {
  hiddenWord: string;
  attemptWords: string[];
};

const AttemptsGrid: React.FC<Props> = ({ hiddenWord, attemptWords }) => {
  let hiddenWordLength = hiddenWord.length;
  const grid = Array.from({ length: hiddenWordLength });

  return (
    <section className="w-full flex flex-col gap-2">
      {grid.map((_, rowIndex) => (
        <div className="w-full flex gap-2" key={rowIndex}>
          {(attemptWords[rowIndex] ? [...attemptWords[rowIndex]] : grid).map(
            (cell: any, cellIndex) => (
              <div
                className="text-slate-900 font-black p-2 aspect-square flex items-center justify-center border-2 rounded border-solid border-slate-600 dark:border-slate-300"
                style={{
                  width: `calc((100% - (${
                    hiddenWordLength - 1
                  } * 0.5rem)) / ${hiddenWordLength})`,
                  fontSize: "clamp(1rem, 10vw, 2rem)",
                  backgroundColor: cell
                    ? hiddenWord.includes(cell)
                      ? cell === hiddenWord[cellIndex]
                        ? "#84cc16"
                        : "#f59e0b"
                      : "#a3a3a3"
                    : "transparent",
                }}
                key={cellIndex}
              >
                {cell || ""}
              </div>
            )
          )}
        </div>
      ))}
    </section>
  );
};

export default AttemptsGrid;
