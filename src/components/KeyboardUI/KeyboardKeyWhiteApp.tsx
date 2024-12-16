import React, { PropsWithChildren } from "react";
import styled from "styled-components";
import { BaseNote, Note, useInputStore } from "../../store/input";
import {
  KEYBOARD_WHITE_KEY_WIDTH,
  NOTE_LETTERS_BLACK,
} from "../../helpers/constants";
import KeyboardKeyBlack from "./KeyboardKeyBlack";
import {
  KeyboardKeyWhiteLabel,
  StyledKeyboardKeyContainer,
  StyledKeyboardKeyWhite,
} from "./KeyboardKeyStyled";

type Props = {
  label: Note;
  octave: number;
};

const KeyboardKeyWhite = ({ label, octave, ...props }: Props) => {
  const { appInput } = useInputStore();
  const isPressed = appInput[label];
  const noteLetter = label.charAt(0);

  // We also render a black key if needed
  const showBlackKey = NOTE_LETTERS_BLACK.find((blackNote) =>
    blackNote.includes(noteLetter)
  );

  return (
    <StyledKeyboardKeyContainer {...props}>
      {showBlackKey && (
        <KeyboardKeyBlack label={`${showBlackKey}${octave}` as Note} />
      )}
      <StyledKeyboardKeyWhite pressed={isPressed}>
        {label && <KeyboardKeyWhiteLabel>{label}</KeyboardKeyWhiteLabel>}
      </StyledKeyboardKeyWhite>
    </StyledKeyboardKeyContainer>
  );
};

export default KeyboardKeyWhite;
