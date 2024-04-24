import { LetterState } from "../components/LetterState";
import { getGuessedState } from "../helpers/state";

export function getCandidateWords(guessedWord, wordle, candidates) {
  let state = getGuessedState(guessedWord, wordle);

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

  presentIndices.forEach((i) => {
    let letter = guessedWord[i];
    let letterCount = countPresent1(guessedWord, state, letter);

    words = words.filter((candidateWord) => {
      return letterCount <= countPresent2(candidateWord, state, letter);
    });
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

function countPresent1(guessedWord, state, letter) {
  let count = 0;

  for (let i = 0; i < guessedWord.length; ++i) {
    if (state[i] === LetterState.present && guessedWord[i] === letter) {
      ++count;
    }
  }

  return count;
}

function countPresent2(guessedWord, state, letter) {
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
