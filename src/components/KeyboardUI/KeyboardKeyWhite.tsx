import React, { PropsWithChildren } from "react";
import styled from "styled-components";
import { Note, useInputStore } from "../../store/input";
import { KEYBOARD_WHITE_KEY_WIDTH } from "../../helpers/constants";

type StyledKeyboardKeyWhiteProps = PropsWithChildren<{
  pressed: boolean;
}>;

const StyledKeyboardKeyWhite = styled.div<StyledKeyboardKeyWhiteProps>(
  {
    // width: KEYBOARD_WHITE_KEY_WIDTH,
    height: 100,
    backgroundColor: "rgba(255,255,255,0.5)",
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end",
    flex: 1,
  },
  (props) =>
    props.pressed && {
      backgroundColor: "rgba(0,55,255,0.5)",
    }
);

const KeyboardKeyWhiteLabel = styled.span({
  fontSize: "0.5em",
  color: "black",
});

type Props = {
  label: Note;
};

const KeyboardKeyWhite = ({ label, ...props }: Props) => {
  const { input } = useInputStore();
  const isPressed = input[label];
  return (
    <StyledKeyboardKeyWhite pressed={isPressed} {...props}>
      {label && <KeyboardKeyWhiteLabel>{label}</KeyboardKeyWhiteLabel>}
    </StyledKeyboardKeyWhite>
  );
};

export default KeyboardKeyWhite;
