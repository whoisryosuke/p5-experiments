import React from "react";

type Props = {
  name: string;
};

const ClipHeader = ({ name }: Props) => {
  return <div>{name}</div>;
};

export default ClipHeader;
