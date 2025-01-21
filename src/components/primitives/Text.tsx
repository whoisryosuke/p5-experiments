import React from "react";
import styled from "styled-components";
import { Theme } from "themes";

type Props = {
  fontSize?: keyof Theme["fontSizes"];
};

const Text = styled("p")<Props>`
  color: ${({ theme }) => theme.colors.text};

  font-family: "Inter";
  font-style: normal;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  font-size: ${({ theme, fontSize }) => theme.fontSizes[fontSize ?? "1"]};
  line-height: ${({ theme, fontSize }) =>
    theme.fontSizes[fontSize ? fontSize + 1 : "2"]};
`;

export default Text;
