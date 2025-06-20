import P5Sketch from "@/components/P5Sketch";
import { drawCircle } from "@/helpers/drawing/drawCircle";
import { saveArt } from "@/helpers/drawing/saveArt";
import p5 from "p5";
import React from "react";
import { BASE_COLORS } from "themes/colors/base";

type Props = {};

const FILENAME = "PaintWithMouseR1";

const PaintWithMouseR1 = (props: Props) => {
  const Sketch = (p: p5) => {
    let y = 100;
    let drawing = false;
    p.setup = () => {
      console.log("setup canvas");
      p.createCanvas(window.innerWidth, window.innerHeight);
      p.stroke(255); // Set line drawing color to white
      p.frameRate(30);
    };
    p.keyPressed = () => {
      saveArt(p, FILENAME);
    };
    p.draw = () => {
      // console.log('drawing!!')
      // p.background(p.color(BASE_COLORS["gray-9"])); // Set the background to black

      if (!drawing) return;
      p.noStroke();
      p.fill(p.color(BASE_COLORS["blue-5"]));
      p.circle(p.mouseX, p.mouseY, 10);
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

export default PaintWithMouseR1;
