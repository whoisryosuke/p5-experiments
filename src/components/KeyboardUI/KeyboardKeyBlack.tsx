import React, { PropsWithChildren } from "react";
import styled from "styled-components";
import { Note, useInputStore } from "../../store/input";
import {
  KEYBOARD_BLACK_KEY_WIDTH,
  KEYBOARD_WHITE_KEY_WIDTH,
} from "../../helpers/constants";

type StyledKeyboardKeyWhiteProps = PropsWithChildren<{
  pressed: boolean;
}>;

const StyledKeyboardKeyBlack = styled.div<StyledKeyboardKeyWhiteProps>`
  width: 50%;
  height: 50px;
  background-color: rgba(0, 0, 0, 1);
  text-align: center;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  border-bottom-left-radius: 2px;
  border-bottom-right-radius: 2px;
  right: -25%;
  top: 0;
  z-index: 420;

  &:hover {
    background-color: rgba(0, 0, 100, 1);
  }

  ${(props) =>
    props.pressed &&
    `
      background-color: rgba(0,55,255,0.5);
  `}
`;

const KeyboardKeyBlackLabel = styled.span`
  font-size: 0.5em;
  font-weight: bold;
  color: rgba(255, 255, 255, 0.5);
  pointer-events: none;
`;

type Props = {
  label: Note;
};

const KeyboardKeyBlack = ({ label, ...props }: Props) => {
  const { input } = useInputStore();
  const isPressed = input[label];
  return (
    <StyledKeyboardKeyBlack pressed={isPressed} {...props}>
      {label && <KeyboardKeyBlackLabel>{label}</KeyboardKeyBlackLabel>}
    </StyledKeyboardKeyBlack>
  );
};

export default KeyboardKeyBlack;
