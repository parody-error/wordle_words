import { TileRow } from "./TileRow";

import * as Constants from "../constants/constants";

export function TileRowGrid({ currentGuess, guessedWords, wordle }) {
  let showCurrentGuess = guessedWords.length < Constants.MAX_GUESS_COUNT;
  let emptyWordCount = Constants.MAX_GUESS_COUNT - (guessedWords.length + 1);
  let emptyWords = Array(Math.max(0, emptyWordCount)).fill(
    Constants.EMPTY_WORD
  );

  return (
    <div>
      {guessedWords.map((w) => (
        <TileRow
          key="KeyboardRow1"
          word={w}
          isGuessing={false}
          wordle={wordle}
        ></TileRow>
      ))}
      {showCurrentGuess && (
        <TileRow
          key="KeyboardRow2"
          word={currentGuess}
          isGuessing={true}
          wordle={wordle}
        ></TileRow>
      )}
      {emptyWords.map((w) => (
        <TileRow
          key="KeyboardRow3"
          word={w}
          isGuessing={true}
          wordle={wordle}
        ></TileRow>
      ))}
    </div>
  );
}
