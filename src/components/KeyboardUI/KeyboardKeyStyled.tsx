import { PropsWithChildren } from "react";
import styled from "styled-components";

export const StyledKeyboardKeyContainer = styled.div`
  flex: 1;
  position: relative;
  border-width: 0;
`;

export type StyledKeyboardKeyWhiteProps = PropsWithChildren<{
  pressed: boolean;
  highlight?: boolean;
}>;

export const StyledKeyboardKeyWhite = styled.div<StyledKeyboardKeyWhiteProps>`
  height: 100px;
  background-color: rgba(255, 255, 255, 0.5);
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  flex: 1;
  border-left-width: 2px;
  border-top-width: 2px;
  border-bottom-width: 2px;
  border-right-width: 0;
  border-style: solid;
  border-color: rgba(200, 200, 200, 0.5);

  &:hover {
    background-color: rgba(0, 55, 255, 0.1);
  }

  ${(props) =>
    props.highlight &&
    `
      background-color: rgba(0, 174, 104, 0.9);
  `}
  ${(props) =>
    props.pressed &&
    `
      background-color: rgba(0,55,255,0.9);
    `}
`;

export const KeyboardKeyWhiteLabel = styled.span`
  font-size: 0.5em;
  font-weight: bold;
  color: rgba(0, 0, 0, 0.5);
  pointer-events: none;
`;

export const StyledKeyboardKeyBlack = styled.div<StyledKeyboardKeyWhiteProps>`
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
    props.highlight &&
    `
      color:rgba(0,0,0,0.9);
      background-color: rgba(0,255,55,0.5);

      & > span {
       color:rgba(0,0,0,0.9);
      }
  `}
  ${(props) =>
    props.pressed &&
    `
      background-color: rgba(0,55,255,0.5);
  `}
`;

export const KeyboardKeyBlackLabel = styled.span`
  font-size: 0.5em;
  font-weight: bold;
  color: rgba(255, 255, 255, 0.5);
  pointer-events: none;
`;

export type KeyboardKeyTypes = "user" | "app";
