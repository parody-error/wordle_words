import { Tile } from "./Tile";

export function TileRow({ letters }) {
  return (
    <div className="tile-row-container">
      {letters.map((l, i) => (
        <Tile key={i} letter={l} />
      ))}
    </div>
  );
}
