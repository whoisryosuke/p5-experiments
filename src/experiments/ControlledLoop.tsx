import P5Sketch from "@/components/P5Sketch";
import { drawCircle } from "@/helpers/drawing/drawCircle";
import { saveArt } from "@/helpers/drawing/saveArt";
import p5 from "p5";
import React from "react";
import { BASE_COLORS } from "themes/colors/base";

type Props = {};

const FILENAME = "ControlledLoop";
/**
 * Time in ms
 */
const TIME_BETWEEN_FRAMES = 100;

const ControlledLoop = (props: Props) => {
  const Sketch = (p: p5) => {
    let y = 100;
    let frameNumber = 0;
    p.setup = () => {
      console.log("setup canvas");
      p.createCanvas(window.innerWidth, window.innerHeight);
      p.stroke(255); // Set line drawing color to white
      p.frameRate(30);

      const draw = () => {
        p.loop();
        p.background(p.color(BASE_COLORS["gray-9"])); // Set the background to black
        p.strokeWeight(3);
        p.stroke(p.color(BASE_COLORS["gray-5"]));
        const resolution = 40;
        const biggestEdge = p.width < p.height ? p.width : p.height;
        const radius = biggestEdge / 4;
        const startX = p.width / 2 + frameNumber;
        const startY = p.height / 2;
        drawCircle(p, radius, resolution, startX, startY);
        p.noLoop();

        // Save the canvas with frame number to compile for videos
        // p.saveCanvas(`${FILENAME}-${frameNumber}`);

        frameNumber += 1;
        setTimeout(draw, TIME_BETWEEN_FRAMES);
      };

      setTimeout(draw, TIME_BETWEEN_FRAMES);
    };
    p.keyPressed = () => {
      saveArt(p, FILENAME);
    };
    p.draw = () => {
      // console.log('drawing!!')
    };
  };

  return <P5Sketch sketch={Sketch} />;
};

export default ControlledLoop;
