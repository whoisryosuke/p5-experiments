import { useInputStore } from "@/store/input";
import React, { useEffect, useState } from "react";
import { GeneratorConfig, TeoriaNote } from "./types";
import teoria from "teoria";
import { Chord, Note } from "tonal";
import { CHORD_SYMBOLS, CHORD_TYPES } from "./data/chord-symbols";
import { NOTE_LETTERS } from "@/helpers/constants";
import { useAppStore } from "@/store/app";

type Props = {};

const MusicTeacher = (props: Props) => {
  const [rootNote, setRootNote] = useState("C");
  const [octave, setOctave] = useState(4);
  const { input, appInput, setMultiAppInput } = useInputStore();
  const { currentChord, setCurrentChord, addChordHistory } = useAppStore();
  const [currentNotes, setCurrentNotes] = useState<string[]>([]);

  const generateNotes = () => {
    const randomType =
      CHORD_TYPES[Math.round(Math.random() * CHORD_TYPES.length)];
    // TODO: Use rootNote instead
    const randomNoteTonic =
      NOTE_LETTERS[Math.round(Math.random() * NOTE_LETTERS.length)];
    const randomNoteBass =
      NOTE_LETTERS[Math.round(Math.random() * NOTE_LETTERS.length)];
    const chord = Chord.getChord(randomType, rootNote, randomNoteBass);
    console.log("tonal chord", chord.name, chord.notes);

    const newInput = chord.notes.reduce((merge, note) => {
      const inputKey = `${note.replace("#", "b")}${octave}`;
      return {
        ...merge,
        [inputKey]: true,
      };
    }, {});

    return {
      input: newInput,
      name: chord.name,
      notes: chord.notes,
    };
  };

  const newChord = () => {
    const chord = generateNotes();
    setMultiAppInput(chord.input);
    setCurrentChord(chord.name);
    setCurrentNotes(chord.notes);
  };

  // Hydrate app with initial keys
  useEffect(() => {
    newChord();
  }, []);

  // Check for user input vs the learning keys
  // If user succeeds, generate new keys (maybe increase score / tell user somehow?)
  useEffect(() => {
    // Get the keys we need to check for (e.g. `["C4", "D4"]`)
    const appNotes = Object.entries(appInput).filter(([_, pressed]) => pressed);
    const checkNotes = appNotes.map(([keyName]) => keyName);

    // Get pressed notes and make an array of just the notes pressed (e.g. `["C4", "D4"]`)
    const pressedNotes = Object.entries(input)
      .filter(([_, pressed]) => pressed)
      .map(([keyName]) => keyName);

    // Loop over all the notes we need to check for and see if they're pressed
    let noteCheck = [];
    checkNotes.forEach((checkNote) => {
      if (pressedNotes.includes(checkNote)) {
        noteCheck.push(true);
      } else {
        noteCheck.push(false);
      }
    });

    const allNotesPressed = !noteCheck.includes(false);

    // User successfully pressed all keys!
    if (allNotesPressed) {
      addChordHistory({
        name: currentChord,
        notes: checkNotes,
        octave,
      });
      newChord();
    }

    console.log("all notes pressed", checkNotes, pressedNotes, allNotesPressed);
  }, [input, appInput]);

  return (
    <div>
      {currentChord}: {currentNotes.join(", ")}
    </div>
  );
};

export default MusicTeacher;
