"use client";

import styles from "./page.module.css";

import { useEffect, useState } from "react";

import { Keyboard } from "../components/Keyboard";
import { RemainingWords } from "../components/RemainingWords";
import { TileRowGrid } from "../components/TileRowGrid";
import { WordleAnswer } from "../components/WordleAnswer";

import * as Constants from "../constants/constants";

export default function Home() {
  const [wordleAnswer, setWordleAnswer] = useState(
    Constants.DEFAULT_WORDLE_WORD
  );
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

  function onUpdateWordleAnswer(word: string) {
    setWordleAnswer(word);
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
          <Keyboard onGuessWord={onGuessWord} />
        </div>
      </div>
    </main>
  );
}
