import P5Sketch from "@/components/P5Sketch";
import { fpsText } from "@/helpers/debug/fpsText";
import { drawCircle } from "@/helpers/drawing/drawCircle";
import { saveArt } from "@/helpers/drawing/saveArt";
import p5 from "p5";
import React from "react";
import { BASE_COLORS } from "themes/colors/base";

type Props = {};

const FILENAME = "ColorHueAnimated";

const ColorHueAnimated = (props: Props) => {
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
      const RESOLUTION = 100;
      const segmentWidth = p.width / RESOLUTION;
      const segmentHeight = p.height / RESOLUTION;

      const SPEED = 0.05;
      const AMPLITUDE = 20;
      const animation = p.sin(p.frameCount * SPEED) * AMPLITUDE;

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
          const red = p.map(xIndex + animation, 0, RESOLUTION, 0, 255);
          const green = p.map(yIndex + animation, 0, RESOLUTION, 0, 255);
          const blue = p.map(
            xIndex + yIndex - animation,
            0,
            RESOLUTION,
            0,
            255
          );
          p.fill(p.color(red, green, blue));

          // Fill in the gaps by offsetting each square and then extending it's size
          // (basically overlapping them as we draw them sequentially)
          p.rect(x - 1, y - 1, segmentWidth + 1, segmentHeight + 1);
        }
      }
      fpsText(p, {
        padding: 100,
        textSize: 24,
      });
    };
  };

  return <P5Sketch sketch={Sketch} />;
};

export default ColorHueAnimated;
