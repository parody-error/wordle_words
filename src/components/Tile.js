import { useState } from "react";
import { LetterState } from "./LetterState";

export function Tile() {
  const [state, setState] = useState(LetterState.absent);
  const [letter, setLetter] = useState("H");

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
