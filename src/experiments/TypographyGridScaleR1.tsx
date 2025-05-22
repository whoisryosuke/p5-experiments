import P5Sketch from "@/components/P5Sketch";
import { drawCircle } from "@/helpers/drawing/drawCircle";
import { saveArt } from "@/helpers/drawing/saveArt";
import p5 from "p5";
import React from "react";
import { BASE_COLORS } from "themes/colors/base";

type Props = {};

const FILENAME = "TypographyGridScaleR1";

const TypographyGridScaleR1 = (props: Props) => {
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

      for (let row = 0; row < SUBDIVISIONS; row++) {
        for (let col = 0; col < SUBDIVISIONS; col++) {
          const x = row * baseblockWidth;
          const y = col * baseblockHeight;

          // Noise offset
          let nx = noiseScale * x;
          let ny = noiseScale * y;
          let nt = noiseScale * p.frameCount * 3;
          const noiseOffset = p.noise(nx, ny, nt) * 100;

          const offsetX = x - noiseOffset;
          const offsetY = y - noiseOffset;

          // p.rect(x, y, baseblockWidth, baseblockHeight);
          p.rect(offsetX, offsetY, baseblockWidth, baseblockHeight);
        }
      }
    };
  };

  return <P5Sketch sketch={Sketch} />;
};

export default TypographyGridScaleR1;
