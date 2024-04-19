import { useState } from "react";
import * as Constants from "../constants/constants";

export function Keyboard({ onGuessWord }) {
  const [currentGuess, setCurrentGuess] = useState("");

  function onInputChanged(e) {
    let nextGuess = e.target.value.toUpperCase();
    if (nextGuess.length === Constants.MAX_WORD_LENGTH) {
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
