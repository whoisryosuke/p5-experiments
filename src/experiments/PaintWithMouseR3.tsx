import P5Sketch from "@/components/P5Sketch";
import { drawCircle } from "@/helpers/drawing/drawCircle";
import { saveArt } from "@/helpers/drawing/saveArt";
import p5 from "p5";
import React from "react";
import { BASE_COLORS } from "themes/colors/base";

type Props = {};

const FILENAME = "PaintWithMouseR3";
// The size of the brush texture
const BRUSH_TEXTURE_SIZE = 600;

const PaintWithMouseR3 = (props: Props) => {
  const Sketch = (p: p5) => {
    let drawing = false;
    let offscreenTexture: p5.Graphics;
    let brushSize = 1200;
    p.setup = () => {
      console.log("setup canvas");
      p.createCanvas(window.innerWidth, window.innerHeight);
      p.stroke(255); // Set line drawing color to white

      // Create a soft edge brush to use
      // Create the offscreen texture and store it in a local variable
      offscreenTexture = p.createGraphics(
        BRUSH_TEXTURE_SIZE,
        BRUSH_TEXTURE_SIZE
      );
      const offscreenCtx = offscreenTexture.drawingContext;

      // Creates a gradient style
      let brushGradient = offscreenCtx.createRadialGradient(
        50,
        50,
        3,
        50,
        50,
        40
      );
      brushGradient.addColorStop(0, "rgb(0, 68, 255)");
      brushGradient.addColorStop(0.9, "rgba(0, 204, 255, 0)");
      brushGradient.addColorStop(1, "rgba(0, 13, 255, 0)");
      offscreenCtx.fillStyle = brushGradient;
      offscreenCtx.strokeStyle = "rgba(0, 0, 0, 0)";

      // Draw on canvas to use gradient style
      offscreenTexture.rect(0, 0, BRUSH_TEXTURE_SIZE, BRUSH_TEXTURE_SIZE);
    };
    p.keyPressed = () => {
      saveArt(p, FILENAME);
    };
    p.draw = () => {
      // console.log('drawing!!')

      // We specifically don't draw a BG or "clear" so previous frames are saved and stacked (creating the drawing effect)
      // p.background(p.color(BASE_COLORS["gray-9"]));

      // If user isn't pressing, don't draw
      if (!drawing) return;
      p.noStroke();
      p.fill(p.color(BASE_COLORS["blue-5"]));
      // Draw "brush"
      p.image(offscreenTexture, p.mouseX, p.mouseY, brushSize, brushSize);
    };

    p.mouseDragged = () => {
      drawing = true;
    };
    p.mouseReleased = () => {
      drawing = false;
    };
  };

  return <P5Sketch sketch={Sketch} />;
};

export default PaintWithMouseR3;
