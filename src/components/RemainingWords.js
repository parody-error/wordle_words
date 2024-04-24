import { useState } from "react";
import { getCandidateWords } from "../helpers/candidates";
import * as Constants from "../constants/constants";

export function RemainingWords({
  title,
  guessedWords,
  wordle,
  candidateWords,
}) {
  const [isCollapsed, setIsCollapsed] = useState(true);

  let words = [...candidateWords];

  for (let i = guessedWords.length - 1; i >= 0; --i) {
    if (guessedWords[i] !== Constants.EMPTY_WORD) {
      words = getCandidateWords(guessedWords[i], wordle, words);
    }
  }

  function onExpandCollapse() {
    if (!isCollapsed || words.length <= Constants.MAX_WORDS_DISPLAYED) {
      setIsCollapsed((c) => !c);
    }
  }

  let wordCount = `${words.length}`.padStart(5, "0");

  return (
    <div>
      <button
        type="button"
        className="collapsible"
        onClick={onExpandCollapse}
      >{`${title}: ${wordCount}`}</button>
      {!isCollapsed &&
        words.map((w) => (
          <p key={w} className="candidates">
            {w}
          </p>
        ))}
    </div>
  );
}
