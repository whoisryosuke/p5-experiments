import TrackWaveform from "@/components/canvas/TrackWaveform/TrackWaveform";
import Tabs from "@/components/dom/Tabs/Tabs";
import React, { useState } from "react";
import SampleFX from "./Tabs/SampleFX";

type Props = {};

const ClipTabs = (props: Props) => {
  return (
    <Tabs
      tabs={{
        waveform: {
          title: "Waveform",
          content: (
            <TrackWaveform filepath="/samples/mixed/C4.mp3" height={300} />
          ),
        },
        samplefx: {
          title: "Sample FX",
          content: <SampleFX />,
        },
      }}
      defaultTab="waveform"
    />
  );
};

export default ClipTabs;
