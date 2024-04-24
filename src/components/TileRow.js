import { Tile } from "./Tile";
import { getDefaultState, getState } from "../helpers/state";

import * as Constants from "../constants/constants";

export function TileRow({ word, isGuess, wordle }) {
  let state = isGuess ? getState(word, wordle) : getDefaultState(word);
  let tileLetters = word.padEnd(Constants.MAX_WORD_LENGTH, " ").split("");

  return (
    <div className="tile-row-container">
      {tileLetters.map((l, i) => (
        <Tile key={i} letter={l} state={state[i]} />
      ))}
    </div>
  );
}
