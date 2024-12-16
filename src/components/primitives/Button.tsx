import React, { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import { Button as AriaButton } from "react-aria-components";
import styled from "styled-components";
import { BUTTON_STYLES } from "../../themes/styles/button";

type ButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {};

const Button = styled(AriaButton)<ButtonProps>`
  ${BUTTON_STYLES}
  appearance: none;
  vertical-align: middle;
  text-align: center;
  margin: 0;
  outline: none;
  padding: ${({ theme }) => theme.space[5]} ${({ theme }) => theme.space[7]};
  text-decoration: none;
`;

export default Button;
