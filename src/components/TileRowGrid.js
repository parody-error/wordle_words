import { TileRow } from "./TileRow";

export function TileRowGrid({ letters }) {
  const rowLetters = [
    letters.slice(0, 5),
    letters.slice(5, 10),
    letters.slice(10, 15),
    letters.slice(15, 20),
    letters.slice(20, 25),
  ];

  return (
    <div>
      {rowLetters.map((l, i) => (
        <TileRow key={i} letters={l}></TileRow>
      ))}
    </div>
  );
}
