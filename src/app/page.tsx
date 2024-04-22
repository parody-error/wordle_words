"use client";

import styles from "./page.module.css";

import { useEffect, useState } from "react";

import { Keyboard } from "../components/Keyboard";
import { RemainingWords } from "../components/RemainingWords";
import { TileRowGrid } from "../components/TileRowGrid";

import * as Constants from "../constants/constants";

const wordle = "TITHE";

export default function Home() {
  const [wordleAnswers, setWordleAnswers] = useState(new Set());
  const [wordleGuesses, setWordleGuesses] = useState(new Set());
  const [guessedWordCount, setGuessedWordCount] = useState(0);
  const [guessedWords, setGuessedWords] = useState(
    Array<string>(Constants.MAX_GUESS_COUNT).fill(Constants.EMPTY_WORD)
  );

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

  function onGuessWord(word: string) {
    if (guessedWordCount === Constants.MAX_GUESS_COUNT) {
      return;
    }

    if (!isValidWord(word)) {
      return;
    }

    const nextGuessedWords = guessedWords.map((existingWord, i) => {
      if (i === guessedWordCount) {
        return word;
      } else {
        return existingWord;
      }
    });

    setGuessedWords(nextGuessedWords);
    setGuessedWordCount(guessedWordCount + 1);
  }

  function isValidWord(word: string) {
    for (let guessedWord of guessedWords) {
      if (guessedWord === word) {
        return false;
      }
    }

    return wordleAnswers.has(word) || wordleGuesses.has(word);
  }

  let lastGuessedWord =
    guessedWordCount > 0 ? guessedWords[guessedWordCount - 1] : "";

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <TileRowGrid guessedWords={guessedWords} wordle={wordle} />
        <div>
          <RemainingWords
            guessedWord={lastGuessedWord}
            wordle={wordle}
            candidateWords={wordleAnswers}
          />
          <RemainingWords
            guessedWord={lastGuessedWord}
            wordle={wordle}
            candidateWords={wordleGuesses}
          />
        </div>
        <Keyboard onGuessWord={onGuessWord} />
      </div>
    </main>
  );
}
