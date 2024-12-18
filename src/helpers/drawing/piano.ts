import { BaseNote, WhiteNotes } from "@/store/input";
import { Graphics } from "p5";
import { BASE_COLORS } from "themes/colors/base";

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

export function drawPiano(
  texture: Graphics,
  startX: number,
  startY: number,
  pianoWidth: number,
  pianoHeight: number
) {
  const noteWidth = pianoWidth / NOTE_LETTERS.length;
  NOTE_LETTERS.forEach((whiteNote, noteIndex) => {
    const x = startX + noteIndex * noteWidth;
    const y = startY;

    // White key
    // Background that highlights when pressed
    texture.noStroke();
    const backgroundColor = texture.color(BASE_COLORS["blue-9"]);
    backgroundColor.setAlpha(0);
    texture.fill(backgroundColor);
    texture.rect(x, y, noteWidth, pianoHeight);

    // Draw the outline
    texture.strokeWeight(3);
    texture.noFill();
    texture.stroke(texture.color(BASE_COLORS["gray-3"]));
    texture.rect(x, y, noteWidth, pianoHeight);

    // Text
    texture.noStroke();
    texture.fill(texture.color(BASE_COLORS["gray-3"]));
    texture.textSize(48);
    texture.textStyle("bold");
    texture.text(whiteNote, x + noteWidth / 2, y + pianoHeight + 64);
  });

  NOTE_LETTERS.forEach((whiteNote, noteIndex) => {
    const x = startX + noteIndex * noteWidth;
    const y = startY;
    // Black key
    const showBlackKey = NOTE_LETTERS_BLACK.find((blackNote) =>
      blackNote.includes(whiteNote)
    );

    if (showBlackKey) {
      texture.strokeWeight(3);
      texture.stroke(texture.color(BASE_COLORS["gray-3"]));
      const blackBackgroundColor = texture.color(BASE_COLORS["gray-7"]);
      // blackBackgroundColor.setAlpha(255);
      texture.fill(blackBackgroundColor);
      texture.rect(
        x + noteWidth / 2 + noteWidth / 4,
        y,
        noteWidth / 2,
        (pianoHeight / 3) * 2
      );
    }
  });
}
