import { BaseNote, WhiteNotes } from "../store/input";

// Our graph goes from 0 - FRAME_HEIGHT_TIME seconds
export const FRAME_HEIGHT_TIME = 10;

// It's technically 7, but arrays include 0 - so we reduce by 1
export const OCTAVES = 7;
export const NOTE_LETTERS: Partial<WhiteNotes>[] = [
  "C",
  "D",
  "E",
  "F",
  "G",
  "A",
  "B",
];
export const NOTE_LETTERS_WITH_BLACK: BaseNote[] = [
  "C",
  "Cb",
  "D",
  "Db",
  "E",
  "F",
  "Fb",
  "G",
  "Gb",
  "A",
  "Ab",
  "B",
];

export const NOTE_LETTERS_BLACK: Partial<BaseNote>[] = [
  "Cb",
  "Db",
  "Fb",
  "Gb",
  "Ab",
];

// Styling
export const KEYBOARD_WHITE_KEY_WIDTH = 20;
export const KEYBOARD_BLACK_KEY_WIDTH = KEYBOARD_WHITE_KEY_WIDTH / 2;
