import * as Tone from "tone";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { SynthTypes } from "../features/Music/Music";
import { ThemeOptions } from "themes";
import { ThemeColors } from "themes/colors/base";
import { ChordHistory } from "@/features/MusicTeacher/types";
import { BaseNote } from "./input";
// import type {} from "@redux-devtools/extension"; // required for devtools typing

type CameraAngleOptions = "front" | "three_quarter" | "top";

interface AppState {
  // Theming
  theme: ThemeOptions;
  setTheme: (theme: ThemeOptions) => void;
  toggleTheme: () => void;
  colorMode: ThemeColors;
  setColorMode: (colorMode: ThemeColors) => void;

  // UI
  showGamepad: boolean;
  setShowGamepad: (showGamepad: boolean) => void;

  // 3D Scene
  cameraAngle: CameraAngleOptions;
  setCameraAngle: (cameraAngle: CameraAngleOptions) => void;

  // Game
  randomNote: boolean;
  setRandomNote: (randomNote: boolean) => void;
  rootNote: BaseNote;
  setRootNote: (rootNote: BaseNote) => void;
  octave: number;
  setOctave: (rootNote: number) => void;
  currentChord: string;
  setCurrentChord: (currentChord: string) => void;
  chordHistory: ChordHistory[];
  addChordHistory: (chord: ChordHistory) => void;

  // Sound state
  mute: boolean;
  setMute: (mute: boolean) => void;
  volume: number;
  setVolume: (volume: number) => void;
  attack: number;
  decay: number;
  sustain: number;
  release: number;
  setAttack: (attack: number) => void;
  setDecay: (decay: number) => void;
  setSustain: (sustain: number) => void;
  setRelease: (release: number) => void;
  pitchShift: number;
  setPitchShift: (pitchShift: number) => void;
  synthType: SynthTypes;
  setSynthType: (synthType: SynthTypes) => void;
  waveform: React.RefObject<Tone.Waveform> | null;
  setWaveform: (fft: React.RefObject<Tone.Waveform>) => void;
  waveformOscLeft: React.RefObject<Tone.Waveform> | null;
  setWaveformOscLeft: (fft: React.RefObject<Tone.Waveform>) => void;
  waveformOscRight: React.RefObject<Tone.Waveform> | null;
  setWaveformOscRight: (fft: React.RefObject<Tone.Waveform>) => void;
  fft: React.RefObject<Tone.FFT> | null;
  setFft: (fft: React.RefObject<Tone.FFT>) => void;
}

export const useAppStore = create<AppState>()(
  devtools((set) => ({
    theme: "dark",
    setTheme: (theme) => set(() => ({ theme })),
    toggleTheme: () =>
      set((state) => ({
        theme: state.theme === "light" ? "dark" : "light",
      })),
    colorMode: "cyan",
    setColorMode: (colorMode) => set(() => ({ colorMode })),

    // UI
    showGamepad: true,
    setShowGamepad: (showGamepad) => set((state) => ({ showGamepad })),

    // 3D Scene
    cameraAngle: "three_quarter",
    setCameraAngle: (cameraAngle) => set((state) => ({ cameraAngle })),

    // Game
    randomNote: false,
    setRandomNote: (randomNote) => set((state) => ({ randomNote })),
    rootNote: "C",
    setRootNote: (rootNote) => set((state) => ({ rootNote })),
    octave: 4,
    setOctave: (octave) => set((state) => ({ octave })),
    currentChord: "",
    setCurrentChord: (currentChord) => set((state) => ({ currentChord })),
    chordHistory: [],
    addChordHistory: (chord) =>
      set((state) => ({ chordHistory: [chord, ...state.chordHistory] })),

    // Sound
    mute: false,
    setMute: (mute) => set(() => ({ mute })),
    volume: -12,
    setVolume: (volume) => set(() => ({ volume })),
    attack: 0.11,
    decay: 0.21,
    sustain: 0.5,
    release: 1.2,
    setAttack: (attack) => set(() => ({ attack })),
    setDecay: (decay) => set(() => ({ decay })),
    setSustain: (sustain) => set(() => ({ sustain })),
    setRelease: (release) => set(() => ({ release })),
    pitchShift: 2,
    setPitchShift: (pitchShift) => set(() => ({ pitchShift })),
    synthType: "piano",
    setSynthType: (synthType) => set(() => ({ synthType })),
    waveform: null,
    setWaveform: (waveform) => set(() => ({ waveform })),
    waveformOscLeft: null,
    setWaveformOscLeft: (waveformOscLeft) => set(() => ({ waveformOscLeft })),
    waveformOscRight: null,
    setWaveformOscRight: (waveformOscRight) =>
      set(() => ({ waveformOscRight })),
    fft: null,
    setFft: (fft) => set(() => ({ fft })),
  }))
);
