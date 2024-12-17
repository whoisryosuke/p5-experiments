export interface TeoriaNote {
  octave: () => number;
  name: () => string;
  /**
   * Returns the name of the note, with an optional display of octave number
   */
  toString: () => string;
  /**
   * Returns the scientific notation form of the note (fx E4, Bb3, C#7 etc.)
   */
  scientific: () => string;
  key: () => number;
  /**
   * Returns a number ranging from 0-127 representing a MIDI note value
   */
  midi: () => number;
  /**
   * Returns the duration of the note (including dots)
   * in seconds. The first argument is the tempo in beats
   * per minute, the second is the beat unit (i.e. the
   * lower numeral in a time signature).
   */
  durationInSeconds: () => number;
}

export type GeneratorTypes = "scale" | "chord";
export type TeoriaScales = "mixolydian" | "aeolian" | "ionian" | "dorian";
export type GeneratorConfig = {
  type: GeneratorTypes;
  scale: TeoriaScales;
};

export type ChordHistory = {
  name: string;
  notes: string[];
  octave: number;
};
