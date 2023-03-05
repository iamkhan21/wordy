import React from "react";
import AttemptsGrid from "./AttemptsGrid";
import WordInput from "./WordInput";
import wretch from "wretch";

function getRandomWord(): Promise<string> {
  return wretch(
    "https://random-word-api.vercel.app/api?words=1&type=uppercase&length=8"
  )
    .get()
    .json((json) => json[0]);
}

function getWordDefinition(word: string): Promise<string> {
  return wretch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .get()
    .json(
      (json) =>
        json[0]?.meanings[0]?.definitions[0]?.definition ||
        "Definition not found"
    );
}

const Statuses = {
  Initializing: "initializing",
  Playing: "playing",
  Won: "won",
  Lost: "lost",
};

type State = {
  hiddenWord: string;
  hiddenWordDefinition: string;
  attemptWords: string[];
  status: (typeof Statuses)[keyof typeof Statuses];
};

const Game = () => {
  const [state, dispatch] = React.useReducer(
    (oldState: State, newState: Partial<State>) => ({
      ...oldState,
      ...newState,
    }),
    {
      hiddenWord: "",
      hiddenWordDefinition: "",
      attemptWords: [],
      status: Statuses.Initializing,
    }
  );

  React.useEffect(() => {
    if (state.status === Statuses.Initializing) {
      (async () => {
        const word = await getRandomWord();
        const definition = await getWordDefinition(word);

        dispatch({
          status: Statuses.Playing,
          attemptWords: [],
          hiddenWord: word,
          hiddenWordDefinition: definition,
        });
      })();
    }
  }, [state.status]);

  function handleWordSubmit(word: string) {
    dispatch({ attemptWords: [...state.attemptWords, word] });

    if (word === state.hiddenWord) {
      return dispatch({ status: "won" });
    }

    if (state.attemptWords.length === state.hiddenWord.length - 1) {
      return dispatch({ status: "lost" });
    }
  }

  return (
    <article className="h-full flex flex-col items-center justify-center gap-6 max-w-md m-auto">
      <AttemptsGrid
        hiddenWord={state.hiddenWord}
        attemptWords={state.attemptWords}
      />

      <p className="py-4">
        {state.status === Statuses.Initializing
          ? "Initializing..."
          : state.hiddenWordDefinition}
      </p>

      {state.status === Statuses.Won && <p>You won!</p>}
      {state.status === Statuses.Lost && <p>You lost!</p>}
      {state.status === Statuses.Playing && (
        <WordInput
          hiddenWordLength={state.hiddenWord.length}
          onWordSubmit={handleWordSubmit}
        />
      )}
      {state.status !== Statuses.Initializing && (
        <>
          <hr className="w-full" />
          <button
            type="button"
            className="w-full text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 border-solid focus:outline-red-300 focus:ring-red-300 font-bold rounded px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900 bg-transparent transition"
            onClick={() => {
              dispatch({
                status: Statuses.Initializing,
                attemptWords: [],
              });
            }}
          >
            New round
          </button>
        </>
      )}
    </article>
  );
};

export default Game;
