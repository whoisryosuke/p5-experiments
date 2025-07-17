import P5Sketch from "@/components/P5Sketch";
import { drawCircle } from "@/helpers/drawing/drawCircle";
import { saveArt } from "@/helpers/drawing/saveArt";
import p5 from "p5";
import React from "react";
import { BASE_COLORS } from "themes/colors/base";

type Props = {};

const FILENAME = "NoiseExampleR1";

const NoiseExampleR1 = (props: Props) => {
  const Sketch = (p: p5) => {
    let y = 100;
    p.setup = () => {
      console.log("setup canvas");
      p.createCanvas(window.innerWidth, window.innerHeight);
      p.stroke(255); // Set line drawing color to white
      p.frameRate(30);
    };
    p.keyPressed = () => {
      saveArt(p, FILENAME);
    };
    p.draw = () => {
      // console.log('drawing!!')
      p.background(p.color(BASE_COLORS["gray-9"])); // Set the background to black

      p.strokeWeight(0);

      const RESOLUTION = 420;
      const segmentWidth = p.width / RESOLUTION;
      const segmentHeight = p.height / RESOLUTION;

      // Make a 2D grid that's RESOLUTION x RESOLUTION big
      for (let xIndex = 0; xIndex < RESOLUTION; xIndex++) {
        for (let yIndex = 0; yIndex < RESOLUTION; yIndex++) {
          const x = xIndex * segmentWidth;
          const y = yIndex * segmentHeight;

          // Get the color based on the position in the grid
          // We go from 0 to RESOLUTION and convert to 0 to 255
          // This uses proportional calculation
          // const red = (xIndex / RESOLUTION) * 255;
          // const green = (yIndex / RESOLUTION) * 255;
          // This method is more readable using `map()`
          // const blue = ((xIndex + yIndex) / (RESOLUTION * 2)) * 255;
          const whiteNoise = Math.random() * 255;
          p.fill(p.color(whiteNoise, whiteNoise, whiteNoise));
          p.rect(x, y, segmentWidth, segmentHeight);
        }
      }
    };
  };

  return <P5Sketch sketch={Sketch} />;
};

export default NoiseExampleR1;
