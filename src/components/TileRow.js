import { Tile } from "./Tile";

export function TileRow({ word }) {
  console.log("Word:", word.split());
  return (
    <div className="tile-row-container">
      {word.split("").map((l, i) => (
        <Tile key={i} letter={l} />
      ))}
    </div>
  );
}
