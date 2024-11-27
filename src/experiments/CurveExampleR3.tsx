import P5Sketch from "@/components/P5Sketch";
import { drawCircle } from "@/helpers/drawing/drawCircle";
import { saveArt } from "@/helpers/drawing/saveArt";
import p5 from "p5";
import React from "react";
import { BASE_COLORS } from "themes/colors/base";

type Props = {};

const FILENAME = "CurveExampleR3";

const CurveExampleR3 = (props: Props) => {
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
      p.noFill();

      // Set the noise level and scale.
      let noiseLevel = 255;
      let noiseScale = 0.005;
      // Scale the input coordinate.
      let noise = noiseScale * p.frameCount;

      const midpointY = p.height / 2;

      // Example of making a line with points - but it's not curved
      const resolution = 500;
      const segment = p.width / resolution;
      p.beginShape();

      new Array(resolution).fill(0).forEach((_, index) => {
        p.vertex(index * segment, midpointY + p.noise(noise + index) * 100);
      });

      p.endShape();

      // Making a full line segment with different curve segments
      const offset = -300;
      new Array(resolution).fill(0).forEach((_, index) => {
        const bezierSegment = segment * 3;
        const x1 = 0 + index * bezierSegment;
        const x2 = segment + index * bezierSegment;
        const x3 = segment * 2 + index * bezierSegment;
        const x4 = segment * 3 + index * bezierSegment;

        const noiseBase = p.noise(noise + index);
        const noiseOffset = p.map(noiseBase, 0, 1, -1, 1) * 100;

        p.bezier(
          x1,
          midpointY + offset,
          x2,
          midpointY + noiseOffset + offset,
          x3,
          midpointY + noiseOffset + offset,
          x4,
          midpointY + offset
        );
      });
    };
  };

  return <P5Sketch sketch={Sketch} />;
};

export default CurveExampleR3;
