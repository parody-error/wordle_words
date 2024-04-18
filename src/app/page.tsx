"use client";

import styles from "./page.module.css";

import { useState } from "react";

import { Keyboard } from "../components/Keyboard";
import { TileRowGrid } from "../components/TileRowGrid";

const MAX_COLUMNS = 5;
const MAX_ROWS = 5;
const INVALID_INDEX = -1;
const MAX_GUESSED_WORD_COUNT = 5;

export default function Home() {
  const [currentRow, setCurrentRow] = useState(0);
  const [currentCol, setCurrentCol] = useState(0);
  const [guessedLetters, setGuessedLetters] = useState(Array(25).fill("A"));
  const [guessedWords, setGuessedWords] = useState(Array<string>());

  const word = "STARE";

  function onGuessWord(guessedWord: string) {
    if (guessedWords.length === MAX_GUESSED_WORD_COUNT) {
      return;
    }

    const nextGuessedWords = [...guessedWords, guessedWord];
    console.log("Guessed words:", nextGuessedWords);
    setGuessedWords(nextGuessedWords);
  }

  function onKeyPress(nextLetter: string) {
    if (currentRow == INVALID_INDEX || currentCol == INVALID_INDEX) {
      return;
    }

    const nextGuessedLetters = guessedLetters.map(
      (existingCharacter, index) => {
        if (index == currentRow * MAX_ROWS + currentCol) {
          return nextLetter;
        } else {
          return existingCharacter;
        }
      }
    );

    setGuessedLetters(nextGuessedLetters);

    let nextRow = currentRow;
    let nextCol = currentCol + 1;

    if (nextCol == MAX_COLUMNS) {
      nextCol = 0;
      nextRow += 1;
    }

    if (nextRow == MAX_ROWS) {
      nextCol = INVALID_INDEX;
      nextCol = INVALID_INDEX;
    }

    setCurrentRow(nextRow);
    setCurrentCol(nextCol);
  }

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <TileRowGrid words={guessedWords} />
        <Keyboard onGuessWord={onGuessWord} onKeyPress={onKeyPress} />
      </div>
    </main>
  );
}
