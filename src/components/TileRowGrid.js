import { TileRow } from "./TileRow";

export function TileRowGrid({ words }) {
  return (
    <div>
      {words.map((w, i) => (
        <TileRow key={i} word={w}></TileRow>
      ))}
    </div>
  );
}
