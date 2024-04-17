"use client";

import { useState } from "react";
import { LetterState } from "./LetterState";

export function Tile() {
  const [state, setState] = useState(LetterState.absent);
  const [letter, setLetter] = useState("h");

  return (
    <div
      className="Tile-module_tile__UWEHN"
      role="img"
      aria-roledescription="tile"
      aria-label="1st letter, G, absent"
      data-state={LetterState[state]}
      data-animation="idle"
      data-testid="tile"
      aria-live="polite"
    >
      {letter}
    </div>
  );
}
