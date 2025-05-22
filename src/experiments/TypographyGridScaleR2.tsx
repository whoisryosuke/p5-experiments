import P5Sketch from "@/components/P5Sketch";
import { drawCircle } from "@/helpers/drawing/drawCircle";
import { saveArt } from "@/helpers/drawing/saveArt";
import p5 from "p5";
import React from "react";
import { BASE_COLORS } from "themes/colors/base";

type Props = {};

const FILENAME = "TypographyGridScaleR2";

const TypographyGridScaleR2 = (props: Props) => {
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
      const frameWidth = p.width - p.width * 0.5;
      const frameHeight = p.height - p.height * 0.2;
      const SUBDIVISIONS = 10;
      const baseblockWidth = frameWidth / SUBDIVISIONS;
      const baseblockHeight = frameHeight / SUBDIVISIONS;
      let noiseScale = 0.05;

      // console.log('drawing!!')
      p.background(p.color(BASE_COLORS["gray-9"])); // Set the background to black
      p.fill(p.color(BASE_COLORS["blue-9"]));

      let lastWidth = 0;
      let lastHeight = 0;
      let lastX = 0;
      let lastY = 0;

      for (let row = 0; row < SUBDIVISIONS; row++) {
        // Noise offset
        let nx = noiseScale * row * p.frameCount * 3;
        const noiseOffsetX = p.noise(nx);

        const x = lastX + lastWidth;
        const width = baseblockWidth * noiseOffsetX;
        for (let col = 0; col < SUBDIVISIONS; col++) {
          // Noise offset
          let ny = noiseScale * col * p.frameCount * 0.01;
          const noiseOffsetY = p.noise(ny);

          // Placement and scale
          const y = lastY + lastHeight;
          const height = baseblockHeight * noiseOffsetY;

          // p.rect(x, y, baseblockWidth, baseblockHeight);
          p.rect(x, y, width, height);

          lastY = y;
          lastHeight = height;

          if (col == SUBDIVISIONS - 1) lastY = 0;
        }
        lastWidth = width;
        lastX = x;
      }
    };
  };

  return <P5Sketch sketch={Sketch} />;
};

export default TypographyGridScaleR2;
