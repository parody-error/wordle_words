import { Tile } from "./Tile";
import { LetterState } from "./LetterState.ts";
import * as Constants from "../constants/constants";

export function TileRow({ guessedWord, wordle }) {
  function getState() {
    let state = Array(Constants.MAX_WORD_LENGTH).fill(LetterState.absent);
    if (guessedWord[0] === " ") {
      return state;
    }

    let letters = new Set(guessedWord.split(""));
    letters.forEach((letter) => {
      let wordIndices = getIndices(letter, guessedWord);
      let wordleIndices = getIndices(letter, wordle);

      wordIndices.forEach((index) => {
        if (wordleIndices.has(index)) {
          state[index] = LetterState.correct;
          wordleIndices.delete(index);
        } else if (wordleIndices.length === 0) {
          state[index] = LetterState.absent;
        } else {
          let wordIndex = -1;

          for (const wordleIndex of wordleIndices) {
            if (!wordIndices.has(wordleIndex)) {
              wordIndex = wordleIndex;
              break;
            }
          }

          if (wordIndex === -1) {
            state[index] = LetterState.absent;
          } else {
            state[index] = LetterState.present;
            wordleIndices.delete(wordIndex);
          }
        }
      });
    });

    return state;
  }

  function getIndices(letter, word) {
    let indices = new Set();

    for (let i = 0; i < word.length; ++i) {
      if (word[i] === letter) {
        indices.add(i);
      }
    }

    return indices;
  }

  let state = getState();

  return (
    <div className="tile-row-container">
      {guessedWord.split("").map((l, i) => (
        <Tile key={i} letter={l} state={state[i]} />
      ))}
    </div>
  );
}
