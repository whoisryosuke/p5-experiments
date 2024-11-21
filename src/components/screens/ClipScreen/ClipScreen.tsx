import React from "react";
import ClipHeader from "./ClipHeader";
import ClipFooter from "./ClipFooter";
import ClipTabs from "./ClipTabs";
import ClipTrackPreview from "./ClipTrackPreview/ClipTrackPreview";
import SamplePad from "./SamplePad/SamplePad";
import { Sample } from "./types";

const SAMPLE_SAMPLES: Sample[] = [
  {
    file: "/samples/mixed/C4.mp3",
    name: "C4",
  },
];

type Props = {};

const ClipScreen = (props: Props) => {
  return (
    <div style={{ width: "100%" }}>
      <ClipHeader name="Test" />
      <ClipTabs />
      <ClipTrackPreview />
      <SamplePad samples={SAMPLE_SAMPLES} />
      <ClipFooter />
    </div>
  );
};

export default ClipScreen;
