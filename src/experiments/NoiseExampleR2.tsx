import P5Sketch from "@/components/P5Sketch";
import { drawCircle } from "@/helpers/drawing/drawCircle";
import { saveArt } from "@/helpers/drawing/saveArt";
import p5 from "p5";
import React from "react";
import { BASE_COLORS } from "themes/colors/base";

type Props = {};

const FILENAME = "NoiseExampleR2";

const NoiseExampleR2 = (props: Props) => {
  const Sketch = (p: p5) => {
    let y = 100;
    var b0, b1, b2, b3, b4, b5, b6;
    b0 = b1 = b2 = b3 = b4 = b5 = b6 = 0.0;
    p.setup = () => {
      console.log("setup canvas");
      p.createCanvas(window.innerWidth, window.innerHeight);
      p.stroke(255); // Set line drawing color to white
      p.frameRate(10);
    };
    p.keyPressed = () => {
      saveArt(p, FILENAME);
    };
    p.draw = () => {
      // console.log('drawing!!')
      p.background(p.color(BASE_COLORS["gray-9"])); // Set the background to black

      p.strokeWeight(0);

      const RESOLUTION = 50;
      const segmentWidth = p.width / RESOLUTION;
      const segmentHeight = p.height / RESOLUTION;

      // Make a 2D grid that's RESOLUTION x RESOLUTION big
      for (let xIndex = 0; xIndex < RESOLUTION; xIndex++) {
        for (let yIndex = 0; yIndex < RESOLUTION; yIndex++) {
          const x = xIndex * segmentWidth;
          const y = yIndex * segmentHeight;

          // Generate pink noise
          // @see: https://noisehack.com/generate-noise-web-audio-api/
          // @see: https://www.musicdsp.org/en/latest/Filters/76-pink-noise-filter.html
          let output;
          var white = Math.random() * 2 - 1;
          b0 = 0.99886 * b0 + white * 0.0555179;
          b1 = 0.99332 * b1 + white * 0.0750759;
          b2 = 0.969 * b2 + white * 0.153852;
          b3 = 0.8665 * b3 + white * 0.3104856;
          b4 = 0.55 * b4 + white * 0.5329522;
          b5 = -0.7616 * b5 - white * 0.016898;
          output = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
          output *= 0.11; // (roughly) compensate for gain
          b6 = white * 0.115926;

          const alpha = p.map(output, -1, 1, 0, 255);

          const whiteNoise = alpha;
          p.fill(p.color(whiteNoise, whiteNoise, whiteNoise));
          p.rect(x, y, segmentWidth, segmentHeight);
        }
      }
    };
  };

  return <P5Sketch sketch={Sketch} />;
};

export default NoiseExampleR2;
