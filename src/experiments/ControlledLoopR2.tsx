import P5Sketch from "@/components/P5Sketch";
import { drawCircle } from "@/helpers/drawing/drawCircle";
import { saveArt } from "@/helpers/drawing/saveArt";
import p5 from "p5";
import React from "react";
import { BASE_COLORS } from "themes/colors/base";

type Props = {};

const FILENAME = "ControlledLoopR2";
const WIDTH = 3840;
const HEIGHT = 2160;
/**
 * Time in ms
 */
const TIME_BETWEEN_FRAMES = 100;

const ControlledLoopR2 = (props: Props) => {
  const Sketch = (p: p5) => {
    let y = 100;
    let frameNumber = 0;
    let texture: p5.Graphics;

    p.setup = () => {
      console.log("setup canvas");
      p.createCanvas(window.innerWidth, window.innerHeight);
      p.stroke(255); // Set line drawing color to white
      p.frameRate(30);
      // Create the offscreen texture and store it in a local variable
      texture = p.createGraphics(WIDTH, HEIGHT);

      const draw = () => {
        p.loop();
        texture.background(p.color(BASE_COLORS["gray-9"])); // Set the background to black
        texture.strokeWeight(3);
        texture.stroke(p.color(BASE_COLORS["gray-5"]));
        const resolution = 40;
        const biggestEdge = WIDTH < HEIGHT ? WIDTH : HEIGHT;
        const radius = biggestEdge / 4;
        const startX = WIDTH / 2 + frameNumber;
        const startY = HEIGHT / 2;
        drawCircle(texture, radius, resolution, startX, startY);
        p.noLoop();

        // Save the canvas with frame number to compile for videos
        // texture.save(`${FILENAME}-${frameNumber}`);

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
      // 3840/2160 p.width/x
      // p.width * 2160 / 3840
      const imageHeight = (p.width * 2160) / 3840;
      p.image(texture, 0, 0, p.width, imageHeight);
    };
  };

  return <P5Sketch sketch={Sketch} />;
};

export default ControlledLoopR2;
