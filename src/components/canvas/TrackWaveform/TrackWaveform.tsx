import React, { CSSProperties, useEffect, useState } from "react";
import P5WaveformLineShapeViz from "./P5TrackWaveform";

async function loadAudio(filepath: string) {
  const audioCtx = new window.AudioContext();
  try {
    const response = await fetch(filepath);

    const fileBuffer = await response.arrayBuffer();
    const audioBuffer = audioCtx.decodeAudioData(fileBuffer);
    return audioBuffer;
  } catch (err) {
    console.error(`Unable to fetch the audio file. Error: ${err.message}`);
  }
}

type Props = {
  filepath: string;
  width?: number;
  height?: number;
};

const TrackWaveform = ({ filepath, width, height }: Props) => {
  const [audioBuffer, setAudioBuffer] = useState(null);

  useEffect(() => {
    if (typeof window == "undefined") return;
    async function getAudioBuffer() {
      const newBuffer = await loadAudio(filepath);
      setAudioBuffer(newBuffer);
    }
    getAudioBuffer();
  }, []);

  return audioBuffer ? (
    <P5WaveformLineShapeViz
      width={width}
      height={height}
      buffer={audioBuffer}
    />
  ) : (
    <></>
  );
};

export default TrackWaveform;
