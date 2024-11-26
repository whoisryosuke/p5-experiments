import P5Sketch from "@/components/P5Sketch";
import { drawCircle } from "@/helpers/drawing/drawCircle";
import { rotateXY } from "@/helpers/drawing/rotateXY";
import p5 from "p5";
import React from "react";
import { BASE_COLORS } from "themes/colors/base";

type Props = {};

const CircleExample = (props: Props) => {
  const Sketch = (p: p5) => {
    let y = 100;
    let prevWaveLeft = 0;
    let prevWaveRight = 0;
    p.setup = () => {
      console.log("setup canvas");
      p.createCanvas(window.innerWidth, window.innerHeight);
      p.stroke(255); // Set line drawing color to white
      p.frameRate(30);
    };
    p.draw = () => {
      // console.log('drawing!!')
      p.background(p.color(BASE_COLORS["gray-9"])); // Set the background to black

      // Set the noise level and scale.
      let noiseLevel = 255;
      let noiseScale = 0.009;

      // Scale the input coordinate.
      let noise = noiseScale * p.frameCount;

      const COUNT = 200;
      const blockWidth = p.width / COUNT;
      const blockHeight = p.height / COUNT;
      // [...new Array(COUNT)].forEach((_, xIndex) => {
      //   [...new Array(COUNT)].forEach((_, yIndex) => {
      //     const x = xIndex * blockWidth;
      //     const y = yIndex * blockHeight;
      //     // Scale the input coordinates.
      //     let nx = noiseScale * x;
      //     let ny = noiseScale * y;
      //     let nt = noiseScale * p.frameCount * 3;

      //     const colorNum = Math.round(p.noise(nx, ny, nt) * 6);

      //     p.strokeWeight(0);
      //     p.stroke(p.color(BASE_COLORS["gray-8"]));
      //     p.fill(p.color(BASE_COLORS[`gray-${colorNum}`]));
      //     p.circle(x, y, blockWidth * p.noise(nx, ny, nt));
      //     // p.circle(
      //     //   x + circleAnimationX,
      //     //   y + circleAnimationY,
      //     //   blockWidth * p.noise(noise + x + y)
      //     // );
      //   });
      // });

      p.strokeWeight(3);
      p.stroke(p.color(BASE_COLORS["gray-5"]));
      const resolution = 40;
      const biggestEdge = p.width < p.height ? p.width : p.height;
      const radius = biggestEdge / 4;
      const startX = p.width / 2;
      const startY = p.height / 2;
      drawCircle(p, radius, resolution, startX, startY);
    };
  };

  return <P5Sketch sketch={Sketch} />;
};

export default CircleExample;
