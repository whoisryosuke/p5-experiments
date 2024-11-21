import React, { useEffect } from "react";
import PadButton from "./PadButton";
import { Sample } from "../types";
import { useClipStore } from "@/store/clip";

type Props = {
  samples: Sample[];
};

const SamplePad = ({ samples }: Props) => {
  const { setTracks } = useClipStore();
  useEffect(() => {
    setTracks(samples);
  }, [samples, setTracks]);

  const row = (rowNum: number) =>
    [...new Array(4)].map((_, index) => (
      <PadButton
        key={`${rowNum}-${index}`}
        index={rowNum * index}
        sample={samples[rowNum * index]}
      />
    ));

  const buttons = [...new Array(4)].map((_, index) => (
    <div key={index} style={{ display: "flex" }}>
      {row(index + 1)}
    </div>
  ));
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>{buttons}</div>
  );
};

export default SamplePad;
