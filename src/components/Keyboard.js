import * as Constants from "../constants/constants";

import { KeyboardKey } from "./KeyboardKey";
import { KeyStyle } from "../constants/KeyStyle";
import { LetterState } from "./LetterState";

export function Keyboard({ letterStates, onInput }) {
  let firstRowKeys = Array(
    { value: "Q", style: KeyStyle.LETTER },
    { value: "W", style: KeyStyle.LETTER },
    { value: "E", style: KeyStyle.LETTER },
    { value: "R", style: KeyStyle.LETTER },
    { value: "T", style: KeyStyle.LETTER },
    { value: "Y", style: KeyStyle.LETTER },
    { value: "U", style: KeyStyle.LETTER },
    { value: "I", style: KeyStyle.LETTER },
    { value: "O", style: KeyStyle.LETTER },
    { value: "P", style: KeyStyle.LETTER }
  );

  let secondRowKeys = Array(
    { value: "A", style: KeyStyle.LETTER },
    { value: "S", style: KeyStyle.LETTER },
    { value: "D", style: KeyStyle.LETTER },
    { value: "F", style: KeyStyle.LETTER },
    { value: "G", style: KeyStyle.LETTER },
    { value: "H", style: KeyStyle.LETTER },
    { value: "J", style: KeyStyle.LETTER },
    { value: "K", style: KeyStyle.LETTER },
    { value: "L", style: KeyStyle.LETTER }
  );

  let thirdRowKeys = Array(
    {
      value: Constants.ENTER_KEY,
      style: KeyStyle.SPECIAL,
      state: LetterState.unknown,
    },
    { value: "Z", style: KeyStyle.LETTER },
    { value: "X", style: KeyStyle.LETTER },
    { value: "C", style: KeyStyle.LETTER },
    { value: "V", style: KeyStyle.LETTER },
    { value: "B", style: KeyStyle.LETTER },
    { value: "N", style: KeyStyle.LETTER },
    { value: "M", style: KeyStyle.LETTER },
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
              state={letterStates.get(k.value)}
              onPress={onInput}
            />
          ))}
          <div className="row">
            {secondRowKeys.map((k) => (
              <KeyboardKey
                key={k.value}
                value={k.value}
                style={k.style}
                state={letterStates.get(k.value)}
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
              state={letterStates.get(k.value)}
              onPress={onInput}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
