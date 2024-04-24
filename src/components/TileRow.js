import { Tile } from "./Tile";
import { getGuessedState, getGuessingState } from "../helpers/state";

import * as Constants from "../constants/constants";

export function TileRow({ word, isGuessing, wordle }) {
  let tileLetters = word.padEnd(Constants.MAX_WORD_LENGTH, " ").split("");
  let state = isGuessing
    ? getGuessingState(word)
    : getGuessedState(word, wordle);

  return (
    <div className="tile-row-container">
      {tileLetters.map((l, i) => (
        <Tile key={i} letter={l} state={state[i]} />
      ))}
    </div>
  );
}
