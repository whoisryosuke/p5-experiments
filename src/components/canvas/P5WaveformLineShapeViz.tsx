import React, { CSSProperties, Suspense, useEffect, useRef } from "react";
import p5 from "p5";
import { useAppStore } from "../../store/app";
import { BASE_COLORS } from "themes/colors/base";
import createGridLines from "../../helpers/drawing/createGridLines";
import mapRange from "@/helpers/mapRange";
import { useInputStore } from "@/store/input";

function drawOscillatorLine(p: p5, levels, colorMode, prevWave) {
  p.strokeWeight(2);
  p.stroke(BASE_COLORS[`${colorMode}-4`]);
  const width = Math.max(levels.length, p.width) / 4;

  for (let i = 0; i < width; i++) {
    if (levels[i - 1] < 0 && levels[i] >= 0) {
      prevWave = i;
      break;
    }
  }

  const end = width + prevWave;
  for (let i = prevWave; i < end; i++) {
    const normalized = levels[i];
    const prevNormalized = levels[i - 1];

    const prevX = mapRange(i - 1, prevWave, end, 0, p.width);
    const prevY = mapRange(
      prevNormalized,
      -1,
      1,
      p.height / 4,
      (p.height / 4) * 3
    );

    const x = mapRange(i, prevWave, end, 0, p.width);
    const y = mapRange(normalized, -1, 1, p.height / 4, (p.height / 4) * 3);

    p.line(prevX, prevY, x, y);
  }
}

function drawAnalogStick(p: p5, axe, direction) {
  const directionOffset = direction == "left" ? -100 : 100;
  const ogX = p.width / 2;
  const offset = mapRange(axe, -1, 1, 0, 50);
  const newX = ogX + offset + directionOffset;
  p.circle(newX, p.height - p.height / 10, 100);
}

type Props = {
  width: CSSProperties["width"];
  height: CSSProperties["height"];
};

const P5WaveformLineShapeViz = ({ width, height, ...props }: Props) => {
  const p5ref = useRef<p5 | null>(null);
  const divRef = useRef<HTMLDivElement | null>(null);

  const Sketch = (p: p5) => {
    let y = 100;
    let prevWaveLeft = 0;
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

      const { axes } = useInputStore.getState();
      const { waveformOscLeft, waveformOscRight, colorMode } =
        useAppStore.getState();
      if (!waveformOscLeft?.current || !waveformOscRight?.current) return;

      const levelsLeft = waveformOscLeft.current.getValue();
      const levelsRight = waveformOscRight.current.getValue();

      // BG Lines
      createGridLines(p, 15);

      // Oscillators
      drawOscillatorLine(p, levelsLeft, "cyan", prevWaveLeft);
      drawOscillatorLine(p, levelsRight, "orange", prevWaveRight);

      // Draw Analog Sticks
      p.strokeWeight(2);
      p.stroke(BASE_COLORS[`${colorMode}-4`]);
      p.fill(0, 0, 0, 0);
      drawAnalogStick(p, axes[0], "left");
      drawAnalogStick(p, axes[2], "right");
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
