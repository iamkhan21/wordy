import React from "react";

type Props = {
  hiddenWordLength: number;
  onWordSubmit: (word: string) => void;
  disabled: boolean;
};

const WordInput: React.FC<Props> = ({
  disabled,
  onWordSubmit,
  hiddenWordLength,
}) => {
  const input = React.useRef<HTMLInputElement>(null);
  const form = React.useRef<HTMLFormElement>(null);

  React.useEffect(() => {
    if (!disabled) {
      form.current?.reset();
      input.current?.focus();
    }
  }, [disabled]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const word = input.current?.value || "";
    onWordSubmit(word.toUpperCase());

    form.current?.reset();
  }

  return (
    <form
      onSubmit={handleSubmit}
      ref={form}
      className="w-full max-w-prose space-y-4"
    >
      <div>
        <input
          ref={input}
          name="word"
          type="text"
          required
          placeholder="Type a word here"
          minLength={hiddenWordLength}
          maxLength={hiddenWordLength}
          pattern="[A-Za-z]+"
          title={`Must be ${hiddenWordLength} letters`}
          autoComplete="off"
          className="text-center bg-slate-100 border-2 border-solid text-slate-900 rounded block w-full p-2 dark:bg-slate-700 dark:placeholder-slate-300 dark:text-slate-50 border-slate-600 dark:border-slate-300"
        />
      </div>
      <div>
        <button
          disabled={disabled}
          className="w-full text-white bg-blue-700 hover:bg-blue-800 border-solid focus:ring-4 focus:ring-blue-300 font-medium rounded px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-blue-300 dark:focus:ring-blue-800 disabled:opacity-50 transition"
          type="submit"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default WordInput;
