import P5Sketch from "@/components/P5Sketch";
import { drawCircle } from "@/helpers/drawing/drawCircle";
import { saveArt } from "@/helpers/drawing/saveArt";
import p5 from "p5";
import React from "react";
import { BASE_COLORS } from "themes/colors/base";

type Props = {};

const FILENAME = "CurveExampleR2";

const CurveExampleR2 = (props: Props) => {
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

      const midpointY = p.height / 2;

      new Array(10).fill(0).forEach((_, index) => {
        const x1 = 0 + index * 300;
        const x2 = 100 + index * 300;
        const x3 = 200 + index * 300;
        const x4 = 300 + index * 300;

        p.bezier(
          x1,
          midpointY,
          x2,
          midpointY + 100,
          x3,
          midpointY - 100,
          x4,
          midpointY
        );
      });
    };
  };

  return <P5Sketch sketch={Sketch} />;
};

export default CurveExampleR2;
