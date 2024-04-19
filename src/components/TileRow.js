import { Tile } from "./Tile";
import { LetterState } from "./LetterState.ts";

export function TileRow({ word, wordle }) {
  function getState() {
    let state = Array(5).fill(LetterState.absent);
    if (word[0] === " ") {
      return state;
    }

    let letters = new Set(word.split(""));
    letters.forEach((letter) => {
      let wordIndices = getIndices(letter, word);
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
      {word.split("").map((l, i) => (
        <Tile key={i} letter={l} state={state[i]} />
      ))}
    </div>
  );
}
