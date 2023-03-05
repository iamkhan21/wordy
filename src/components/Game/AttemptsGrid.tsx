import React from "react";
import { motion } from "framer-motion";

type Props = {
  hiddenWord: string;
  attemptWords: string[];
};

const AttemptsGrid: React.FC<Props> = ({ hiddenWord, attemptWords }) => {
  const hiddenWordLength = 8;
  const grid = Array.from({ length: hiddenWordLength });

  return (
    <section className="w-full flex flex-col gap-2">
      {grid.map((_, rowIndex) => (
        <div className="w-full flex gap-2" key={rowIndex}>
          {(attemptWords[rowIndex] ? [...attemptWords[rowIndex]] : grid).map(
            (cell: any, cellIndex) => (
              <div
                key={cellIndex}
                style={{
                  width: `calc((100% - (${
                    hiddenWordLength - 1
                  } * 0.5rem)) / ${hiddenWordLength})`,
                }}
                className="overflow-hidden aspect-square border-2 rounded border-solid border-slate-600 dark:border-slate-300"
              >
                {cell && (
                  <motion.div
                    className="w-full h-full p-1 text-slate-900 font-black  flex items-center justify-center"
                    key={cell}
                    initial={{ y: "-150%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.3, delay: 0.025 * cellIndex }}
                    style={{
                      fontSize: "clamp(1rem, 10vw, 2rem)",
                      backgroundColor: hiddenWord.includes(cell)
                        ? cell === hiddenWord[cellIndex]
                          ? "#84cc16"
                          : "#f59e0b"
                        : "#a3a3a3",
                    }}
                  >
                    {cell}
                  </motion.div>
                )}
              </div>
            )
          )}
        </div>
      ))}
    </section>
  );
};

export default AttemptsGrid;
