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

const StyledKeyboardKeyBlack = styled.div<StyledKeyboardKeyWhiteProps>(
  {
    width: "50%",
    height: 50,
    backgroundColor: "rgba(0,0,0,0.75)",
    textAlign: "center",
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end",
    borderBottomLeftRadius: "2px",
    borderBottomRightRadius: "2px",
  },
  (props) =>
    props.pressed && {
      backgroundColor: "rgba(0,55,255,0.5)",
    }
);

const KeyboardKeyBlackLabel = styled.span({
  fontSize: "0.5em",
  color: "rgba(255,255,255,0.5)",
});

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
