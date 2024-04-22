import { getCandidateWords } from "../helpers/candidates";
import * as Constants from "../constants/constants";

export function RemainingWords({ guessedWords, wordle, candidateWords }) {
  let words = [...candidateWords];

  for (let i = guessedWords.length - 1; i >= 0; --i) {
    if (guessedWords[i] !== Constants.EMPTY_WORD) {
      words = getCandidateWords(guessedWords[i], wordle, words);
    }
  }

  return (
    <div>
      <b className="remaining-words">Remaining Words</b>
    </div>
  );
}
