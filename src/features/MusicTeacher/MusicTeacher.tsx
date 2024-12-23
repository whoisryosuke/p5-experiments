import { useInputStore } from "@/store/input";
import React, { useEffect, useRef, useState } from "react";
import { GeneratorConfig, TeoriaNote } from "./types";
import teoria from "teoria";
import { AbcNotation, Chord, Note } from "tonal";
import {
  CHORD_SYMBOLS,
  CHORD_TYPES,
  OUT_OF_RANGE_SHARP_NOTES,
  OUT_OF_RANGE_SHARP_NOTES_CONVERSION,
} from "./data/chord-symbols";
import { NOTE_LETTERS } from "@/helpers/constants";
import { useAppStore } from "@/store/app";

type Props = {};

const MusicTeacher = (props: Props) => {
  const { input, appInput, setNewAppInput } = useInputStore();
  const {
    randomNote,
    rootNote,
    octave,
    currentChord,
    setCurrentChord,
    chordHistory,
    addChordHistory,
  } = useAppStore();
  const [currentNotes, setCurrentNotes] = useState<string[]>([]);
  const playingReset = useRef(false);

  const generateNotes = () => {
    const randomType =
      CHORD_TYPES[Math.floor(Math.random() * CHORD_TYPES.length)];
    // TODO: Use rootNote instead
    const randomNoteTonic =
      NOTE_LETTERS[Math.floor(Math.random() * NOTE_LETTERS.length)];
    const randomNoteBass =
      NOTE_LETTERS[Math.floor(Math.random() * NOTE_LETTERS.length)];
    const actualNote = randomNote ? randomNoteTonic : rootNote;
    const chord = Chord.notes("maj7", `${actualNote}${octave}`);
    console.log("the chord", chord);
    // We filter the notes if they include any out of range notes
    // const notes = chord.filter(
    //   (note) =>
    //     !OUT_OF_RANGE_SHARP_NOTES.some((sharpNote) =>
    //       sharpNote.includes(note.slice(0, -1)) // We slice off the octave here
    //     )
    // );
    const notes = chord.map((note) => {
      const noteOctave = note.slice(-1);
      const noteWithoutOctave = note.slice(0, -1);
      const isSharpNote = OUT_OF_RANGE_SHARP_NOTES.find(
        (sharpNote) => sharpNote == noteWithoutOctave
      );
      console.log("sharp note", isSharpNote, noteWithoutOctave);
      if (isSharpNote) {
        const fixedNote =
          OUT_OF_RANGE_SHARP_NOTES_CONVERSION[noteWithoutOctave];
        console.log("fixed note", fixedNote);
        return `${fixedNote}${noteOctave}`;
      }
      return note;
    });

    console.log("OG vs Piano Notes:", chord, notes);

    console.log("base note", actualNote);

    const newInput = notes.reduce((merge, note) => {
      const inputKey = note.replace("#", "b");
      return {
        ...merge,
        [inputKey]: true,
      };
    }, {});

    return {
      input: newInput,
      name: `${actualNote}4 Maj7`,
      notes,
    };
  };

  const newChord = () => {
    const chord = generateNotes();
    setNewAppInput(chord.input);
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
    // Before we check if user has pressed keys - we do a "reset" cycle
    // When we're not in random mode - the user could hold keys and repeatedly "finish"
    // So we create a reset phase that requires user to release all keys before we acknowledge next chord
    if (playingReset.current) {
      const allPressedNotes = Object.entries(input).filter(
        ([_, pressed]) => pressed
      );
      const hasUserReleasedAllKeys = allPressedNotes.length == 0;

      if (hasUserReleasedAllKeys) playingReset.current = false;
      return;
    }

    // Get the keys we need to check for (e.g. `["C4", "D4"]`)
    const appNotes = Object.entries(appInput).filter(([_, pressed]) => pressed);
    const checkNotes = appNotes.map(([keyName]) => keyName);

    // Get pressed notes and make an array of just the notes pressed (e.g. `["C4", "D4"]`)
    const pressedNotes = Object.entries(input)
      .filter(([_, pressed]) => pressed)
      .map(([keyName]) => keyName);

    // A few conditions here:
    const isUserPressingEnoughKeys = pressedNotes.length == checkNotes.length;
    // Loop over all the notes we need to check for and see if they're pressed
    const compareNotes = checkNotes.map((checkNote) =>
      pressedNotes.includes(checkNote)
    );
    const allNotesPressed = !compareNotes.includes(false);

    // User successfully pressed all keys!
    if (isUserPressingEnoughKeys && allNotesPressed) {
      console.log("Generating new chord...");
      addChordHistory({
        name: currentChord,
        notes: checkNotes,
        octave,
        time: Date.now(),
      });
      newChord();
      playingReset.current = true;
    }

    console.log(
      "all notes pressed",
      checkNotes,
      pressedNotes,
      allNotesPressed,
      isUserPressingEnoughKeys
    );
  }, [input, appInput]);

  return (
    <div>
      <div>
        {currentChord}: {currentNotes.join(", ")}
      </div>
      <div>
        {chordHistory.slice(0, 10).map((history) => (
          <p key={`${history.name}-${history.time}`}>{history.name}</p>
        ))}
      </div>
    </div>
  );
};

export default MusicTeacher;
