import React from "react";
import { Button as AriaButton, ButtonProps } from "react-aria-components";
import styled from "styled-components";
import { BUTTON_STYLES } from "../../themes/styles/button";
import InputLabel from "./InputLabel";

type StyleProps = ButtonProps & {
  active?: boolean;
};
type ToggleButtonProps = StyleProps & {
  label: string;
};

const ToggleButtonBase = styled(AriaButton)<StyleProps>`
  appearance: none;
  vertical-align: middle;
  text-align: center;
  margin: 0;
  outline: none;
  padding: ${({ theme }) => theme.space[4]} ${({ theme }) => theme.space[5]};
  text-decoration: none;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.5);
  text-transform: uppercase;

  border: 2.5px solid ${({ theme }) => theme.colors.button.border.default.color};
  background: ${({ theme }) => theme.colors.button.bg.pressed};
  box-shadow: ${({ theme }) => theme.shadows.pressed};
  border-radius: ${({ theme }) => theme.space[5]};

  &:hover {
    border-color: ${({ theme }) => theme.colors.button.border.hovered.color};
  }

  ${({ theme, active }) =>
    active &&
    `
    border: 2.5px solid  ${theme.colors.primary.default};
    background: ${theme.gradients.button.active};
    box-shadow: 0px -2px 8.4px rgba(0, 0, 0, 0.5), 0px 0px 16.4px rgba(153, 233, 242, 0.5), inset 0px 3px 2px rgba(255, 255, 255, 0.25), inset 0px -8px 3px rgba(0, 0, 0, 0.1);
    `}

  /* Animation */
  @media (prefers-reduced-motion: no-preference) {
    transition-property: box-shadow, color, background, border-color;
    transition-duration: 420ms;
  }
`;

const ToggleButtonContainer = styled("div")`
  text-align: center;
`;

const ToggleButton = ({ active, label, ...props }: ToggleButtonProps) => {
  return (
    <ToggleButtonContainer>
      <ToggleButtonBase active={active} {...props}>
        {active ? "On" : "Off"}
      </ToggleButtonBase>
      {label && <InputLabel>{label}</InputLabel>}
    </ToggleButtonContainer>
  );
};

ToggleButton.defaultProps = {
  active: false,
};

export default ToggleButton;
