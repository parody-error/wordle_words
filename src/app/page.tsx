"use client";

import styles from "./page.module.css";

import { useState } from "react";
import { TileRowGrid } from "../components/TileRowGrid"
import { Keyboard } from "../components/Keyboard"

const MAX_COLUMNS = 5;
const MAX_ROWS = 5;
const INVALID_INDEX = -1;

export default function Home() {
  const [currentRow, setCurrentRow] = useState(0);
  const [currentCol, setCurrentCol] = useState(0);
  const [guessedLetters, setGuessedLetters] = useState(Array(25).fill("A"));

  function onKeyPress(nextCharacter: string) {
    if( currentRow == INVALID_INDEX || currentCol == INVALID_INDEX) {
      return;
    }

    const nextGuessedLetters = guessedLetters.map((existingCharacter, index) => {
      if( index == currentRow * MAX_ROWS + currentCol ) {
        return nextCharacter;
      } else {
        return existingCharacter;
      }
    });

    setGuessedLetters(nextGuessedLetters);

    let nextRow = currentRow;
    let nextCol = currentCol + 1;
    
    if( nextCol == MAX_COLUMNS ) {
      nextCol = 0;
      nextRow += 1;
    }

    if( nextRow == MAX_ROWS ) {
      nextCol = INVALID_INDEX;
      nextCol = INVALID_INDEX;
      nextCharacter = '';
    }

    setCurrentRow(nextRow);
    setCurrentCol(nextCol);
  }

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <TileRowGrid letters={guessedLetters} />
        <Keyboard onKeyPress={onKeyPress}/>
      </div>
    </main>
  );
}
