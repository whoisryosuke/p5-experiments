import React, { PropsWithChildren } from "react";
import { Switch as AriaSwitch } from "react-aria-components";
import styled from "styled-components";
import InputLabel from "./InputLabel";

const Indication = styled("div")``;

const KNOB_WIDTH = 23;

type Props = {
  vertical?: boolean;
};

const StyledSwitch = styled(AriaSwitch)<Props>`
  display: flex;
  align-items: center;
  gap: 0.571rem;
  color: ${({ theme }) => theme.colors.text};
  forced-color-adjust: none;
  flex-direction: ${({ vertical }) => (vertical ? "column" : "row")};

  & .indicator {
    width: ${KNOB_WIDTH * 2}px;
    height: 23px;
    background: ${({ theme }) => theme.colors.input.bg.default};
    border-radius: ${({ theme }) => theme.space[3]};
    box-shadow: 0px 1px 2px rgba(255, 255, 255, 0.25);
    position: relative;

    transition: all 200ms;

    &:before {
      content: "";
      display: block;
      width: ${KNOB_WIDTH}px;
      height: 25px;
      margin-top: -2px;
      border: 2px solid
        ${({ theme }) => theme.colors.button.border.default.color};
      background: ${({ theme }) => theme.colors.button.bg.default};
      border-radius: ${({ theme }) => theme.space[3]};
      transition: all 200ms;
    }
    &:hover:before {
      background: ${({ theme }) => theme.colors.button.bg.hovered};
    }
    &:active:before {
      background: ${({ theme }) => theme.colors.button.bg.pressed};
    }

    &:after {
      content: "";
      position: absolute;
      top: 12px;
      left: 7px;
      width: 12px;
      height: 2px;
      border-radius: 2px;
      background: ${({ theme }) => theme.colors.input.bg.default};
      transition: all 200ms;
    }
    &:hover:after {
      background: ${({ theme }) => theme.colors.button.bg.pressed};
    }
  }

  &[data-pressed] .indicator {
    &:before {
      border-color: ${({ theme }) => theme.colors.primary.default};
      background: ${({ theme }) => theme.colors.button.bg.pressed};
    }
  }

  &[data-selected] {
    .indicator {
      border-color: ${({ theme }) => theme.colors.primary.default};
      background: ${({ theme }) => theme.colors.primary.default};

      &:before {
        transform: translateX(100%);
      }

      &:after {
        transform: translateX(230%);
      }
    }

    &[data-pressed] {
      .indicator {
        border-color: ${({ theme }) => theme.colors.primary.default};
        background: ${({ theme }) => theme.colors.button.bg.pressed};
      }
    }
  }

  &[data-focus-visible] .indicator {
    outline: 2px solid var(--focus-ring-color);
    outline-offset: 2px;
  }

  &[data-disabled] {
    color: ${({ theme }) => theme.colors.button.text.disabled};

    .indicator {
      border-color: var(--border-color-disabled);

      &:before {
        background: var(--border-color-disabled);
      }
    }
  }
`;

const Switch = ({ children, ...props }: PropsWithChildren<Props>) => {
  return (
    <StyledSwitch {...props}>
      <Indication className="indicator" />
      <InputLabel>{children}</InputLabel>
    </StyledSwitch>
  );
};

Switch.defaultProps = {
  vertical: false,
};

export default Switch;
