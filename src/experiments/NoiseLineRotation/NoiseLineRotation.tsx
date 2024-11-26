import React, { CSSProperties, Suspense, useEffect, useRef } from "react";
import p5 from "p5";
import { BASE_COLORS } from "themes/colors/base";
import { radToDeg } from "three/src/math/MathUtils";
import { saveArt } from "@/helpers/drawing/saveArt";

type Props = {
  width?: CSSProperties["width"];
  height?: CSSProperties["height"];
};

const rotateXY = (
  p: p5,
  x: number,
  y: number,
  centerX: number,
  centerY: number,
  angle: number
) => {
  const rotatedX =
    (x - centerX) * p.cos(angle) - (y - centerY) * p.sin(angle) + centerX;
  const rotatedY =
    (x - centerX) * p.sin(angle) + (y - centerY) * p.cos(angle) + centerY;

  return {
    x: rotatedX,
    y: rotatedY,
  };
};

const FILENAME = "NoiseLineRotation";

const NoiseLineRotation = ({ width, height, ...props }: Props) => {
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
      p.frameRate(30);
    };
    p.keyPressed = () => {
      saveArt(p, FILENAME);
    };
    p.draw = () => {
      // console.log('drawing!!')
      p.background(p.color(BASE_COLORS["gray-9"])); // Set the background to black

      // Set the noise level and scale.
      let noiseLevel = 255;
      let noiseScale = 0.009;

      // Scale the input coordinate.
      let noise = noiseScale * p.frameCount;

      const COUNT = 50;
      const blockWidth = p.width / COUNT;
      const blockHeight = p.height / COUNT;
      [...new Array(COUNT)].forEach((_, xIndex) => {
        [...new Array(COUNT)].forEach((_, yIndex) => {
          const x = xIndex * blockWidth;
          const y = yIndex * blockHeight;
          // Scale the input coordinates.
          let nx = noiseScale * x;
          let ny = noiseScale * y;
          let nt = noiseScale * (p.frameCount / 1000);

          const colorNum = Math.round(p.noise(nx, ny, nt) * 6);

          const centerX = (x + blockWidth) / 2;
          const centerY = (y + blockHeight) / 2;
          const angle = radToDeg(((x + nx - y + ny + nt) / 50) * 360);
          const rotatedX =
            (x - centerX) * p.cos(angle) -
            (y - centerY) * p.sin(angle) +
            centerX;
          const rotatedY =
            (x - centerX) * p.sin(angle) +
            (y - centerY) * p.cos(angle) +
            centerY;
          const rotatedX2 =
            (x + blockWidth - centerX) * p.cos(angle) -
            (y + blockHeight - centerY) * p.sin(angle) +
            centerX;
          const rotatedY2 =
            (x + blockWidth - centerX) * p.sin(angle) +
            (y + blockHeight - centerY) * p.cos(angle) +
            centerY;

          p.strokeWeight(2);
          p.stroke(p.color(BASE_COLORS["gray-8"]));
          p.line(rotatedX, rotatedY, rotatedX2, rotatedY2);
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

export default NoiseLineRotation;
