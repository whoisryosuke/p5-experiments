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

const FILENAME = "MidiCirclePlayerR6";
const MIDI_FILE_PATH = "games/MML_apple_market.mid";
const MIDI_TRACK_INDEX = 4;
const BOX_BORDER_RADIUS = 16;

const MidiCirclePlayerR6 = (props: Props) => {
  const Sketch = (p: p5) => {
    let time = 0;
    let fontFamily = null;
    let midiFile: Midi;
    // Represents all the notes we expect to press in a song
    // Helps determine how many circles we have to make
    let totalNotes = new Set();
    let noteTracks = [] as Array<Array<Note>>;
    let strokeSize = 20;
    let trackLabelFontSize = 7;
    let midiMetadata = {
      title: "",
      trackName: "",
      duration: 0,
    };

    const loadMidiFile = async () => {
      midiFile = await Midi.fromUrl(
        // "/midi/mozart-sonata-16-scales-snippet.mid"
        `/midi/${MIDI_FILE_PATH}`
      );

      // Debug: Check the tracks to use
      // console.log("[MIDI FILE] Tracks:");
      // midiFile.tracks.forEach((track, index) =>
      //   console.log(index, track.name, track.instrument)
      // );

      // Preload the tracks mapped by note
      let tempTracks = {};
      midiFile.tracks[MIDI_TRACK_INDEX].notes.forEach((note) => {
        const noteName = midiToNote(note.midi, true);
        // console.log("note", noteName, note.time);
        totalNotes.add(note.midi);
        if (!tempTracks[note.midi]) {
          tempTracks[note.midi] = [];
        }
        tempTracks[note.midi] = [...tempTracks[note.midi], note];
      });

      noteTracks = Object.values(tempTracks);

      // Scale the strokes and fonts based on the number of tracks we have
      strokeSize = p.map(noteTracks.length, 0, 40, 60, 20);
      trackLabelFontSize = p.map(noteTracks.length, 0, 40, 24, 7);

      // Update metadata for display
      const possibleTitles = [
        midiFile.name,
        midiFile.header.name,
        MIDI_FILE_PATH,
      ];
      const newTitle = possibleTitles.find((title) => title != "");
      midiMetadata = {
        title: newTitle,
        trackName: midiFile.tracks[MIDI_TRACK_INDEX].name,
        duration: midiFile.duration,
      };
      console.log("metadata", midiMetadata);
      console.log("note tracks", noteTracks);
    };

    p.setup = () => {
      console.log("setup canvas");
      p.createCanvas(window.innerWidth, window.innerHeight);
      p.stroke(255); // Set line drawing color to white
      p.frameRate(120);

      fontFamily = p.loadFont("../fonts/InterTight-SemiBold.ttf");
      loadMidiFile();
    };
    p.keyPressed = () => {
      saveArt(p, FILENAME);
    };
    p.draw = () => {
      if (!midiFile) return;

      const LANE_SPACING = strokeSize * 2.2;

      // Increment local time for animation
      time += p.deltaTime;

      p.background(p.color(BASE_COLORS["gray-9"])); // Set the background to black
      if (fontFamily !== null) p.textFont(fontFamily);
      p.noFill();
      p.strokeWeight(strokeSize);

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
      p.textSize(trackLabelFontSize);
      p.textAlign(p.CENTER);
      noteTracks.forEach((track, index) => {
        const trackLabel = midiToNote(track[0].midi, true);

        // Render "lanes"
        p.noFill();
        p.strokeWeight(strokeSize);
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
          x - width / 2 + (strokeSize * 1.1 * index + 1) + 2,
          y
        );
      });

      // Render animates notes
      // Loop over each "track" aka different notes
      p.noFill();
      p.strokeWeight(strokeSize);
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
      p.line(x, y, x + width / 1.5, y);

      // The current time in seconds for debug
      p.strokeWeight(0);
      p.fill(BASE_COLORS["gray-6"]);
      p.textSize(30);
      p.textAlign(p.RIGHT);
      p.text(timeInSeconds.toFixed(2), x + width / 1.5, y - 10);

      p.fill(BASE_COLORS["gray-7"]);
      p.textSize(24);
      p.textAlign(p.RIGHT);
      p.text("TIME", x + width / 1.5, y - 40);

      // MIDI metadata
      p.push();
      p.rotate(p.HALF_PI);
      p.fill(BASE_COLORS["gray-6"]);
      p.textSize(60);
      p.textAlign(p.CENTER);
      p.text(midiMetadata.trackName, p.height / 2, -p.width / 4 + 60);

      p.stroke(BASE_COLORS["gray-6"]);
      p.strokeWeight(2);
      p.noFill();
      const boxWidth = midiMetadata.trackName.length * 50;
      p.rect(
        p.height / 2 - boxWidth / 2,
        -p.width / 4,
        boxWidth,
        80,
        BOX_BORDER_RADIUS,
        BOX_BORDER_RADIUS,
        BOX_BORDER_RADIUS,
        BOX_BORDER_RADIUS
      );

      p.noStroke();
      p.fill(BASE_COLORS["gray-7"]);
      p.textSize(24);
      p.textAlign(p.CENTER);
      p.text(midiMetadata.title, p.height / 2, -p.width / 4 - 20);
      p.pop();
    };
  };

  return <P5Sketch sketch={Sketch} />;
};

export default MidiCirclePlayerR6;
