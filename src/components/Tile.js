import { LetterState } from "./LetterState";

export function Tile({ letter, state }) {
  return (
    <div
      className="Tile-module_tile__UWEHN"
      data-state={LetterState[state]}
      data-animation="idle"
      data-testid="tile"
    >
      {letter}
    </div>
  );
}
