"use client";

import styles from "./page.module.css";

import { useEffect, useState } from "react";

import { Keyboard } from "../components/Keyboard";
import { LetterState } from "../components/LetterState";
import { RemainingWords } from "../components/RemainingWords";
import { TileRowGrid } from "../components/TileRowGrid";
import { WordleAnswer } from "../components/WordleAnswer";

import { getState } from "../helpers/state";

import * as Constants from "../constants/constants";

export default function Home() {
  const [wordleAnswer, setWordleAnswer] = useState(Constants.DEFAULT_ANSWER);
  const [wordleAnswers, setWordleAnswers] = useState(new Set());
  const [wordleGuesses, setWordleGuesses] = useState(new Set());
  const [currentGuess, setCurrentGuess] = useState("");
  const [guessedWordCount, setGuessedWordCount] = useState(0);
  const [guessedWords, setGuessedWords] = useState(getInitialGuesses());
  const [letterStates, setLetterStates] = useState(getInitialStates());

  function getInitialGuesses() {
    return Array<string>(Constants.MAX_GUESS_COUNT).fill(Constants.EMPTY_WORD);
  }

  function getInitialStates() {
    let states = new Map();

    "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").forEach((letter) => {
      states.set(letter, LetterState.unknown);
    });

    states.set(Constants.ENTER_KEY, LetterState.unknown);
    states.set(Constants.DELETE_KEY, LetterState.unknown);

    return states;
  }

  useEffect(() => {
    fetchWords(Constants.WORDLE_GUESSES)
      .then((words: Set<string>) => {
        setWordleGuesses(words);
      })
      .catch((error) => {
        console.error("Error fetching guesses:", error);
      });
  }, []);

  useEffect(() => {
    fetchWords(Constants.WORDLE_ANSWERS)
      .then((words: Set<string>) => {
        setWordleAnswers(words);
      })
      .catch((error) => {
        console.error("Error fetching answers:", error);
      });
  }, []);

  function fetchWords(file: string) {
    return new Promise<Set<string>>((resolve, reject) => {
      fetch(file)
        .then((result) => result.text())
        .then((text) => {
          resolve(new Set(text.split(/[\r\n]+/)));
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  function onUpdateWordleAnswer(word: string) {
    setWordleAnswer(word);
  }

  function onKeyboardInput(input: string) {
    if (guessedWordCount === Constants.MAX_GUESS_COUNT) {
      return;
    }

    if (input === Constants.ENTER_KEY) {
      if (isValidWord(currentGuess)) {
        addGuess(currentGuess);
      }
    } else if (input === Constants.DELETE_KEY) {
      if (currentGuess.length > 0) {
        setCurrentGuess(currentGuess.slice(0, -1));
      }
    } else {
      if (currentGuess.length < Constants.MAX_WORD_LENGTH) {
        setCurrentGuess(currentGuess + input);
      }
    }
  }

  function addGuess(word: string) {
    const nextGuessedWords = guessedWords.map((existingWord, i) => {
      if (i === guessedWordCount) {
        return word;
      } else {
        return existingWord;
      }
    });

    setGuessedWords(nextGuessedWords);
    setGuessedWordCount(guessedWordCount + 1);
    setCurrentGuess("");

    updateLetterStates(nextGuessedWords);
  }

  function updateLetterStates(words: Array<string>) {
    let nextLetterStates = letterStates;

    words.forEach((word) => {
      const state = getState(word, wordleAnswer);
      state.forEach((s, i) => {
        const currentState = nextLetterStates.get(word[i]);
        if (currentState !== LetterState.correct) {
          nextLetterStates.set(word[i], s);
        }
      });
    });

    setLetterStates(nextLetterStates);
  }

  function isValidWord(word: string) {
    if (word.length !== Constants.MAX_WORD_LENGTH) {
      return false;
    }

    for (let guessedWord of guessedWords) {
      if (guessedWord === word) {
        return false;
      }
    }

    return wordleAnswers.has(word) || wordleGuesses.has(word);
  }

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <div className="row">
          <div className="column">
            <TileRowGrid guessedWords={guessedWords} wordle={wordleAnswer} />
          </div>
          <div className="column">
            <div>
              <WordleAnswer onUpdateWordleAnswer={onUpdateWordleAnswer} />
            </div>
            <div className="remaining-words">
              <RemainingWords
                title="Possible Guesses"
                guessedWords={guessedWords}
                wordle={wordleAnswer}
                candidateWords={wordleGuesses}
              />
              <RemainingWords
                title="Possible Answers"
                guessedWords={guessedWords}
                wordle={wordleAnswer}
                candidateWords={wordleAnswers}
              />
            </div>
          </div>
          <div className="row"></div>
          <hr />
          <Keyboard letterStates={letterStates} onInput={onKeyboardInput} />
        </div>
      </div>
    </main>
  );
}
