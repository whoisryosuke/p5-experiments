import P5Sketch from "@/components/P5Sketch";
import { drawCircle } from "@/helpers/drawing/drawCircle";
import { saveArt, saveOffscreenArt } from "@/helpers/drawing/saveArt";
import p5 from "p5";
import React from "react";
import { text } from "stream/consumers";
import { BASE_COLORS } from "themes/colors/base";

type Props = {};

const FILENAME = "PixelSamplerR2";
const SIZE = 4096;

const PixelSamplerR2 = (props: Props) => {
  const Sketch = (p: p5) => {
    let drawn = false;
    let tex: p5.Graphics;
    p.setup = () => {
      console.log("setup canvas");
      p.createCanvas(window.innerWidth, window.innerHeight);
      p.frameRate(5);

      // Create the offscreen texture and store it in a local variable
      tex = p.createGraphics(window.innerWidth, window.innerHeight, p.WEBGL);
    };
    p.keyPressed = () => {
      // Pressing "s" on keyboard saves the offscreen texture (instead of the canvas)
      saveOffscreenArt(p, tex, FILENAME);
    };
    p.draw = () => {
      // Set the background to white to see difference between offscreen texture
      p.background(p.color(BASE_COLORS["gray-1"]));

      // Draw on the offscreen texture
      // We only draw once - but you can change this to have more dynamic/changing results
      // if (!drawn) {
      tex.background(p.color(BASE_COLORS["gray-9"]));

      tex.rotateX(p.frameCount * 0.01);
      tex.rotateY(p.frameCount * 0.01);
      tex.box(100);

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

          tex.strokeWeight(0);
          tex.stroke(p.color(BASE_COLORS["gray-8"]));
          tex.fill(p.color(BASE_COLORS[`blue-${colorNum}`]));
          tex.circle(x, y, blockWidth * p.noise(nx, ny, nt));
          tex.rect(x, y, blockWidth + 1, blockHeight + 1);
          // p.circle(
          //   x + circleAnimationX,
          //   y + circleAnimationY,
          //   blockWidth * p.noise(noise + x + y)
          // );
        });
      });
      drawn = false;
      // }

      tex.loadPixels();
      const pixels = tex.pixels;
      console.log(
        "total pixels",
        pixels,
        pixels.length,
        pixels.length / 4,
        p.width * p.height
      );
      let pixelation_level = 10;
      for (let x = 0; x < p.width; x += pixelation_level) {
        for (let y = 0; y < p.height; y += pixelation_level) {
          let i = (x + y * p.width) * 4;
          let r = pixels[i + 0];
          let g = pixels[i + 1];
          let b = pixels[i + 2];
          let a = pixels[i + 3];

          p.fill(r, g, b, a);
          p.square(x, y, pixelation_level);
        }
      }

      // We display the texture for the user to preview
      // Since I'm doing images with a square ratio (1:1 width and height)
      // We do the shortest edge so we can get a proper square
      const shortestEdge = Math.min(p.width, p.height);
      p.image(tex, 0, 0, p.width / 4, p.height / 4);
    };
  };

  return <P5Sketch sketch={Sketch} />;
};

export default PixelSamplerR2;
