"use client";

import styles from "./page.module.css";

import { useEffect, useState } from "react";

import { Keyboard } from "../components/Keyboard";
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
    fetch(Constants.WORDLE_GUESSES)
      .then((result) => result.text())
      .then((text) => {
        setWordleGuesses(new Set(text.split(/[\r\n]+/)));
      })
      .catch((error) => {
        console.log("Error loading words:", error);
        setWordleGuesses(new Set());
      });
  }, []);

  useEffect(() => {
    fetch(Constants.WORDLE_ANSWERS)
      .then((result) => result.text())
      .then((text) => {
        setWordleAnswers(new Set(text.split(/[\r\n]+/)));
      })
      .catch((error) => {
        console.log("Error loading words:", error);
        setWordleAnswers(new Set());
      });
  }, []);

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

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <TileRowGrid words={guessedWords} wordle={wordle} />
        <Keyboard onGuessWord={onGuessWord} />
      </div>
    </main>
  );
}
