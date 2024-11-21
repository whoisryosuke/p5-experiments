import React, { CSSProperties, Suspense, useEffect, useRef } from "react";
import p5 from "p5";
import { useAppStore } from "../../../store/app";
import { BASE_COLORS } from "themes/colors/base";
import createGridLines from "../../../helpers/drawing/createGridLines";
import mapRange from "@/helpers/mapRange";
import { useInputStore } from "@/store/input";

function drawOscillatorLine(p: p5, levels: Float32Array, colorMode) {
  p.strokeWeight(2);
  p.stroke(BASE_COLORS[`${colorMode}-4`]);
  const samples = 1024;
  const segmentSize = Math.floor(levels.length / samples);

  const filteredData = levels.filter((_, index) => index % segmentSize == 0);

  for (let i = 0; i < samples; i++) {
    const normalized = filteredData[i] * 10;
    const prevNormalized = filteredData[i - 1] * 10;

    const prevX = mapRange(i - 1, 0, samples, 0, p.width);
    const prevY = mapRange(
      prevNormalized,
      -1,
      1,
      p.height / 4,
      (p.height / 4) * 3
    );

    const x = mapRange(i, 0, samples, 0, p.width);
    const y = mapRange(normalized, -1, 1, p.height / 4, (p.height / 4) * 3);

    p.line(prevX, prevY, x, y);
  }
}

type Props = {
  width?: number;
  height?: number;
  buffer: AudioBuffer;
};

const P5WaveformLineShapeViz = ({ width, height, buffer, ...props }: Props) => {
  const p5ref = useRef<p5 | null>(null);
  const divRef = useRef<HTMLDivElement | null>(null);

  const waveformData = buffer.getChannelData(0);

  console.log(waveformData);

  const Sketch = (p: p5) => {
    let y = 100;
    let prevWave = 0;
    let prevWaveRight = 0;
    p.setup = () => {
      console.log("setup canvas");
      p.createCanvas(width ?? window.innerWidth, height ?? window.innerHeight);
      p.stroke(255); // Set line drawing color to white
      p.frameRate(30);
    };
    p.draw = () => {
      // console.log('drawing!!')
      p.background(p.color(BASE_COLORS["gray-9"])); // Set the background to black

      // BG Lines
      createGridLines(p, 15);

      drawOscillatorLine(p, waveformData, "blue");

      p.noLoop();
    };
  };

  useEffect(() => {
    if (typeof window == "undefined") return;
    if (divRef.current && p5ref.current == null)
      p5ref.current = new p5(Sketch, divRef.current);
  }, []);

  return <div ref={divRef}></div>;
};

export default P5WaveformLineShapeViz;
