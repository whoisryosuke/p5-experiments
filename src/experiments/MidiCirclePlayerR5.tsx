import P5Sketch from "@/components/P5Sketch";
import { drawCircle } from "@/helpers/drawing/drawCircle";
import { saveArt } from "@/helpers/drawing/saveArt";
import { midiToNote } from "@/helpers/midi/midiToNote";
import { Midi } from "@tonejs/midi";
import { Note } from "@tonejs/midi/dist/Note";
import p5 from "p5";
import React from "react";
import { BASE_COLORS } from "themes/colors/base";

type Props = {};

const FILENAME = "MidiCirclePlayerR5";

const MidiCirclePlayerR5 = (props: Props) => {
  const Sketch = (p: p5) => {
    let time = 0;
    let midiFile: Midi;
    // Represents all the notes we expect to press in a song
    // Helps determine how many circles we have to make
    let totalNotes = new Set();
    let noteTracks = [] as Array<Array<Note>>;

    const loadMidiFile = async () => {
      midiFile = await Midi.fromUrl(
        // "/midi/mozart-sonata-16-scales-snippet.mid"
        "/midi/piano_sonata_545_1_(c)oguri.mid"
      );

      let tempTracks = {};
      midiFile.tracks[0].notes.forEach((note) => {
        const noteName = midiToNote(note.midi, true);
        // console.log("note", noteName, note.time);
        totalNotes.add(note.midi);
        if (!tempTracks[note.midi]) {
          tempTracks[note.midi] = [];
        }
        tempTracks[note.midi] = [...tempTracks[note.midi], note];
      });

      noteTracks = Object.values(tempTracks);

      console.log("note tracks", noteTracks);
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

      const STROKE_SIZE = 10;
      const LANE_SPACING = STROKE_SIZE * 2.2;

      // Increment local time for animation
      time += p.deltaTime;

      p.background(p.color(BASE_COLORS["gray-9"])); // Set the background to black

      p.noFill();
      p.strokeWeight(STROKE_SIZE);

      const SEGMENT_SIZE = p.PI / 10;

      const durationInSeconds = 30;
      const duration = durationInSeconds * 1000;
      const timeLoop = time % duration;
      const timeAnimation = p.map(timeLoop, 0, duration, 0, p.PI * 2);
      const currentSegment = Math.floor(time / duration);

      // Center the circle
      const x = p.width / 2;
      const y = p.height / 2;
      // And make it perfectly round (not ovular)
      const biggestEdge = p.width < p.height ? p.width : p.height;
      const width = biggestEdge / 1.2;
      const height = biggestEdge / 1.2;

      const timeInSeconds = time / 1000;
      p.stroke(p.color(BASE_COLORS["gray-8"]));
      p.textStyle(p.BOLD);
      const TRACK_LABEL_FONT_SIZE = 7;
      p.textSize(TRACK_LABEL_FONT_SIZE);
      p.textAlign(p.CENTER);
      noteTracks.forEach((track, index) => {
        const trackLabel = midiToNote(track[0].midi, true);

        // Render "lanes"
        p.noFill();
        p.strokeWeight(STROKE_SIZE);
        p.arc(
          x,
          y,
          width - (LANE_SPACING * index + 1),
          height - (LANE_SPACING * index + 1),
          0,
          p.PI * 2
        );
        p.fill(BASE_COLORS["gray-6"]);
        p.strokeWeight(0);
        p.text(
          trackLabel,
          x,
          y - height / 2 + (STROKE_SIZE * 1.1 * index + 1) + 2
        );
      });

      // Render animates notes
      // Loop over each "track" aka different notes
      p.noFill();
      p.strokeWeight(STROKE_SIZE);
      p.stroke(p.color(BASE_COLORS["blue-5"]));
      noteTracks.forEach((track, index) => {
        // Filter out only visible notes
        const visibleNotes = track.filter(
          (note) =>
            note.time + note.duration < timeInSeconds + durationInSeconds &&
            note.time + note.duration > timeInSeconds
        );
        visibleNotes.forEach((note) => {
          // const realNote = midiToNote(note.midi, true);

          const durationSize = p.map(note.duration, 0, 2, 0, p.PI / 10);

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
            width - (LANE_SPACING * index + 1),
            height - (LANE_SPACING * index + 1),
            noteAnimation,
            noteAnimation + SEGMENT_SIZE + durationSize
          );
        });
      });

      // time indicator
      p.stroke(BASE_COLORS["gray-6"]);
      p.arc(x, y, width, height, timeAnimation, timeAnimation + p.PI / 20);

      // A playback bar to know when it's "looped" one full duration
      p.strokeWeight(5);
      p.stroke(BASE_COLORS["gray-7"]);
      p.line(x, y, x + width, y);

      // The current time in seconds for debug
      p.strokeWeight(0);
      p.fill(BASE_COLORS["gray-6"]);
      p.textSize(30);
      p.textAlign(p.RIGHT);
      p.text(timeInSeconds.toFixed(2), x + width, y - 10);
    };
  };

  return <P5Sketch sketch={Sketch} />;
};

export default MidiCirclePlayerR5;
