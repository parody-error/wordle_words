import { useState } from "react";

const MAX_WORD_LENGTH = 5;

export function Keyboard({ onGuessWord }) {
  const [currentGuess, setCurrentGuess] = useState("");

  function onInputChanged(e) {
    let nextGuess = e.target.value;
    if (nextGuess.length === MAX_WORD_LENGTH) {
      onGuessWord(nextGuess);
      nextGuess = "";
      e.target.value = "";
    }

    setCurrentGuess(nextGuess);
  }

  return (
    <div>
      <input
        id="KeyboardInput"
        placeholder="Keyboard"
        onChange={(e) => onInputChanged(e)}
      />
    </div>
  );
}
