import * as Constants from "../constants/constants";

import { useState } from "react";
import { KeyboardKey } from "./KeyboardKey";
import { KeyStyle } from "../constants/KeyStyle";
import { LetterState } from "./LetterState";

export function Keyboard({ onGuessWord }) {
  const [currentGuess, setCurrentGuess] = useState("");

  function onInputChanged(e) {
    let nextGuess = e.target.value.toUpperCase();
    if (nextGuess.length === Constants.MAX_WORD_LENGTH) {
      onGuessWord(nextGuess);
      nextGuess = "";
      e.target.value = "";
    }

    setCurrentGuess(nextGuess);
  }

  function onUpdateGuess(key) {
    if (key === Constants.ENTER_KEY) {
      if (currentGuess.length == Constants.MAX_WORD_LENGTH) {
        onGuessWord(currentGuess);
        setCurrentGuess(Constants.EMPTY_WORD);
      }
    } else if (key === Constants.DELETE_KEY) {
      if (currentGuess.length > 0) {
        setCurrentGuess(currentGuess.slice(0, -1));
        console.log(currentGuess.slice(0, -1));
      }
    } else {
      if (currentGuess.length < Constants.MAX_WORD_LENGTH) {
        setCurrentGuess(currentGuess + key);
        console.log(currentGuess + key);
      }
    }
  }

  let firstRowKeys = Array(
    { value: "A", style: KeyStyle.LETTER, state: LetterState.unknown },
    { value: "L", style: KeyStyle.LETTER, state: LetterState.unknown },
    { value: "I", style: KeyStyle.LETTER, state: LetterState.unknown },
    { value: "B", style: KeyStyle.LETTER, state: LetterState.unknown }
  );

  let thirdRowKeys = Array(
    {
      value: Constants.ENTER_KEY,
      style: KeyStyle.SPECIAL,
      state: LetterState.unknown,
    },
    { value: "Y", style: KeyStyle.LETTER, state: LetterState.unknown },
    {
      value: Constants.DELETE_KEY,
      style: KeyStyle.SPECIAL,
      state: LetterState.unknown,
    }
  );

  return (
    <div>
      <div>
        {firstRowKeys.map((k) => (
          <KeyboardKey
            key={k.value}
            value={k.value}
            style={k.style}
            state={k.state}
            onPress={onUpdateGuess}
          />
        ))}
        {thirdRowKeys.map((k) => (
          <KeyboardKey
            key={k.value}
            value={k.value}
            style={k.style}
            state={k.state}
            onPress={onUpdateGuess}
          />
        ))}
      </div>
      <input
        id="KeyboardInput"
        placeholder="Keyboard"
        onChange={(e) => onInputChanged(e)}
      />
    </div>
  );
}
