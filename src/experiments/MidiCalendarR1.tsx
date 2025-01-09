import P5Sketch from "@/components/P5Sketch";
import { drawCircle } from "@/helpers/drawing/drawCircle";
import { saveArt } from "@/helpers/drawing/saveArt";
import { Position2D } from "@/helpers/types";
import { useInputStore, UserInputMap } from "@/store/input";
import { animate, AnimationSequence } from "motion";
import p5 from "p5";
import React from "react";
import { BASE_COLORS, THEME_COLORS } from "themes/colors/base";

function daysInMonth(month, year) {
  return new Date(year, month, 0).getDate();
}

const DAYS_IN_A_WEEK = 7;
const DAYS_IN_A_MONTH = 5;

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
    let fontFamily = null;
    let currentDate = new Date();
    let currentDayIndex = 0;
    let dayParticles: DayParticle[] = [];
    let localInput: Partial<UserInputMap> = {
      C4: false,
      D4: false,
      E4: false,
      F4: false,
      G4: false,
      A4: false,
      B4: false,
      Cb4: false,
      Db4: false,
      Fb4: false,
      Gb4: false,
      Ab4: false,
    };

    const changeToNextMonth = () => {
      currentDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        1
      );
      currentDayIndex = 0;
    };

    const generateParticlesForMonth = () => {
      dayParticles = [];

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
            opacity: 0,
          },
        };
        const particleLength = dayParticles.push(newParticle);

        const currentParticle = dayParticles[particleLength - 1];

        // Trigger animation
        const sequence: AnimationSequence = [
          [
            currentParticle.animation,
            {
              x: 0,
              y: 50,
              opacity: 0,
            },
            { duration: 1 },
          ],
          [
            currentParticle.animation,
            {
              x: 0,
              y: 0,
              opacity: 1,
            },
            { duration: 1 },
          ],
        ];
        animate(sequence);
      });
    };

    const destroyParticle = () => {
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
      if (nextIndex >= dayParticles.length) {
        // Next month
        setTimeout(() => {
          console.log("Next month!");
          changeToNextMonth();
          generateParticlesForMonth();
        }, 2000);
      } else {
        currentDayIndex = nextIndex;
      }
    };

    p.setup = () => {
      console.log("setup canvas");
      p.createCanvas(window.innerWidth, window.innerHeight);
      p.stroke(255); // Set line drawing color to white
      p.frameRate(30);

      // Load font
      fontFamily = p.loadFont("../fonts/InterTight-SemiBold.ttf");

      // Hydrate in day particles
      generateParticlesForMonth();
    };
    p.keyPressed = () => {
      saveArt(p, FILENAME);
    };
    p.draw = () => {
      // console.log('drawing!!')
      p.background(p.color(BASE_COLORS["gray-9"])); // Set the background to black

      const { input } = useInputStore.getState();

      // Check if notes changed
      const inputState = Object.entries(input).filter(([noteKey, noteState]) =>
        noteKey.includes("4")
      );
      inputState.forEach(([noteKey, notePressed]) => {
        // Key was pressed or released
        if (localInput[noteKey] !== notePressed) {
          // Spawn a note if pressed
          if (notePressed) {
            console.log("spawning note");
            destroyParticle();
          }
          localInput[noteKey] = notePressed;
        }
      });

      const biggestEdge = p.width < p.height ? p.width : p.height;

      const screenPaddingX = biggestEdge / 4;
      const screenPaddingY = biggestEdge / 4;

      const boxSizeWidth = (p.width - screenPaddingX * 2) / DAYS_IN_A_WEEK;
      const boxSizeHeight = (p.height - screenPaddingX * 2) / DAYS_IN_A_MONTH;
      // const boxSizeHeight = 100;
      const radius = 8;
      const boxRadius = [radius, radius, radius, radius];

      // Render framing
      // Render the month name
      const monthName = currentDate.toLocaleString("default", {
        month: "long",
      });
      p.strokeWeight(0);
      if (fontFamily !== null) p.textFont(fontFamily);
      p.textSize(256);
      p.textAlign(p.CENTER);
      p.text(monthName, p.width / 2, screenPaddingX - 36);

      // Render the days
      dayParticles.map((state, dayNumber) => {
        const weekNumber = Math.floor(dayNumber / 7);
        const baseX = dayNumber % 7;

        const x = baseX * boxSizeWidth + screenPaddingX + state.animation.x;
        const y =
          weekNumber * boxSizeHeight + screenPaddingX + state.animation.y;

        // Fill color
        const destroyColor = baseX + (weekNumber % 2) == 1 ? "red" : "orange";
        const randomColor = THEME_COLORS[dayNumber % THEME_COLORS.length];
        // p.fill(p.color(BASE_COLORS[`${randomColor}-5`]));
        let fillColor = p.color(BASE_COLORS[`${randomColor}-7`]);
        if (state.destroy) {
          fillColor = p.color(BASE_COLORS[`${destroyColor}-5`]);
        }
        fillColor.setAlpha(state.animation.opacity * 255);
        p.fill(fillColor);

        // Stroke color
        let strokeColor = p.color(BASE_COLORS[`gray-5`]);
        if (state.destroy) {
          strokeColor = p.color(BASE_COLORS[`${destroyColor}-3`]);
        }
        strokeColor.setAlpha(state.animation.opacity * 255);
        p.strokeWeight(3);
        p.stroke(strokeColor);

        // Draw the box
        const gridSpacingX = baseX == DAYS_IN_A_WEEK ? 0 : 16;
        const gridSpacingY = weekNumber == DAYS_IN_A_MONTH ? 0 : 16;
        p.rect(
          x,
          y,
          boxSizeWidth - gridSpacingX,
          boxSizeHeight - gridSpacingY,
          ...boxRadius
        );

        // Draw date
        const datePaddingX = boxSizeWidth * 0.1;
        const datePaddingY = boxSizeHeight * 0.3;
        let textColor = p.color(BASE_COLORS[`gray-2`]);
        textColor.setAlpha(state.animation.opacity * 255);
        p.fill(textColor);
        p.strokeWeight(0);
        p.textSize(32);
        p.text(dayNumber + 1, x + datePaddingX, y + datePaddingY);
      });
    };
  };

  return <P5Sketch sketch={Sketch} />;
};

export default MidiCalendarR1;
