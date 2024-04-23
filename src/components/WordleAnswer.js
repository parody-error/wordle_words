import { useState } from "react";
import * as Constants from "../constants/constants";

export function WordleAnswer({ onUpdateWordleAnswer }) {
  const [wordleAnswer, setWordleAnswer] = useState(
    Constants.DEFAULT_WORDLE_WORD
  );

  function onChange(word) {
    if (word.length === Constants.MAX_WORD_LENGTH) {
      onUpdateWordleAnswer(word.toUpperCase());
    }

    setWordleAnswer(word);
  }

  return (
    <input
      value={wordleAnswer}
      placeholder="Wordle Word"
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
