import { WhiteNotes, Note, Octaves, BaseNote } from "../store/input";
import { NOTE_LETTERS, NOTE_LETTERS_WITH_BLACK, OCTAVES } from "./constants";

export function generateKeysByOctave(blackKey = false) {
  const octaves = new Array(OCTAVES).fill(0);
  const sourceNote = blackKey ? NOTE_LETTERS_WITH_BLACK : NOTE_LETTERS;
  const notes = octaves.map(
    (_, octave) => sourceNote.map((note) => `${note}${octave + 1}`) as Note[]
  );
  return notes;
}

export function generateKeysByOctaveInOrder() {
  const octaves = new Array(OCTAVES).fill(0);
  const notes: Record<WhiteNotes, Note[]> = {
    C: [],
    D: [],
    E: [],
    F: [],
    G: [],
    A: [],
    B: [],
  };
  octaves.forEach((_, octave) =>
    NOTE_LETTERS.map((note) => notes[note].push(`${note}${octave + 1}` as Note))
  );
  return notes;
}

export function generateAllKeysByOctaveInOrder() {
  const octaves = new Array(OCTAVES).fill(0);
  const notes: Record<BaseNote, Note[]> = {
    C: [],
    D: [],
    E: [],
    F: [],
    G: [],
    A: [],
    B: [],
    "C#": [],
    "D#": [],
    "F#": [],
    "G#": [],
    "A#": [],
  };
  octaves.forEach((_, octave) =>
    NOTE_LETTERS.map((note) => notes[note].push(`${note}${octave + 1}` as Note))
  );
  return notes;
}

export function generateKeysFlat() {
  const octaves = new Array(OCTAVES).fill(0) as Octaves[];
  let notes: Note[] = [];
  octaves.forEach((_, octave) =>
    NOTE_LETTERS.forEach((note) => notes.push(`${note}${octave + 1}` as Note))
  );
  return notes;
}
