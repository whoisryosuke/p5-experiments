import React, { PropsWithChildren } from "react";
import styled from "styled-components";
import { BaseNote, Note, useInputStore } from "../../store/input";
import {
  KEYBOARD_WHITE_KEY_WIDTH,
  NOTE_LETTERS_BLACK,
} from "../../helpers/constants";
import KeyboardKeyBlackUser from "./KeyboardKeyBlackUser";
import {
  KeyboardKeyTypes,
  KeyboardKeyWhiteLabel,
  StyledKeyboardKeyContainer,
  StyledKeyboardKeyWhite,
} from "./KeyboardKeyStyled";

type Props = {
  label: Note;
  octave: number;
  type: KeyboardKeyTypes;
};

const KeyboardKeyWhite = ({ label, octave, type, ...props }: Props) => {
  const { input, appInput } = useInputStore();
  const isPressed = input[label];
  const shouldPress = appInput[label];
  const noteLetter = label.charAt(0);

  // We also render a black key if needed
  const showBlackKey = NOTE_LETTERS_BLACK.find((blackNote) =>
    blackNote.includes(noteLetter)
  );

  return (
    <StyledKeyboardKeyContainer {...props}>
      {showBlackKey && (
        <KeyboardKeyBlackUser label={`${showBlackKey}${octave}` as Note} />
      )}
      <StyledKeyboardKeyWhite pressed={isPressed} highlight={shouldPress}>
        {label && <KeyboardKeyWhiteLabel>{label}</KeyboardKeyWhiteLabel>}
      </StyledKeyboardKeyWhite>
    </StyledKeyboardKeyContainer>
  );
};

export default KeyboardKeyWhite;
