import P5Sketch from "@/components/P5Sketch";
import { drawCircle } from "@/helpers/drawing/drawCircle";
import { saveArt } from "@/helpers/drawing/saveArt";
import p5 from "p5";
import React from "react";
import { BASE_COLORS, THEME_COLORS } from "themes/colors/base";

type Props = {};

const FILENAME = "MidiCalendarR1";

const MidiCalendarR1 = (props: Props) => {
  const Sketch = (p: p5) => {
    let y = 100;
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
      p.background(p.color(BASE_COLORS["gray-9"])); // Set the background to black

      p.strokeWeight(3);
      p.stroke(p.color(BASE_COLORS["gray-5"]));
      const resolution = 40;
      const biggestEdge = p.width < p.height ? p.width : p.height;
      const radius = biggestEdge / 4;
      const startX = p.width / 2;
      const startY = p.height / 2;

      const screenPaddingX = biggestEdge / 4;
      const screenPaddingY = biggestEdge / 4;

      // 7 x 5
      const DAYS_IN_A_WEEK = 7;
      const WEEKS_IN_A_MONTH = 5;

      const boxSizeWidth = (p.width - screenPaddingX * 2) / DAYS_IN_A_WEEK;
      const boxSizeHeight = 100;
      const boxRadius = [16, 16, 16, 16];

      const DAYS_IN_A_MONTH = 31;
      new Array(DAYS_IN_A_MONTH).fill(0).map((_, dayNumber) => {
        const weekNumber = Math.floor(dayNumber / 7);
        const baseX = dayNumber % 7;

        const x = baseX * boxSizeWidth + screenPaddingX;
        const y = weekNumber * boxSizeHeight + screenPaddingX;

        const randomColor =
          THEME_COLORS[Math.floor(Math.random() * THEME_COLORS.length)];
        // p.fill(p.color(BASE_COLORS[`${randomColor}-5`]));
        p.fill(p.color(BASE_COLORS[`blue-5`]));
        p.rect(x, y, boxSizeWidth, boxSizeHeight, ...boxRadius);
      });

      // new Array(WEEKS_IN_A_MONTH).fill(0).map((_, baseY) => {
      //   new Array(DAYS_IN_A_WEEK).fill(0).map((_, baseX) => {
      //     const x = baseX * boxSizeWidth + screenPaddingX;
      //     const y = baseY * boxSizeHeight + screenPaddingX;

      //     const randomColor =
      //       THEME_COLORS[Math.floor(Math.random() * THEME_COLORS.length)];
      //     p.fill(p.color(BASE_COLORS[`${randomColor}-5`]));
      //     p.rect(x, y, boxSizeWidth, boxSizeHeight, ...boxRadius);
      //   });
      // });
    };
  };

  return <P5Sketch sketch={Sketch} />;
};

export default MidiCalendarR1;
