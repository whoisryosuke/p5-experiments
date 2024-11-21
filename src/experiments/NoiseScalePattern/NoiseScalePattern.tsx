import React, { CSSProperties, Suspense, useEffect, useRef } from "react";
import p5 from "p5";
import { BASE_COLORS } from "themes/colors/base";

type Props = {
  width?: CSSProperties["width"];
  height?: CSSProperties["height"];
};

const NoiseScalePattern = ({ width, height, ...props }: Props) => {
  const p5ref = useRef<p5 | null>(null);
  const divRef = useRef<HTMLDivElement | null>(null);

  const Sketch = (p: p5) => {
    let y = 100;
    let prevWaveLeft = 0;
    let prevWaveRight = 0;
    p.setup = () => {
      console.log("setup canvas");
      p.createCanvas(width ?? window.innerWidth, height ?? window.innerHeight);
      p.stroke(255); // Set line drawing color to white
      p.frameRate(4);
    };
    p.draw = () => {
      // console.log('drawing!!')
      p.background(p.color(BASE_COLORS["gray-9"])); // Set the background to black

      // Set the noise level and scale.
      let noiseLevel = 100;
      let noiseScale = 0.05;

      // Scale the input coordinate.
      let noise = noiseScale * p.frameCount;

      const blockWidth = p.width / 100;
      const blockHeight = p.height / 100;
      [...new Array(100)].forEach((_, xIndex) => {
        [...new Array(100)].forEach((_, yIndex) => {
          const x = xIndex * blockWidth;
          const y = yIndex * blockHeight;

          const circleAnimationX =
            xIndex % 3 == 1 && yIndex % 3 == 1
              ? p.sin(p.frameCount / 10) * p.noise(noise) * 100
              : 1;
          const circleAnimationY =
            xIndex % 3 == 1 && yIndex % 3 == 1
              ? p.cos(p.frameCount / 10) * p.noise(noise) * 100
              : 1;

          const colorNum = Math.round(p.random(1, 6));

          p.strokeWeight(0);
          p.stroke(p.color(BASE_COLORS["gray-8"]));
          p.fill(p.color(BASE_COLORS[`gray-${colorNum}`]));
          p.circle(x, y, blockWidth * p.noise(noise + x + y));
          // p.circle(
          //   x + circleAnimationX,
          //   y + circleAnimationY,
          //   blockWidth * p.noise(noise + x + y)
          // );
        });
      });
    };
  };

  useEffect(() => {
    if (typeof window == "undefined") return;
    if (divRef.current && p5ref.current == null)
      p5ref.current = new p5(Sketch, divRef.current);
  }, []);

  return <div ref={divRef}></div>;
};

export default NoiseScalePattern;
