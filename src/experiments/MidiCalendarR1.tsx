import P5Sketch from "@/components/P5Sketch";
import { drawCircle } from "@/helpers/drawing/drawCircle";
import { saveArt } from "@/helpers/drawing/saveArt";
import { Position2D } from "@/helpers/types";
import { animate, AnimationSequence } from "motion";
import p5 from "p5";
import React from "react";
import { BASE_COLORS, THEME_COLORS } from "themes/colors/base";

function daysInMonth(month, year) {
  return new Date(year, month, 0).getDate();
}

const DAYS_IN_A_WEEK = 7;

type DayParticle = {
  index: number;
  destroy: boolean;
  startTime: number;
  animation: Position2D & {
    opacity: number;
  };
};

type Props = {};

const FILENAME = "MidiCalendarR1";

const MidiCalendarR1 = (props: Props) => {
  const Sketch = (p: p5) => {
    let y = 100;
    let currentDayIndex = 0;
    let dayParticles: DayParticle[] = [];
    p.setup = () => {
      console.log("setup canvas");
      p.createCanvas(window.innerWidth, window.innerHeight);
      p.stroke(255); // Set line drawing color to white
      p.frameRate(30);

      // Hydrate in day particles
      const currentDate = new Date();
      const daysInCurrentMonth = daysInMonth(
        currentDate.getMonth(),
        currentDate.getFullYear()
      );
      new Array(daysInCurrentMonth).fill(0).map((_, dayNumber) => {
        const newParticle: DayParticle = {
          index: dayNumber,
          destroy: false,
          startTime: 0,
          animation: {
            x: 0,
            y: 0,
            opacity: 1,
          },
        };
        dayParticles.push(newParticle);
      });
    };
    p.keyPressed = () => {
      saveArt(p, FILENAME);

      if (p.key === "v") {
        console.log("test destroy");
        const currentParticle = dayParticles[currentDayIndex];
        currentParticle.destroy = true;
        currentParticle.startTime = Date.now();

        // Trigger animation
        const sequence: AnimationSequence = [
          [
            currentParticle.animation,
            {
              x: 0,
              y: -50,
              opacity: 1,
            },
            { duration: 1 },
          ],
          [
            currentParticle.animation,
            {
              x: 0,
              y: -200,
              opacity: 0,
            },
            { duration: 1 },
          ],
        ];
        animate(sequence);

        const nextIndex = currentDayIndex + 1;
        if (nextIndex > dayParticles.length) {
          // Next month
        } else {
          currentDayIndex = nextIndex;
        }
      }
    };
    p.draw = () => {
      // console.log('drawing!!')
      p.background(p.color(BASE_COLORS["gray-9"])); // Set the background to black

      p.strokeWeight(3);
      const biggestEdge = p.width < p.height ? p.width : p.height;

      const screenPaddingX = biggestEdge / 4;
      const screenPaddingY = biggestEdge / 4;

      const boxSizeWidth = (p.width - screenPaddingX * 2) / DAYS_IN_A_WEEK;
      const boxSizeHeight = 100;
      const boxRadius = [16, 16, 16, 16];

      dayParticles.map((state, dayNumber) => {
        const weekNumber = Math.floor(dayNumber / 7);
        const baseX = dayNumber % 7;

        const x = baseX * boxSizeWidth + screenPaddingX + state.animation.x;
        const y =
          weekNumber * boxSizeHeight + screenPaddingX + state.animation.y;

        // Fill color
        const randomColor =
          THEME_COLORS[Math.floor(Math.random() * THEME_COLORS.length)];
        // p.fill(p.color(BASE_COLORS[`${randomColor}-5`]));
        let fillColor = p.color(BASE_COLORS[`blue-5`]);
        if (state.destroy) {
          fillColor = p.color(BASE_COLORS[`red-5`]);
        }
        fillColor.setAlpha(state.animation.opacity * 255);
        p.fill(fillColor);

        // Stroke color
        const strokeColor = p.color(BASE_COLORS["gray-5"]);
        strokeColor.setAlpha(state.animation.opacity * 255);
        p.stroke(strokeColor);

        // Draw the box
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
