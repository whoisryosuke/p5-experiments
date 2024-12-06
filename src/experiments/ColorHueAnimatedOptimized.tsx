import P5Sketch from "@/components/P5Sketch";
import { fpsText } from "@/helpers/debug/fpsText";
import { drawCircle } from "@/helpers/drawing/drawCircle";
import { saveArt } from "@/helpers/drawing/saveArt";
import p5 from "p5";
import React from "react";
import { BASE_COLORS } from "themes/colors/base";

type Props = {};

const FILENAME = "ColorHueAnimatedOptimized";
const RESOLUTION = 100;
const SPEED = 0.05;
const AMPLITUDE = 20;

const ColorHueAnimatedOptimized = (props: Props) => {
  const Sketch = (p: p5) => {
    let y = 100;
    // We store the XY coordinates in a flat array so we don't have to loop twice
    const coordinates = [];
    p.setup = () => {
      console.log("setup canvas");
      p.createCanvas(window.innerWidth, window.innerHeight);
      p.stroke(255); // Set line drawing color to white
      p.frameRate(30);

      for (let xIndex = 0; xIndex < RESOLUTION; xIndex++) {
        for (let yIndex = 0; yIndex < RESOLUTION; yIndex++) {
          coordinates.push({
            x: xIndex,
            y: yIndex,
          });
        }
      }
    };
    p.keyPressed = () => {
      saveArt(p, FILENAME);
    };
    p.draw = () => {
      // console.log('drawing!!')
      p.background(p.color(BASE_COLORS["gray-9"])); // Set the background to black

      p.strokeWeight(0);
      const segmentWidth = p.width / RESOLUTION;
      const segmentHeight = p.height / RESOLUTION;
      const animation = p.sin(p.frameCount * SPEED) * AMPLITUDE;

      // Optimization note: Ironically this doesn't improve FPS at all? Or nothing notable.
      // On my PC it ranges 14-20 FPS on either sketch
      // Make a 2D grid that's RESOLUTION x RESOLUTION big
      coordinates.map((coordinate) => {
        const x = coordinate.x * segmentWidth;
        const y = coordinate.y * segmentHeight;

        // Get the color based on the position in the grid
        // We go from 0 to RESOLUTION and convert to 0 to 255

        // This uses proportional calculation
        // const red = (xIndex / RESOLUTION) * 255;
        // const green = (yIndex / RESOLUTION) * 255;

        // This method is more readable using `map()`
        // const blue = ((xIndex + yIndex) / (RESOLUTION * 2)) * 255;
        const red = p.map(coordinate.x + animation, 0, RESOLUTION, 0, 255);
        const green = p.map(coordinate.y + animation, 0, RESOLUTION, 0, 255);
        const blue = p.map(
          coordinate.x + coordinate.y - animation,
          0,
          RESOLUTION,
          0,
          255
        );
        p.fill(p.color(red, green, blue));

        // Fill in the gaps by offsetting each square and then extending it's size
        // (basically overlapping them as we draw them sequentially)
        p.rect(x - 1, y - 1, segmentWidth + 1, segmentHeight + 1);
      });
      fpsText(p, {
        padding: 100,
        textSize: 24,
      });
    };
  };

  return <P5Sketch sketch={Sketch} />;
};

export default ColorHueAnimatedOptimized;
