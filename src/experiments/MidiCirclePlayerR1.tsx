import P5Sketch from "@/components/P5Sketch";
import { drawCircle } from "@/helpers/drawing/drawCircle";
import { saveArt } from "@/helpers/drawing/saveArt";
import p5 from "p5";
import React from "react";
import { BASE_COLORS } from "themes/colors/base";

type Props = {};

const FILENAME = "MidiCirclePlayerR1";

const MidiCirclePlayerR1 = (props: Props) => {
  const Sketch = (p: p5) => {
    let time = 0;
    p.setup = () => {
      console.log("setup canvas");
      p.createCanvas(window.innerWidth, window.innerHeight);
      p.stroke(255); // Set line drawing color to white
      p.frameRate(120);
    };
    p.keyPressed = () => {
      saveArt(p, FILENAME);
    };
    p.draw = () => {
      time += p.deltaTime;
      // console.log('drawing!!')
      p.background(p.color(BASE_COLORS["gray-9"])); // Set the background to black

      p.noFill();
      p.strokeWeight(20);
      p.stroke(p.color(BASE_COLORS["blue-5"]));
      const SEGMENT_SIZE = p.PI / 10;

      const duration = 10 * 1000; // in ms
      const timeLoop = time % duration;
      const timeAnimation = p.map(timeLoop, 0, duration, 0, p.PI * 2);

      const biggestEdge = p.width < p.height ? p.width : p.height;
      const x = p.width / 2;
      const y = p.height / 2;
      const width = biggestEdge / 2;
      const height = biggestEdge / 2;

      p.arc(x, y, width, height, timeAnimation, timeAnimation + SEGMENT_SIZE);
    };
  };

  return <P5Sketch sketch={Sketch} />;
};

export default MidiCirclePlayerR1;
