import P5Sketch from "@/components/P5Sketch";
import { drawCircle } from "@/helpers/drawing/drawCircle";
import { saveArt } from "@/helpers/drawing/saveArt";
import { animate } from "motion";
import p5 from "p5";
import React from "react";
import { BASE_COLORS } from "themes/colors/base";

type Props = {};

const FILENAME = "MotionDevExample";

const MotionDevExample = (props: Props) => {
  const Sketch = (p: p5) => {
    let y = 100;
    let animation = {
      x: 0,
      y: 0,
    };
    p.setup = () => {
      console.log("setup canvas");
      p.createCanvas(window.innerWidth, window.innerHeight);
      p.stroke(255); // Set line drawing color to white
      p.frameRate(30);

      animate(
        animation,
        { x: 100, y: 100 },
        {
          duration: 0.5,
          repeat: Infinity,
          autoplay: true,
          repeatType: "mirror",
        }
      );
    };
    p.keyPressed = () => {
      saveArt(p, FILENAME);
    };
    p.draw = () => {
      console.log("animate", animation);
      // console.log('drawing!!')
      p.background(p.color(BASE_COLORS["gray-9"])); // Set the background to black

      p.strokeWeight(3);
      p.stroke(p.color(BASE_COLORS["gray-5"]));
      const resolution = 40;
      const biggestEdge = p.width < p.height ? p.width : p.height;
      const radius = biggestEdge / 4;
      const startX = p.width / 2;
      const startY = p.height / 2;
      drawCircle(
        p,
        radius,
        resolution,
        startX + animation.x,
        startY + animation.y
      );
    };
  };

  return <P5Sketch sketch={Sketch} />;
};

export default MotionDevExample;
