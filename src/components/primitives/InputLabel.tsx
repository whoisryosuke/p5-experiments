import React from "react";
import styled from "styled-components";
import Text from "./Text";

type Props = {
  inline?: boolean;
};

const InputLabel = styled(Text)<Props>`
  display: ${({ inline }) => (inline ? "inline-block" : "block")};
  font-size: ${({ theme }) => theme.fontSizes["0"]};
  margin: ${({ inline, theme }) =>
    inline ? "inline-block" : `${theme.space[4]} 0`};
`;

InputLabel.defaultProps = {
  inline: false,
  as: "label",
};

export default InputLabel;
