import { TileRow } from "./TileRow";

export function TileRowGrid({ guessedWords, wordle }) {
  return (
    <div>
      {guessedWords.map((w, i) => (
        <TileRow key={i} guessedWord={w} wordle={wordle}></TileRow>
      ))}
    </div>
  );
}
