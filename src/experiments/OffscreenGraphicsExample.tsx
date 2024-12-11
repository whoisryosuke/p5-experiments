import P5Sketch from "@/components/P5Sketch";
import { drawCircle } from "@/helpers/drawing/drawCircle";
import { saveArt } from "@/helpers/drawing/saveArt";
import p5 from "p5";
import React from "react";
import { BASE_COLORS } from "themes/colors/base";

type Props = {};

const FILENAME = "OffscreenGraphicsExample";

const OffscreenGraphicsExample = (props: Props) => {
  const Sketch = (p: p5) => {
    let drawn = false;
    let offscreenTexture: p5.Graphics;
    p.setup = () => {
      console.log("setup canvas");
      p.createCanvas(window.innerWidth, window.innerHeight);

      // Create the offscreen texture and store it in a local variable
      offscreenTexture = p.createGraphics(4096, 4096);
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

      // We display the texture for the user to preview
      // Since I'm doing images with a square ratio (1:1 width and height)
      // We do the shortest edge so we can get a proper square
      const shortestEdge = Math.min(p.width, p.height);
      p.image(offscreenTexture, 0, 0, shortestEdge, shortestEdge);
    };
  };

  return <P5Sketch sketch={Sketch} />;
};

export default OffscreenGraphicsExample;
