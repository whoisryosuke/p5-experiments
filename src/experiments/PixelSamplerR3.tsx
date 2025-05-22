import P5Sketch from "@/components/P5Sketch";
import { drawCircle } from "@/helpers/drawing/drawCircle";
import { saveArt, saveOffscreenArt } from "@/helpers/drawing/saveArt";
import p5 from "p5";
import React from "react";
import { text } from "stream/consumers";
import { BASE_COLORS } from "themes/colors/base";

type Props = {};

const FILENAME = "PixelSamplerR3";
const SIZE = 4096;

const PixelSamplerR3 = (props: Props) => {
  const Sketch = (p: p5) => {
    let drawn = false;
    let tex: p5.Graphics;
    p.setup = () => {
      console.log("setup canvas");
      p.createCanvas(window.innerWidth, window.innerHeight);
      p.frameRate(5);

      // Create the offscreen texture and store it in a local variable
      tex = p.createGraphics(
        window.innerWidth / 100,
        window.innerHeight / 100,
        p.WEBGL
      );
      let cam = tex.createCamera();
      cam.setPosition(0, 0, 10);
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
      drawn = false;
      // }

      // tex.loadPixels();
      // const pixels = tex.pixels;
      // let pixelation_level = 10;
      // for (let x = 0; x < tex.width; x += pixelation_level) {
      //   for (let y = 0; y < tex.height; y += pixelation_level) {
      //     let i = (x + y * tex.width) * 4;

      //     let r = pixels[i + 0];
      //     let g = pixels[i + 1];
      //     let b = pixels[i + 2];
      //     let a = pixels[i + 3];

      //     p.fill(r, g, b, a);
      //     p.square(x, y, pixelation_level);
      //   }
      // }

      // We display the texture for the user to preview
      // Since I'm doing images with a square ratio (1:1 width and height)
      // We do the shortest edge so we can get a proper square
      const shortestEdge = Math.min(p.width, p.height);
      p.image(tex, 0, 0, p.width, p.height);
    };
  };

  return <P5Sketch sketch={Sketch} />;
};

export default PixelSamplerR3;
