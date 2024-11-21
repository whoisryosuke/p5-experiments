import React from "react";
import styled from "styled-components";
import { BASE_COLORS } from "themes/colors/base";
import { Sample } from "../types";
import { useClipStore } from "@/store/clip";

const StyledPadButton = styled.button`
  flex: 1;
  min-height: 100px;

  background-color: gray;
  border: 0;
  margin: 1px;

  &:hover {
    background-color: ${BASE_COLORS["gray-3"]};
  }
  &:active {
    background-color: ${BASE_COLORS["blue-3"]};
  }
`;

type Props = { sample: Sample; index: number };

const PadButton = ({ index }: Props) => {
  const { setPressed } = useClipStore();

  const handlePress = () => {
    setPressed(index, true);
  };

  const handleRelease = () => {
    setPressed(index, false);
  };

  return (
    <StyledPadButton onPointerDown={handlePress} onPointerUp={handleRelease} />
  );
};

export default PadButton;
