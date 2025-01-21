import React from "react";
import styled from "styled-components";
import { BUTTON_STYLES } from "themes/styles/button";

type Props = {};

const Dropdown = styled.select`
  ${BUTTON_STYLES}

  background: ${({ theme }) => theme.colors.input.bg.default};
  padding: ${({ theme }) => theme.space[4]} ${({ theme }) => theme.space[6]};

  & > option {
    color: black;
  }
`;

export default Dropdown;
