import React, { CSSProperties, Suspense, useEffect, useRef } from "react";
import p5 from "p5";
import { BASE_COLORS } from "themes/colors/base";

type Props = {
  width?: CSSProperties["width"];
  height?: CSSProperties["height"];
};

const NoisePattern = ({ width, height, ...props }: Props) => {
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
    p.draw = () => {
      // console.log('drawing!!')
      p.background(p.color(BASE_COLORS["gray-9"])); // Set the background to black

      // Set the noise level and scale.
      let noiseLevel = 100;
      let noiseScale = 0.005;

      // Scale the input coordinate.
      let noise = noiseScale * p.frameCount;

      const blockWidth = p.width / 100;
      const blockHeight = p.height / 100;
      [...new Array(100)].forEach((_, xIndex) => {
        [...new Array(100)].forEach((_, yIndex) => {
          const x = xIndex * blockWidth;
          const y = yIndex * blockHeight;

          p.strokeWeight(0);
          p.stroke(p.color(BASE_COLORS["gray-8"]));
          p.fill(p.color(BASE_COLORS["gray-4"]));
          p.rect(
            x,
            y,
            blockWidth * p.noise(noise),
            blockHeight * p.noise(noise + 10000)
          );
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

export default NoisePattern;
