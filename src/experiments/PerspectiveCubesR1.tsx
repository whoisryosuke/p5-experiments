import P5Sketch from "@/components/P5Sketch";
import { fpsText } from "@/helpers/debug/fpsText";
import { drawCircle } from "@/helpers/drawing/drawCircle";
import { saveArt } from "@/helpers/drawing/saveArt";
import p5 from "p5";
import React from "react";
import { BASE_COLORS, THEME_COLORS } from "themes/colors/base";

type Props = {};

const FILENAME = "PerspectiveCubesR1";

const PerspectiveCubesR1 = (props: Props) => {
  const Sketch = (p: p5) => {
    let time = 0;
    p.setup = () => {
      console.log("setup canvas");
      p.createCanvas(window.innerWidth, window.innerHeight, p.WEBGL);
      p.stroke(255); // Set line drawing color to white
      p.frameRate(30);
    };
    p.keyPressed = () => {
      saveArt(p, FILENAME);
    };
    p.draw = () => {
      time += p.deltaTime;
      // console.log('drawing!!')
      p.background(p.color(BASE_COLORS["gray-9"])); // Set the background to black
      p.orbitControl();

      const slowDownAnimation = 1000; // Bigger = slower
      const animateRotation = Math.sin(time / slowDownAnimation);
      const rotationAngle = p.radians(30);
      p.strokeWeight(0);
      const resolution = 40;
      const biggestEdge = p.width < p.height ? p.width : p.height;
      const radius = biggestEdge / 4;
      const startX = 0;
      const startY = 0;

      const boxSize = 10;
      const boxGap = boxSize / 1.5;
      const boxWithSpacing = boxSize + boxGap;

      const gridSize = 60;
      const noiseScale = 0.01;

      const center = (gridSize / 2) * boxWithSpacing;

      new Array(gridSize).fill(0).map((_, baseX) => {
        new Array(gridSize).fill(0).map((_, baseY) => {
          p.push();
          // const colorIndex = (baseX + baseY) % 9;

          const x = baseX * boxWithSpacing;
          const y = baseY * boxWithSpacing;
          const nx = noiseScale * x;
          const ny = noiseScale * y;
          const nt = noiseScale * p.frameCount * 3;

          const colorNum = Math.round(p.noise(nx, ny, nt) * 6) % 9;
          const colorNameIndex =
            Math.round(p.noise(nx, ny, nt) * 10) % THEME_COLORS.length;
          const colorName = THEME_COLORS[colorNameIndex];
          p.fill(p.color(BASE_COLORS[`${colorName}-${colorNum}`]));
          p.rotateY(rotationAngle * animateRotation);
          p.rotateX(rotationAngle * animateRotation);
          p.translate(x - center, y - center);
          p.box(boxSize, boxSize, 100);
          p.pop();
        });
      });
    };
  };

  return <P5Sketch sketch={Sketch} />;
};

export default PerspectiveCubesR1;
