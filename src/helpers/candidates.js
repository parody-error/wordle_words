import { LetterState } from "../components/LetterState";
import { getGuessedState } from "../helpers/state";

export function getCandidateWords(guessedWord, wordle, candidates) {
  let state = getGuessedState(guessedWord, wordle);

  const correctIndices = getIndices(state, LetterState.correct);
  const presentIndices = getIndices(state, LetterState.present);
  const absentIndices = getIndices(state, LetterState.absent);

  let words = [...candidates];

  correctIndices.forEach((i) => {
    words = words.filter((candidateWord) => {
      return guessedWord[i] === candidateWord[i];
    });
  });

  presentIndices.forEach((i) => {
    let letter = guessedWord[i];
    let count = countLetterInGuess(guessedWord, state, letter);

    words = words.filter((candidateWord) => {
      if (candidateWord[i] === letter) {
        return false;
      }

      return count <= countLetterInCandidate(candidateWord, state, letter);
    });
  });

  absentIndices.forEach((i) => {
    let letter = guessedWord[i];
    let count = countLetterInGuess(guessedWord, state, letter);

    words = words.filter((candidateWord) => {
      if (candidateWord[i] === letter) {
        return false;
      }

      return count >= countLetterInCandidate(candidateWord, state, letter);
    });
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

function countLetterInGuess(word, state, letter) {
  let count = 0;

  for (let i = 0; i < word.length; ++i) {
    if (state[i] === LetterState.present && word[i] === letter) {
      ++count;
    }
  }

  return count;
}

function countLetterInCandidate(word, state, letter) {
  let count = 0;

  for (let i = 0; i < word.length; ++i) {
    if (state[i] !== LetterState.correct && word[i] === letter) {
      ++count;
    }
  }

  return count;
}
