"use client";

import styles from "./page.module.css";

import { useState } from "react";

import { Keyboard } from "../components/Keyboard";
import { TileRowGrid } from "../components/TileRowGrid";
import * as Constants from "../constants/constants";

const wordle = "TITHE";

export default function Home() {
  const [guessedWordCount, setGuessedWordCount] = useState(0);
  const [guessedWords, setGuessedWords] = useState(
    Array<string>(Constants.MAX_GUESS_COUNT).fill(Constants.EMPTY_WORD)
  );

  function onGuessWord(guessedWord: string) {
    if (guessedWordCount === Constants.MAX_GUESS_COUNT) {
      return;
    }

    const nextGuessedWords = guessedWords.map((existingWord, i) => {
      if (i === guessedWordCount) {
        return guessedWord.toUpperCase();
      } else {
        return existingWord;
      }
    });

    setGuessedWords(nextGuessedWords);
    setGuessedWordCount(guessedWordCount + 1);
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
