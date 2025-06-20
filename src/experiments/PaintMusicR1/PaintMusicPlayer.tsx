import P5Sketch from "@/components/P5Sketch";
import { drawCircle } from "@/helpers/drawing/drawCircle";
import { saveArt } from "@/helpers/drawing/saveArt";
import p5 from "p5";
import React from "react";
import { BASE_COLORS } from "themes/colors/base";

// In ms
const TOTAL_TIME = 6000;

type Props = {};

const PaintMusicR1 = (props: Props) => {
  const Sketch = (p: p5) => {
    let playing = false;
    let time = 0;
    p.setup = () => {
      console.log("setup canvas");
      p.createCanvas(window.innerWidth, window.innerHeight);
      p.stroke(255); // Set line drawing color to white
    };
    p.keyPressed = () => {
      if (p.key == "k") {
        playing = !playing;
        console.log("playing", playing);
      }
    };
    p.draw = () => {
      p.clear();
      // p.background(p.color(BASE_COLORS["gray-9"]));
      if (playing) console.log("time", time);

      p.noStroke();
      p.fill(p.color(BASE_COLORS["blue-5"]));
      const x = (time / TOTAL_TIME) * p.width;

      p.rect(x, 0, 1, p.height);

      if (playing) time += p.deltaTime;
    };
  };

  return <P5Sketch id="canvas-wrapper" sketch={Sketch} />;
};

export default PaintMusicR1;
