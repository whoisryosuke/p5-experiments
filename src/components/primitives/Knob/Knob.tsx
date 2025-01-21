import React from "react";
import {
  Slider as AriaSlider,
  Label as AriaLabel,
  SliderOutput as AriaSliderOutput,
  SliderThumb as AriaSliderThumb,
  SliderTrack as AriaSliderTrack,
} from "react-aria-components";
import styled from "styled-components";
import { BUTTON_STYLES } from "themes/styles/button";
import KnobProgressBG from "./KnobProgressBG";
import KnobProgressBar from "./KnobProgressBar";
import InputLabel from "../InputLabel";

const KNOB_WIDTH = 120;
const SLIDER_TRACK_HEIGHT = 114;
const SLIDER_PROGRESS_PADDING = 3;
const SLIDER_PROGRESS_HEIGHT =
  SLIDER_TRACK_HEIGHT - SLIDER_PROGRESS_PADDING * 2;

const SliderBase = styled(AriaSlider)`
  color: ${({ theme }) => theme.colors.text};
  padding: ${({ theme }) => theme.space[4]};
  position: relative;

  width: ${KNOB_WIDTH}px;

  flex-direction: column;
  text-align: center;
`;

const SliderOutput = styled(AriaSliderOutput)`
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.input.bg.default};
  padding: ${({ theme }) => `${theme.space[2]} ${theme.space[4]}`};
  border-radius: ${({ theme }) => theme.space[3]};
  position: absolute;
`;

const SliderTrack = styled(AriaSliderTrack)`
  width: ${KNOB_WIDTH}px;
  height: ${SLIDER_TRACK_HEIGHT}px;

  grid-area: track;
  position: relative;

  height: ${SLIDER_TRACK_HEIGHT}px;

  &:before {
    height: ${SLIDER_TRACK_HEIGHT}px;
    width: 120px;
  }

  & .knob-progress-bg {
    position: absolute;
    bottom: 0;
    left: 0;
  }
`;

type KnobButtonProps = {
  rotation: number;
};
const KnobTickContainer = styled("div")<KnobButtonProps>`
  width: 100%;
  height: 100%;
  transform: rotateZ(${({ rotation }) => rotation}deg);
  transform-origin: center;
`;

const KnobButton = styled(AriaSliderThumb)`
  ${BUTTON_STYLES}

  width:100px;
  height: 100px;
  position: absolute;
  bottom: 0;
  left: 16px !important;
  transform: none !important;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 50%;

  &:before {
    content: "";
    width: 74px;
    height: 74px;
    position: absolute;
    top: 13px;
    left: 13px;
    border-radius: 50%;

    background: linear-gradient(180deg, #495057 0%, #343a40 65%);
    box-shadow: 0px -2px 8.4px rgba(0, 0, 0, 0.5),
      0px 0px 16.4px rgba(255, 255, 255, 0.1),
      inset 0px -3px 2px rgba(255, 255, 255, 0.05),
      inset 0px 8px 3px rgba(0, 0, 0, 0.25);
  }

  &:hover:before {
    background: ${({ theme }) => theme.colors.button.bg.hovered};
  }

  &[data-dragging="true"] .knob-tick {
    background: ${({ theme }) => theme.colors.primary.default};
  }
`;

const KnobTick = styled("div")`
  width: 3px;
  height: 18px;
  border-radius: 5px;
  background: ${({ theme }) => theme.colors.icon};
  position: absolute;
  top: 30px;
  left: 30px;
  transform: rotateZ(-45deg);
`;

type Props = typeof AriaSlider & {
  label?: string;
  showOutput?: boolean;
};

const Knob = ({ label, showOutput, ...props }: Props) => {
  return (
    <SliderBase {...props}>
      <SliderTrack>
        {({ state }) => (
          <>
            <KnobProgressBG />
            <KnobProgressBar percent={state.getThumbPercent(0) * 100} />
            <KnobButton>
              <KnobTickContainer rotation={state.getThumbPercent(0) * 270 - 90}>
                <KnobTick className="knob-tick" />
              </KnobTickContainer>
              {showOutput && <SliderOutput />}
            </KnobButton>
          </>
        )}
      </SliderTrack>
      {label && <InputLabel>{label}</InputLabel>}
    </SliderBase>
  );
};

Knob.defaultProps = {
  showOutput: false,
};

export default Knob;
