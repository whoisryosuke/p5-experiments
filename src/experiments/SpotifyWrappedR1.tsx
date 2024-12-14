import P5Sketch from "@/components/P5Sketch";
import { drawCircle } from "@/helpers/drawing/drawCircle";
import { saveArt, saveOffscreenArt } from "@/helpers/drawing/saveArt";
import p5 from "p5";
import React from "react";
import { BASE_COLORS } from "themes/colors/base";

type Props = {};

const FILENAME = "SpotifyWrappedR1";
const SIZE = 4096;

const SpotifyWrappedR1 = (props: Props) => {
  const Sketch = (p: p5) => {
    let drawn = false;
    let colorOffset = 0;
    let time = 0;
    let lastTime = 0;
    let offscreenTexture: p5.Graphics;
    p.setup = () => {
      console.log("setup canvas");
      p.createCanvas(window.innerWidth, window.innerHeight);

      // Create the offscreen texture and store it in a local variable
      offscreenTexture = p.createGraphics(p.width, p.height);
    };
    p.keyPressed = () => {
      // Pressing "s" on keyboard saves the offscreen texture (instead of the canvas)
      saveOffscreenArt(p, offscreenTexture, FILENAME);
    };
    p.draw = () => {
      // Set the background to white to see difference between offscreen texture
      p.background(p.color(BASE_COLORS["gray-1"]));
      offscreenTexture.background(p.color(BASE_COLORS["gray-9"]));

      time += p.deltaTime;
      const timeCheck = time - lastTime;
      const SPEED = 100;
      const shouldTickAnimation = Math.round(timeCheck) > SPEED;

      if (shouldTickAnimation) {
        colorOffset += 1;
        lastTime = time;
      }

      [...new Array(10)].forEach((_, index) => {
        // There are 9 colors, but top and bottom numbers are too light/dark
        // So we only do 6 and offset it by 2 to prevent white spots
        // And each ring increments a color
        const colorIndex = ((index + colorOffset) % 6) + 2;

        const animationSpeed = 2000; // Bigger = slower
        const animation = p.sin(time / animationSpeed);
        const initialDiameter = p.height * 2;
        const diameterOffset = index * 100;
        const diameterAnimation = animation * 1000;

        const initialStrokeWeight = 30;
        const strokeAnimation = animation * 50;
        offscreenTexture.push();
        offscreenTexture.noFill();
        offscreenTexture.stroke(p.color(BASE_COLORS[`blue-${colorIndex}`]));
        offscreenTexture.strokeWeight(initialStrokeWeight + strokeAnimation);
        offscreenTexture.circle(
          0,
          p.height,
          initialDiameter + diameterOffset + diameterAnimation
        );
        offscreenTexture.pop();
      });

      // We display the texture for the user to preview
      // Since I'm doing images with a square ratio (1:1 width and height)
      // We do the shortest edge so we can get a proper square
      const shortestEdge = Math.min(p.width, p.height);
      p.image(offscreenTexture, 0, 0, p.width, p.height);
    };
  };

  return <P5Sketch sketch={Sketch} />;
};

export default SpotifyWrappedR1;
