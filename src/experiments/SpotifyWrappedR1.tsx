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
    let width = 100;
    let height = 100;
    p.setup = () => {
      console.log("setup canvas");
      p.createCanvas(window.innerWidth, window.innerHeight);

      // Create the offscreen texture and store it in a local variable
      width = p.width;
      height = p.height;
      offscreenTexture = p.createGraphics(width, height);
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
      const SPEED = 200;
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
        const initialDiameter = height * 2;
        const diameterOffset = index * (animation + 1.5) * 100;
        const diameterAnimation = animation * 1000;

        const initialStrokeWeight = 30;
        const strokeAnimation = (animation + 1) * 50;
        offscreenTexture.push();
        offscreenTexture.noFill();
        offscreenTexture.stroke(p.color(BASE_COLORS[`blue-${colorIndex}`]));
        offscreenTexture.strokeWeight(initialStrokeWeight + strokeAnimation);
        offscreenTexture.circle(
          0,
          height,
          initialDiameter + diameterOffset + diameterAnimation
        );
        offscreenTexture.pop();
      });

      p.image(offscreenTexture, 0, 0, width, height);
    };
  };

  return <P5Sketch sketch={Sketch} />;
};

export default SpotifyWrappedR1;
