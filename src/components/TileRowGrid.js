import { TileRow } from "./TileRow";

export function TileRowGrid({ words, wordle }) {
  return (
    <div>
      {words.map((w, i) => (
        <TileRow key={i} word={w} wordle={wordle}></TileRow>
      ))}
    </div>
  );
}
