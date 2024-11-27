import P5Sketch from "@/components/P5Sketch";
import { drawCircle } from "@/helpers/drawing/drawCircle";
import { saveArt } from "@/helpers/drawing/saveArt";
import { useControls } from "leva";
import p5 from "p5";
import React from "react";
import { BASE_COLORS } from "themes/colors/base";

type Props = {};

const FILENAME = "PerspectiveSquares";

const PerspectiveSquares = (props: Props) => {
  // const { camX, camY, camZ } = useControls({
  //   camX: {
  //     value: 4,
  //     min: 0,
  //     max: 100,
  //     step: 1,
  //   },
  //   camY: {
  //     value: 4,
  //     min: 0,
  //     max: 100,
  //     step: 1,
  //   },
  //   camZ: {
  //     value: 4,
  //     min: 0,
  //     max: 100,
  //     step: 1,
  //   },
  // });

  const Sketch = (p: p5) => {
    let y = 100;
    p.setup = () => {
      console.log("setup canvas");
      p.createCanvas(window.innerWidth, window.innerHeight, p.WEBGL);
      p.stroke(255); // Set line drawing color to white
      p.frameRate(30);
      // p.camera(camX, camY, camZ);
      p.camera(0, -500, p.height / 2 / p.tan(p.PI / 6), 0, 500, 1200, 0, 1, 0);
    };
    p.keyPressed = () => {
      saveArt(p, FILENAME);
    };
    p.draw = () => {
      // console.log('drawing!!')
      p.background(p.color(BASE_COLORS["gray-9"])); // Set the background to black

      // p.strokeWeight(3);
      // p.stroke(p.color(BASE_COLORS["gray-5"]));
      // const resolution = 40;
      // const biggestEdge = p.width < p.height ? p.width : p.height;
      // const radius = biggestEdge / 4;
      // const startX = p.width / 2;
      // const startY = p.height / 2;
      // drawCircle(p, radius, resolution, startX, startY);

      const BOX_GAP = 20;
      const GRID_SIZE = 100;
      const NUM_GRID_LEVELS = 5;
      const BOX_SIZE = p.width / GRID_SIZE;
      for (let level = 0; level < NUM_GRID_LEVELS; level++) {
        for (let xBase = 0; xBase < GRID_SIZE; xBase++) {
          for (let yBase = 0; yBase < GRID_SIZE; yBase++) {
            p.push();

            p.translate(
              xBase * BOX_SIZE + xBase * BOX_GAP - p.width / 2,
              level * 10,
              yBase * BOX_SIZE + yBase * BOX_GAP - p.height / 2
            );
            p.rotateX(p.HALF_PI);
            const strokeColor = p.color("white");
            strokeColor.setAlpha(Math.abs(1 - level / NUM_GRID_LEVELS) * 255);
            p.stroke(strokeColor);
            p.noFill();
            p.plane(BOX_SIZE, BOX_SIZE);
            p.pop();
          }
        }
      }
    };
  };

  return <P5Sketch sketch={Sketch} />;
};

export default PerspectiveSquares;
