import React from "react";
import {
  Slider as AriaSlider,
  Label as AriaLabel,
  SliderOutput as AriaSliderOutput,
  SliderThumb as AriaSliderThumb,
  SliderTrack as AriaSliderTrack,
} from "react-aria-components";
import styled from "styled-components";
import { BUTTON_STYLES } from "../../themes/styles/button";

const SLIDER_TRACK_HEIGHT = 14;
const SLIDER_PROGRESS_PADDING = 3;
const SLIDER_PROGRESS_HEIGHT =
  SLIDER_TRACK_HEIGHT - SLIDER_PROGRESS_PADDING * 2;

const SliderBase = styled(AriaSlider)`
  display: grid;
  grid-template-areas:
    "label output"
    "track track";
  grid-template-columns: 1fr auto;
  color: ${({ theme }) => theme.colors.text};
  padding: ${({ theme }) => theme.space[4]};

  &[data-orientation="horizontal"] {
    flex-direction: column;
  }

  &[data-orientation="vertical"] {
    height: 150px;
    display: block;
  }
`;

const Label = styled(AriaLabel)`
  grid-area: label;
  color: ${({ theme }) => theme.colors.text};

  &[data-orientation="vertical"] {
    display: none;
  }
`;

const SliderOutput = styled(AriaSliderOutput)`
  grid-area: output;
  color: ${({ theme }) => theme.colors.text};

  &[data-orientation="vertical"] {
    display: none;
  }
`;

const SliderThumb = styled(AriaSliderThumb)`
  ${BUTTON_STYLES}

  width: 23px;
  height: 25px;
  forced-color-adjust: none;
  position: absolute;
  top: 50%;

  border-radius: ${({ theme }) => theme.space[3]};

  &[data-dragging] {
    background: ${({ theme }) => theme.colors.button.bg.pressed};
  }

  &[data-orientation="horizontal"] {
    top: 50%;
  }
  &[data-orientation="vertical"] {
    left: 50%;
  }

  &:after {
    content: "";
    position: absolute;
    top: 12px;
    left: 5px;
    width: 12px;
    height: 2px;
    border-radius: 2px;
    background: ${({ theme }) => theme.colors.input.bg.default};
  }
  &:hover:after {
    background: ${({ theme }) => theme.colors.button.bg.default};
  }
  &[data-dragging]:after {
    background: ${({ theme }) => theme.colors.button.bg.hovered};
  }
`;

const SliderProgress = styled("div")`
  position: absolute;
  height: ${SLIDER_PROGRESS_HEIGHT}px;
  margin: ${SLIDER_PROGRESS_PADDING}px;

  background: ${({ theme }) => theme.gradients.primary};
  border-radius: ${({ theme }) => theme.space[3]};
`;

const SliderTrack = styled(AriaSliderTrack)`
  grid-area: track;
  position: relative;
  /* track line */
  &:before {
    content: "";
    display: block;
    position: absolute;
    background: var(--border-color);

    background: ${({ theme }) => theme.colors.input.bg};
    box-shadow: ${({ theme }) => theme.shadows.bottomHighlight};
    border-radius: ${({ theme }) => theme.space[4]};
  }

  &[data-orientation="horizontal"] {
    height: ${SLIDER_TRACK_HEIGHT}px;
    width: 100%;

    &:before {
      height: ${SLIDER_TRACK_HEIGHT}px;
      width: 100%;
    }
  }

  &[data-orientation="vertical"] {
    width: 30px;
    height: 100%;

    &:before {
      width: 14px;
      height: 100%;
    }
  }
`;

type Props = typeof AriaSlider & {
  label?: string;
  showOutput?: boolean;
};

const Slider = ({ label, showOutput, ...props }: Props) => {
  return (
    <SliderBase {...props}>
      {label && <Label>{label}</Label>}
      {showOutput && <SliderOutput />}
      <SliderTrack>
        {({ state }) => (
          <>
            <SliderProgress
              style={{ width: state.getThumbPercent(0) * 100 + "%" }}
            />
            <SliderThumb />
          </>
        )}
      </SliderTrack>
    </SliderBase>
  );
};

Slider.defaultProps = {
  showOutput: false,
};

export default Slider;
