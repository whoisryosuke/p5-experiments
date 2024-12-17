import React from "react";
import { Note, useInputStore } from "../../store/input";
import {
  KeyboardKeyBlackLabel,
  StyledKeyboardKeyBlack,
} from "./KeyboardKeyStyled";

type Props = {
  label: Note;
};

const KeyboardKeyBlack = ({ label, ...props }: Props) => {
  const { input, appInput } = useInputStore();
  const isPressed = input[label];
  const shouldPress = appInput[label];
  return (
    <StyledKeyboardKeyBlack
      pressed={isPressed}
      highlight={shouldPress}
      {...props}
    >
      {label && <KeyboardKeyBlackLabel>{label}</KeyboardKeyBlackLabel>}
    </StyledKeyboardKeyBlack>
  );
};

export default KeyboardKeyBlack;
