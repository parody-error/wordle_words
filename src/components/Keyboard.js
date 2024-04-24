import * as Constants from "../constants/constants";

import { KeyboardKey } from "./KeyboardKey";
import { KeyStyle } from "../constants/KeyStyle";
import { LetterState } from "./LetterState";

export function Keyboard({ currentGuess, onInput }) {
  let firstRowKeys = Array(
    { value: "Q", style: KeyStyle.LETTER, state: LetterState.unknown },
    { value: "W", style: KeyStyle.LETTER, state: LetterState.unknown },
    { value: "E", style: KeyStyle.LETTER, state: LetterState.unknown },
    { value: "R", style: KeyStyle.LETTER, state: LetterState.unknown },
    { value: "T", style: KeyStyle.LETTER, state: LetterState.unknown },
    { value: "Y", style: KeyStyle.LETTER, state: LetterState.unknown },
    { value: "U", style: KeyStyle.LETTER, state: LetterState.unknown },
    { value: "I", style: KeyStyle.LETTER, state: LetterState.unknown },
    { value: "O", style: KeyStyle.LETTER, state: LetterState.unknown },
    { value: "P", style: KeyStyle.LETTER, state: LetterState.unknown }
  );

  let secondRowKeys = Array(
    { value: "A", style: KeyStyle.LETTER, state: LetterState.unknown },
    { value: "S", style: KeyStyle.LETTER, state: LetterState.unknown },
    { value: "D", style: KeyStyle.LETTER, state: LetterState.unknown },
    { value: "F", style: KeyStyle.LETTER, state: LetterState.unknown },
    { value: "G", style: KeyStyle.LETTER, state: LetterState.unknown },
    { value: "H", style: KeyStyle.LETTER, state: LetterState.unknown },
    { value: "J", style: KeyStyle.LETTER, state: LetterState.unknown },
    { value: "K", style: KeyStyle.LETTER, state: LetterState.unknown },
    { value: "L", style: KeyStyle.LETTER, state: LetterState.unknown }
  );

  let thirdRowKeys = Array(
    {
      value: Constants.ENTER_KEY,
      style: KeyStyle.SPECIAL,
      state: LetterState.unknown,
    },
    { value: "Z", style: KeyStyle.LETTER, state: LetterState.unknown },
    { value: "X", style: KeyStyle.LETTER, state: LetterState.unknown },
    { value: "C", style: KeyStyle.LETTER, state: LetterState.unknown },
    { value: "V", style: KeyStyle.LETTER, state: LetterState.unknown },
    { value: "B", style: KeyStyle.LETTER, state: LetterState.unknown },
    { value: "N", style: KeyStyle.LETTER, state: LetterState.unknown },
    { value: "M", style: KeyStyle.LETTER, state: LetterState.unknown },
    {
      value: Constants.DELETE_KEY,
      style: KeyStyle.SPECIAL,
      state: LetterState.unknown,
    }
  );

  return (
    <div>
      <div>
        <div className="row">
          {firstRowKeys.map((k) => (
            <KeyboardKey
              key={k.value}
              value={k.value}
              style={k.style}
              state={k.state}
              onPress={onInput}
            />
          ))}
          <div className="row">
            {secondRowKeys.map((k) => (
              <KeyboardKey
                key={k.value}
                value={k.value}
                style={k.style}
                state={k.state}
                onPress={onInput}
              />
            ))}
          </div>
        </div>
        <div className="row">
          {thirdRowKeys.map((k) => (
            <KeyboardKey
              key={k.value}
              value={k.value}
              style={k.style}
              state={k.state}
              onPress={onInput}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
