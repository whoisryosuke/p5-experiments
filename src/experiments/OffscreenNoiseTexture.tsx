import P5Sketch from "@/components/P5Sketch";
import { drawCircle } from "@/helpers/drawing/drawCircle";
import { saveArt } from "@/helpers/drawing/saveArt";
import p5 from "p5";
import React from "react";
import { BASE_COLORS } from "themes/colors/base";

type Props = {};

const FILENAME = "OffscreenNoiseTexture";
const SIZE = 4096;

const OffscreenNoiseTexture = (props: Props) => {
  const Sketch = (p: p5) => {
    let drawn = false;
    let offscreenTexture: p5.Graphics;
    p.setup = () => {
      console.log("setup canvas");
      p.createCanvas(window.innerWidth, window.innerHeight);

      // Create the offscreen texture and store it in a local variable
      offscreenTexture = p.createGraphics(SIZE, SIZE);
    };
    p.keyPressed = () => {
      // Pressing "s" on keyboard saves the offscreen texture (instead of the canvas)
      if (p.key === "s") {
        const date = new Date();
        const time = `${date.getFullYear()}${date.getMonth()}${date.getDay()}-${date.getMilliseconds()}`;
        offscreenTexture.save(`${FILENAME}-${time}`);
      }
    };
    p.draw = () => {
      // Set the background to white to see difference between offscreen texture
      p.background(p.color(BASE_COLORS["gray-1"]));

      // Draw on the offscreen texture
      // We only draw once - but you can change this to have more dynamic/changing results
      if (!drawn) {
        // Basically just draw big text on a blank background
        offscreenTexture.background(p.color(BASE_COLORS["gray-9"]));

        // Set the noise level and scale.
        let noiseLevel = 255;
        let noiseScale = 0.009;

        // Scale the input coordinate.
        let noise = noiseScale * p.frameCount;

        const COUNT = 200;
        const blockWidth = SIZE / COUNT;
        const blockHeight = SIZE / COUNT;
        [...new Array(COUNT)].forEach((_, xIndex) => {
          [...new Array(COUNT)].forEach((_, yIndex) => {
            const x = xIndex * blockWidth;
            const y = yIndex * blockHeight;
            // Scale the input coordinates.
            let nx = noiseScale * x;
            let ny = noiseScale * y;
            let nt = noiseScale * p.frameCount * 3;

            const colorNum = Math.round(p.noise(nx, ny, nt) * 6);

            offscreenTexture.strokeWeight(0);
            offscreenTexture.stroke(p.color(BASE_COLORS["gray-8"]));
            offscreenTexture.fill(p.color(BASE_COLORS[`blue-${colorNum}`]));
            offscreenTexture.circle(x, y, blockWidth * p.noise(nx, ny, nt));
            offscreenTexture.rect(x, y, blockWidth + 1, blockHeight + 1);
            // p.circle(
            //   x + circleAnimationX,
            //   y + circleAnimationY,
            //   blockWidth * p.noise(noise + x + y)
            // );
          });
        });
        drawn = true;
      }

      // We display the texture for the user to preview
      // Since I'm doing images with a square ratio (1:1 width and height)
      // We do the shortest edge so we can get a proper square
      const shortestEdge = Math.min(p.width, p.height);
      p.image(offscreenTexture, 0, 0, shortestEdge, shortestEdge);
    };
  };

  return <P5Sketch sketch={Sketch} />;
};

export default OffscreenNoiseTexture;
