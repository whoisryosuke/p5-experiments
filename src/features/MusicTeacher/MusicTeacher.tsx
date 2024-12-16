import { useInputStore } from "@/store/input";
import React, { useEffect, useState } from "react";
import { GeneratorConfig, TeoriaNote } from "./types";
import teoria from "teoria";
import { Chord, Note } from "tonal";
import { CHORD_SYMBOLS, CHORD_TYPES } from "./data/chord-symbols";
import { NOTE_LETTERS } from "@/helpers/constants";

type Props = {};

const MusicTeacher = (props: Props) => {
  const [rootNote, setRootNote] = useState("C");
  const [octave, setOctave] = useState(4);
  const [config, setConfig] = useState<GeneratorConfig>({
    type: "chord",
    scale: "mixolydian",
  });
  const { input, appInput, setMultiAppInput } = useInputStore();

  // Hydrate app with initial keys
  useEffect(() => {
    // Teoria Method:
    // Create note
    // const fixedNote = rootNote.replace("#", "b");
    // const note = teoria.note(`${fixedNote}${octave}`);
    // let newNotes: TeoriaNote[] = [];
    // switch (config.type) {
    //   case "scale":
    //     newNotes = note.scale(config.scale).notes();
    //     break;
    //   case "chord":
    //     newNotes = note.chord("sus2").notes();
    //     break;
    // }
    // console.log("new notes", newNotes);

    // const newInput = newNotes.reduce((merge, note) => {
    //   const inputKey = `${note.name().toLocaleUpperCase()}${note.octave()}`;
    //   return {
    //     ...merge,
    //     [inputKey]: true,
    //   };
    // }, {});

    // Tonal method
    // const randomChord =
    //   CHORD_SYMBOLS[Math.round(Math.random() * CHORD_SYMBOLS.length)];
    // const notes = Chord.get(randomChord);

    const randomType =
      CHORD_TYPES[Math.round(Math.random() * CHORD_TYPES.length)];
    const randomNoteTonic =
      NOTE_LETTERS[Math.round(Math.random() * NOTE_LETTERS.length)];
    const randomNoteBass =
      NOTE_LETTERS[Math.round(Math.random() * NOTE_LETTERS.length)];
    const chord = Chord.getChord(randomType, randomNoteTonic, randomNoteBass);
    // const notes = Chord.notes("maj7", "C4");
    console.log("tonal chord", chord.name, chord.notes);

    const newInput = chord.notes.reduce((merge, note) => {
      const inputKey = `${note}4`;
      return {
        ...merge,
        [inputKey]: true,
      };
    }, {});

    setMultiAppInput(newInput);
  }, []);

  // Check for user input vs the learning keys
  // If user succeeds, generate new keys (maybe increase score / tell user somehow?)

  return <div>MusicTeacher</div>;
};

export default MusicTeacher;
