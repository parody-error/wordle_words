import { useState } from "react";

const MAX_WORD_LENGTH = 5;

export function Keyboard({ onGuessWord, onKeyPress }) {
  const [currentGuess, setCurrentGuess] = useState("");

  function onInputChanged(e) {
    let nextGuess = e.target.value;
    if (nextGuess.length === MAX_WORD_LENGTH) {
      onGuessWord(nextGuess);
      nextGuess = "";
      e.target.value = "";
    }

    setCurrentGuess(nextGuess);

    onKeyPress(event.target.value.slice(-1));
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
