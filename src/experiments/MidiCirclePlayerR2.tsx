import P5Sketch from "@/components/P5Sketch";
import { drawCircle } from "@/helpers/drawing/drawCircle";
import { saveArt } from "@/helpers/drawing/saveArt";
import { midiToNote } from "@/helpers/midi/midiToNote";
import { Midi } from "@tonejs/midi";
import p5 from "p5";
import React from "react";
import { BASE_COLORS } from "themes/colors/base";

type Props = {};

const FILENAME = "MidiCirclePlayerR2";

const MidiCirclePlayerR2 = (props: Props) => {
  const Sketch = (p: p5) => {
    let time = 0;
    let midiFile: Midi;
    // Represents all the notes we expect to press in a song
    // Helps determine how many circles we have to make
    let totalNotes = [];

    const loadMidiFile = async () => {
      midiFile = await Midi.fromUrl(
        "/midi/mozart-sonata-16-scales-snippet.mid"
      );

      midiFile.tracks[0].notes.forEach((note) => {
        const noteName = midiToNote(note.midi, true);
        console.log("note", noteName, note.time);
        totalNotes.push(noteName);
      });
    };

    p.setup = () => {
      console.log("setup canvas");
      p.createCanvas(window.innerWidth, window.innerHeight);
      p.stroke(255); // Set line drawing color to white
      p.frameRate(120);

      loadMidiFile();
    };
    p.keyPressed = () => {
      saveArt(p, FILENAME);
    };
    p.draw = () => {
      if (!midiFile) return;

      time += p.deltaTime;
      // console.log('drawing!!')
      p.background(p.color(BASE_COLORS["gray-9"])); // Set the background to black

      p.noFill();
      p.strokeWeight(20);
      p.stroke(p.color(BASE_COLORS["blue-5"]));

      const SEGMENT_SIZE = p.PI / 10;

      const durationInSeconds = 10;
      const duration = durationInSeconds * 1000;
      const timeLoop = time % duration;
      const timeAnimation = p.map(timeLoop, 0, duration, 0, p.PI * 2);
      const currentSegment = Math.floor(time / duration);

      // Center the circle
      const x = p.width / 2;
      const y = p.height / 2;
      // And make it perfectly round (not ovular)
      const biggestEdge = p.width < p.height ? p.width : p.height;
      const width = biggestEdge / 2;
      const height = biggestEdge / 2;

      const timeInSeconds = time / 1000;
      // We loop every `duration`, so we need to play notes in that segment
      const visibleNotes = midiFile.tracks[0].notes.filter(
        (note) =>
          note.time < timeInSeconds + durationInSeconds &&
          note.time > timeInSeconds
      );

      const c5Notes = visibleNotes.filter(
        (note) => midiToNote(note.midi, true) == "C5"
      );

      c5Notes.forEach((note) => {
        const noteAnimation = p.map(
          note.time,
          timeInSeconds,
          timeInSeconds - durationInSeconds,
          0,
          p.PI * 2
        );
        p.arc(
          x,
          y,
          width - 50,
          height - 50,
          noteAnimation,
          noteAnimation + SEGMENT_SIZE
        );
      });

      // time indicator
      p.arc(x, y, width, height, timeAnimation, timeAnimation + SEGMENT_SIZE);

      // A playback bar to know when it's "looped" one full duration
      p.strokeWeight(5);
      p.stroke(BASE_COLORS["gray-8"]);
      p.line(x, y, x + width, y);

      // The current time in seconds for debug
      p.strokeWeight(0);
      p.fill(BASE_COLORS["gray-3"]);
      p.text(timeInSeconds.toFixed(2), x + width - 20, y - 10);
    };
  };

  return <P5Sketch sketch={Sketch} />;
};

export default MidiCirclePlayerR2;
