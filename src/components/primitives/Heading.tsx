import React from "react";
import styled from "styled-components";
import { TEXT_STYLES, TextStyles } from "../../themes/tokens";

type Props = {
  as: TextStyles;
};

const Heading = styled("h1")<Props>`
  color: ${({ theme }) => theme.colors.text};

  font-family: "Inter";
  font-style: normal;
  font-weight: 200;
  font-size: ${({ as }) => TEXT_STYLES[as]};
  line-height: 1.5rem;
  letter-spacing: 8px;
  text-transform: uppercase;
`;

Heading.defaultProps = {
  as: "h1",
};

export default Heading;
