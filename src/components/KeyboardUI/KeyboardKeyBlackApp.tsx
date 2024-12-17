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
  const { appInput } = useInputStore();
  const isPressed = appInput[label];
  return (
    <StyledKeyboardKeyBlack pressed={isPressed} {...props}>
      {label && <KeyboardKeyBlackLabel>{label}</KeyboardKeyBlackLabel>}
    </StyledKeyboardKeyBlack>
  );
};

export default KeyboardKeyBlack;
