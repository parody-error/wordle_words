import { getCandidateWords } from "../helpers/candidates";

export function RemainingWords({ guessedWord, wordle, candidateWords }) {
  let words = getCandidateWords(guessedWord, wordle, [...candidateWords]);
  if (words.length < 10) {
    console.log("W:", words);
  }

  return (
    <div>
      <b className="remaining-words">{guessedWord}</b>
    </div>
  );
}
