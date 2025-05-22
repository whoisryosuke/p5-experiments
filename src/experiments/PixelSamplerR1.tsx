import P5Sketch from "@/components/P5Sketch";
import { drawCircle } from "@/helpers/drawing/drawCircle";
import { saveArt, saveOffscreenArt } from "@/helpers/drawing/saveArt";
import p5 from "p5";
import React from "react";
import { BASE_COLORS } from "themes/colors/base";

type Props = {};

const FILENAME = "PixelSamplerR1";
const SIZE = 4096;

const PixelSamplerR1 = (props: Props) => {
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
      saveOffscreenArt(p, offscreenTexture, FILENAME);
    };
    p.draw = () => {
      // Set the background to white to see difference between offscreen texture
      p.background(p.color(BASE_COLORS["gray-1"]));

      // Draw on the offscreen texture
      // We only draw once - but you can change this to have more dynamic/changing results
      if (!drawn) {
        const paddingWidth = p.width * 0.1;
        const paddingHeight = p.height * 0.2;
        const paddingWidthHalf = p.width * 0.5;
        const paddingHeightHalf = p.height * 0.5;
        // Basically just draw big text on a blank background
        offscreenTexture.background(p.color(BASE_COLORS["gray-9"]));
        offscreenTexture.textSize(400);
        offscreenTexture.fill(p.color(BASE_COLORS["gray-3"]));
        offscreenTexture.text(
          "offscreen texture",
          p.random(paddingWidth, p.width - paddingWidthHalf),
          p.random(paddingHeight, p.height - paddingHeightHalf)
        );
        drawn = true;
      }

      offscreenTexture.loadPixels();
      const pixels = offscreenTexture.pixels;
      let pixelation_level = 20;
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
      p.image(offscreenTexture, 0, 0, shortestEdge, shortestEdge);
    };
  };

  return <P5Sketch sketch={Sketch} />;
};

export default PixelSamplerR1;
