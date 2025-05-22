export const MIDI_NOTE_MAP = [
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B",
];

export const midiToNote = (midiKey: number, combined?: boolean) => {
  const octaveBase = Math.floor(midiKey / 12);
  const octaveOffset = octaveBase * 12;
  const noteIndex = midiKey - octaveOffset;
  const note = MIDI_NOTE_MAP[noteIndex];

  // We offset by 1 to start octaves at 0 (instead of 1 - like math works out above)
  const octave = octaveBase - 1;

  if (combined) return `${note}${octave}`;

  return { note, octave };
};
