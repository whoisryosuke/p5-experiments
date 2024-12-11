import P5Sketch from "@/components/P5Sketch";
import { drawCircle } from "@/helpers/drawing/drawCircle";
import { saveArt, saveOffscreenArt } from "@/helpers/drawing/saveArt";
import { Note, useInputStore, UserInputMap } from "@/store/input";
import p5 from "p5";
import React from "react";
import { BASE_COLORS } from "themes/colors/base";

type Props = {};

type NoteState = {
  id: string;
  note: Note;
  drawn: boolean;
};

const FILENAME = "MidiPlaybackTextureR2";
const SIZE = 4096;

// We store note presses in a block (square) that contains the current note state
// The square is broken into a 4x3 grid for each note in an octave (12 in total)
// Each note represents 1px by 1px inside the block -- but can be scaled up
// The block position determines when note was pressed
const BLOCK_SIZE_HEIGHT = 50;
const HEADER_BLOCK_SIZE_HEIGHT = BLOCK_SIZE_HEIGHT * 3;
const KEY_POSITIONS: Record<Note, number> = {
  C4: 1,
  Cb4: 2,
  D4: 3,
  Db4: 4,
  E4: 5,
  F4: 6,
  Fb4: 7,
  G4: 8,
  Gb4: 9,
  A4: 10,
  Ab4: 11,
  B4: 12,
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

const MidiPlaybackTextureR2 = (props: Props) => {
  const Sketch = (p: p5) => {
    let time = 0;
    let userStartedPlaying = false;
    let drawn = false;
    let offscreenTexture: p5.Graphics;
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
    let notes: NoteState[] = [];

    const deleteNote = (id: string) => {
      const noteId = notes.findIndex((note) => note.id == id);
      if (noteId < 0) return;
      notes.splice(noteId, 1);
    };

    const markNoteAsDrawn = (id: string) => {
      const noteId = notes.findIndex((note) => note.id == id);
      if (noteId < 0) return;
      notes[noteId].drawn = true;
      console.log("note drawn", id, noteId, notes[noteId].drawn);
    };

    p.setup = () => {
      console.log("setup canvas");
      p.createCanvas(window.innerWidth, window.innerHeight);
      // Set the background to white to see difference between offscreen texture
      p.background(p.color(BASE_COLORS["gray-1"]));

      // Create the offscreen texture and store it in a local variable
      offscreenTexture = p.createGraphics(SIZE, SIZE);
      offscreenTexture.background(p.color(BASE_COLORS["gray-9"]));

      // Draw initial blocks
      [...new Array(12)].forEach((_, index) => {
        const blockSizeWidth = SIZE / 12;
        const x = index * blockSizeWidth;

        const fillColor = p.color(
          BASE_COLORS[`${Object.values(KEY_COLORS)[index]}-7`]
        );
        offscreenTexture.fill(fillColor);
        offscreenTexture.rect(x, 0, blockSizeWidth, HEADER_BLOCK_SIZE_HEIGHT);

        const textX = x + blockSizeWidth / 2.5;
        const textY = HEADER_BLOCK_SIZE_HEIGHT / 1.75;
        const textColor = p.color(BASE_COLORS["gray-3"]);
        offscreenTexture.fill(textColor);
        offscreenTexture.textSize(48);
        offscreenTexture.textStyle("bold");
        offscreenTexture.text(Object.keys(KEY_COLORS)[index], textX, textY);
      });
    };
    p.keyPressed = () => {
      // Pressing "s" on keyboard saves the offscreen texture (instead of the canvas)
      saveOffscreenArt(p, offscreenTexture, FILENAME, "p");
    };
    p.draw = () => {
      // Only increment time once user presses first MIDI key
      if (userStartedPlaying) time += p.deltaTime;

      const { input } = useInputStore.getState();

      // Check if notes changed
      // Filter by the 4th octave
      const inputState = Object.entries(input).filter(([noteKey, noteState]) =>
        noteKey.includes("4")
      );
      inputState.forEach(([noteKey, notePressed]) => {
        // Key was pressed or released
        if (localInput[noteKey] !== notePressed) {
          if (!userStartedPlaying) userStartedPlaying = true;
          // Spawn a note if pressed
          if (notePressed) {
            console.log("spawning note", noteKey);
            const id = Number(new Date()).toString(36);
            notes.push({
              id,
              note: noteKey as Note,
              drawn: false,
            });
          }
        }
        localInput[noteKey] = notePressed;
      });

      notes = notes.filter((note) => !note.drawn);

      // Loop over notes
      notes.forEach((note) => {
        if (note.drawn) return;
        const blockSizeWidth = p.width / 12;
        const x = KEY_POSITIONS[note.note] * blockSizeWidth;
        const timeScaled = time / 100;
        const y = timeScaled * BLOCK_SIZE_HEIGHT;

        const fillColor = p.color(BASE_COLORS[`${KEY_COLORS[note.note]}-7`]);
        offscreenTexture.fill(fillColor);
        offscreenTexture.rect(
          x,
          y + HEADER_BLOCK_SIZE_HEIGHT,
          blockSizeWidth,
          BLOCK_SIZE_HEIGHT
        );

        markNoteAsDrawn(note.id);
      });

      // We display the texture for the user to preview
      // Since I'm doing images with a square ratio (1:1 width and height)
      // We do the shortest edge so we can get a proper square
      const shortestEdge = Math.min(p.width, p.height);
      p.image(offscreenTexture, 0, 0, shortestEdge, shortestEdge);
    };
  };

  return <P5Sketch sketch={Sketch} />;
};

export default MidiPlaybackTextureR2;
