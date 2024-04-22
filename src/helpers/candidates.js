import { LetterState } from "../components/LetterState";
import { getState } from "../helpers/state";

export function getCandidateWords(guessedWord, wordle, candidates) {
  let state = getState(guessedWord, wordle);

  const correctIndices = getIndices(state, LetterState.correct);
  const presentIndices = getIndices(state, LetterState.present);
  const absentIndices = getIndices(state, LetterState.absent);

  let words = candidates.filter((candidateWord) => {
    for (let i = 0; i < correctIndices.length; ++i) {
      let index = correctIndices[i];

      if (guessedWord[index] !== candidateWord[index]) {
        return false;
      }
    }

    return true;
  });

  words = words.filter((candidateWord) => {
    for (let i = 0; i < presentIndices.length; ++i) {
      let letter = guessedWord[presentIndices[i]];

      if (
        countPresent(guessedWord, state, letter) >
        countPresent(candidateWord, state, letter)
      ) {
        return false;
      }
    }

    return true;
  });

  words = words.filter((candidateWord) => {
    for (let i = 0; i < absentIndices.length; ++i) {
      let letter = guessedWord[absentIndices[i]];

      if (countAbsent(candidateWord, state, letter) > 0) {
        return false;
      }
    }

    return true;
  });

  return words;
}

function getIndices(state, letterState) {
  return state.reduce((indices, value, index) => {
    if (value == letterState) {
      indices.push(index);
    }
    return indices;
  }, []);
}

function countPresent(guessedWord, state, letter) {
  let count = 0;

  for (let i = 0; i < guessedWord.length; ++i) {
    if (state[i] !== LetterState.correct && guessedWord[i] === letter) {
      ++count;
    }
  }

  return count;
}

function countAbsent(guessedWord, state, letter) {
  let count = 0;

  for (let i = 0; i < guessedWord.length; ++i) {
    if (
      state[i] !== LetterState.correct &&
      state[i] !== LetterState.present &&
      guessedWord[i] === letter
    ) {
      ++count;
    }
  }

  return count;
}
