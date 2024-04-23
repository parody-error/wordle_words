import { LetterState } from "./LetterState";
import { KeyStyle } from "../constants/KeyStyle";

export function KeyboardKey({ value, style, state, onPress }) {
  return (
    <div
      className={style}
      data-state={LetterState[state]}
      onClick={() => onPress(value)}
    >
      {value}
    </div>
  );
}
