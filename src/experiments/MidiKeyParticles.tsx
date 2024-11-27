import P5Sketch from "@/components/P5Sketch";
import { drawCircle } from "@/helpers/drawing/drawCircle";
import { saveArt } from "@/helpers/drawing/saveArt";
import { Note, useInputStore, UserInputMap } from "@/store/input";
import p5 from "p5";
import React from "react";
import { BASE_COLORS } from "themes/colors/base";

type NoteParticle = {
  note: Note;
  created: number;
  destroy: boolean;
  initialPosition: {
    x: number;
    y: number;
  };
};

type Props = {};

const FILENAME = "MidiKeyParticles";

const NOTE_HEIGHT = 200;
const NOTE_DURATION = 710;
const NOTE_LINGER_DURATION = 10;
const TOTAL_KEY_POSITIONS = 7;
const NOTE_BORDER_RADIUS = 30;
const KEY_POSITIONS: Record<Note, number> = {
  C4: 1,
  D4: 2,
  E4: 3,
  F4: 4,
  G4: 5,
  A4: 6,
  B4: 7,
  Cb4: 1.5,
  Db4: 2.5,
  Fb4: 4.5,
  Gb4: 5.5,
  Ab4: 6.5,
};
const KEY_COLORS: Record<Note, string> = {
  C4: "red",
  D4: "pink",
  E4: "grape",
  F4: "violet",
  G4: "indigo",
  A4: "blue",
  B4: "cyan",
  Cb4: "teal",
  Db4: "green",
  Fb4: "lime",
  Gb4: "yellow",
  Ab4: "orange",
};

const MidiKeyParticles = (props: Props) => {
  const Sketch = (p: p5) => {
    let time = 0;
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
    const notes: NoteParticle[] = [];
    p.setup = () => {
      console.log("setup canvas");
      p.createCanvas(window.innerWidth, window.innerHeight);
      p.stroke(255); // Set line drawing color to white
      p.frameRate(60);
    };
    p.keyPressed = () => {
      saveArt(p, FILENAME);
    };
    p.draw = () => {
      time += p.deltaTime;
      // console.log('drawing!!')
      p.background(p.color(BASE_COLORS["gray-9"])); // Set the background to black
      const { input } = useInputStore.getState();

      // Determine note width based off canvas size
      const noteWidth = p.width / TOTAL_KEY_POSITIONS;

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
            const keyX = (KEY_POSITIONS[noteKey] - 1) * noteWidth;
            notes.push({
              note: noteKey as Note,
              created: time,
              destroy: false,
              initialPosition: {
                x: keyX,
                y: p.height - NOTE_HEIGHT,
              },
            });
          }

          localInput[noteKey] = notePressed;
        }
      });

      // Draw and animate notes
      p.strokeWeight(4);
      const drawNotes = [...notes];
      drawNotes.forEach((note) => {
        // Animate the note upwards
        const startY = note.initialPosition.y;
        const fadeUpAnimation = {
          start: {
            y: startY,
            opacity: 0,
          },
          end: { y: startY - 300, opacity: 1 },
          animate: Math.min((time - note.created) / NOTE_DURATION, 1),
        };
        const fadeDownAnimation = {
          start: { y: startY - 300, opacity: 1 },
          end: { y: startY - 600, opacity: 0 },
          animate: Math.min(
            (time - note.created - NOTE_DURATION) / NOTE_DURATION,
            1
          ),
        };
        const currentAnimation = note.destroy
          ? fadeDownAnimation
          : fadeUpAnimation;
        const y = p.lerp(
          currentAnimation.start.y,
          currentAnimation.end.y,
          currentAnimation.animate
        );
        p.push();
        const fillColor = p.color(BASE_COLORS[`${KEY_COLORS[note.note]}-7`]);
        const opacity = p.lerp(
          currentAnimation.start.opacity,
          currentAnimation.end.opacity,
          currentAnimation.animate
        );
        fillColor.setAlpha(opacity * 255);
        const strokeColor = p.color(BASE_COLORS[`${KEY_COLORS[note.note]}-5`]);
        strokeColor.setAlpha(opacity * 255);
        p.stroke(strokeColor);
        p.fill(fillColor);
        p.rect(
          note.initialPosition.x,
          y,
          noteWidth,
          NOTE_HEIGHT,
          NOTE_BORDER_RADIUS
        );
        p.pop();
      });

      // Destroy notes
      for (let index = 0; index < notes.length; index++) {
        const note = notes[index];
        if (time - note.created >= NOTE_DURATION) {
          notes[index].destroy = true;
        }
      }
      for (let index = 0; index < notes.length; index++) {
        const note = notes[index];
        if (time - note.created >= NOTE_DURATION * 3) {
          // Gotta delete using splice (and not `delete` because it leaves an undefined slot and breaks draw calls above)
          notes.splice(index, 1);
        }
      }
    };
  };

  return <P5Sketch sketch={Sketch} />;
};

export default MidiKeyParticles;
