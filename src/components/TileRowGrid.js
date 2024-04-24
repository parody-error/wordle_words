import { useId } from "react";
import { TileRow } from "./TileRow";

import * as Constants from "../constants/constants";

export function TileRowGrid({ currentGuess, guessedWords, wordle }) {
  //#SB: clean this up, just testing
  let emptyWords = Array();
  for (
    let i = 0;
    i < Constants.MAX_GUESS_COUNT - guessedWords.length - 1;
    ++i
  ) {
    emptyWords.push(Constants.EMPTY_WORD);
  }

  return (
    <div>
      {guessedWords.map((w) => (
        <TileRow
          key={useId()}
          word={w}
          isGuess={true}
          wordle={wordle}
        ></TileRow>
      ))}
      <TileRow
        key={useId()}
        word={currentGuess}
        isGuess={false}
        wordle={wordle}
      ></TileRow>
      {emptyWords.map((w) => (
        <TileRow
          key={useId()}
          word={w}
          isGuess={false}
          wordle={wordle}
        ></TileRow>
      ))}
    </div>
  );
}
