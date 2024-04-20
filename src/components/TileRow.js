import { Tile } from "./Tile";
import { getState } from "../helpers/state";

export function TileRow({ guessedWord, wordle }) {
  let state = getState(guessedWord, wordle);

  return (
    <div className="tile-row-container">
      {guessedWord.split("").map((l, i) => (
        <Tile key={i} letter={l} state={state[i]} />
      ))}
    </div>
  );
}
