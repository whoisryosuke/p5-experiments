import P5Sketch from "@/components/P5Sketch";
import { drawCircle } from "@/helpers/drawing/drawCircle";
import { rotateXY } from "@/helpers/drawing/rotateXY";
import { saveArt } from "@/helpers/drawing/saveArt";
import p5 from "p5";
import React from "react";
import { BASE_COLORS } from "themes/colors/base";

const FILENAME = "CircleRepeatExample";

type Props = {};

const CircleRepeatExample = (props: Props) => {
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

      p.strokeWeight(3);
      p.stroke(p.color(BASE_COLORS["gray-5"]));

      const initialScale = 10;
      const resolution = 40;
      const REPEAT_CIRLE_NUM = 1000;

      for (let index = 1; index <= REPEAT_CIRLE_NUM + 1; index++) {
        const biggestEdge = p.width < p.height ? p.width : p.height;
        const radius = initialScale * index;
        const startX = p.width / 2;
        const startY = p.height / 2;
        drawCircle(
          p,
          radius,
          resolution,
          startX,
          startY,
          p.radians(60 * index)
        );
      }
    };
  };

  return <P5Sketch sketch={Sketch} />;
};

export default CircleRepeatExample;
